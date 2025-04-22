import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export default function RecipeSubmissionPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    cookTime: "",
    servings: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addDoc(collection(db, "recipes"), {
        ...formData,
        ingredients: formData.ingredients.split("\n"),
        instructions: formData.instructions.split("\n"),
        status: "pending",
        createdAt: new Date(),
      });

      alert("Recipe submitted for review!");
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        cookTime: "",
        servings: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit recipe.");
    }

    setSubmitting(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "#c0392b" }}>Submit a Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={2}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients (one per line)"
          value={formData.ingredients}
          onChange={handleChange}
          required
          rows={5}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <textarea
          name="instructions"
          placeholder="Instructions (one step per line)"
          value={formData.instructions}
          onChange={handleChange}
          required
          rows={6}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <input
          type="text"
          name="cookTime"
          placeholder="Cook Time (e.g., 30 mins)"
          value={formData.cookTime}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <input
          type="text"
          name="servings"
          placeholder="Servings (e.g., 4 servings)"
          value={formData.servings}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <button
          type="submit"
          disabled={submitting}
          style={{
            backgroundColor: "#e74c3c",
            color: "#fff",
            border: "none",
            padding: "0.75rem 1.5rem",
            width: "100%",
            cursor: "pointer",
          }}
        >
          {submitting ? "Submitting..." : "Submit Recipe"}
        </button>
      </form>
    </div>
  );
}
