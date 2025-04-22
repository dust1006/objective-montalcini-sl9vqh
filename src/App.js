import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecipeList from "./RecipeList";
import AdminDashboard from "./AdminDashboard";
import RecipeSubmissionPage from "./RecipeSubmissionPage"; // you'll make this next

export default function App() {
  return (
    <Router>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
        <h1 style={{ textAlign: "center", color: "#c0392b" }}>
          D. Lane Cook's Recipes
        </h1>
        <p style={{ textAlign: "center", marginBottom: "2rem" }}>
          Recipes without the life story!
        </p>

        <nav style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>
            Home
          </Link>
          <Link to="/submit" style={{ marginRight: "1rem" }}>
            Submit Recipe
          </Link>
          <Link to="/admin">Admin</Link>
        </nav>

        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/submit" element={<RecipeSubmissionPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
