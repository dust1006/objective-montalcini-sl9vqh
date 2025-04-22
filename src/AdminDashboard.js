import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdminDashboard() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const data = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    setRecipes(data);
  };

  const approveRecipe = async (id) => {
    await updateDoc(doc(db, "recipes", id), { status: "approved" });
    fetchRecipes();
  };

  const deleteRecipe = async (id) => {
    await deleteDoc(doc(db, "recipes", id));
    fetchRecipes();
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ textAlign: "center", color: "#c0392b" }}>Admin Dashboard</h2>
      {recipes.length === 0 ? (
        <p style={{ textAlign: "center" }}>No recipes submitted.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1rem",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ marginBottom: "0.5rem" }}>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <p>
                <strong>Status:</strong>{" "}
                {recipe.status === "approved" ? "✅ Approved" : "⏳ Pending"}
              </p>
              {recipe.status !== "approved" && (
                <button
                  onClick={() => approveRecipe(recipe.id)}
                  style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => deleteRecipe(recipe.id)}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  padding: "0.5rem 1rem",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
