import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const approvedRecipes = data.filter(
          (recipe) => recipe.status === "approved"
        );
        setRecipes(approvedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <p>Loading recipes...</p>;

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#c0392b" }}>
        Submitted Recipes
      </h2>
      {recipes.length === 0 ? (
        <p style={{ textAlign: "center" }}>No approved recipes yet.</p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ marginBottom: "0.5rem", color: "#e74c3c" }}>
                {recipe.title}
              </h3>
              <p>{recipe.description}</p>
              <p>
                <strong>Cook Time:</strong> {recipe.cookTime} |{" "}
                <strong>Servings:</strong> {recipe.servings}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
