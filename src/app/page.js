"use client";
import { useState } from "react";
import { menuItems } from "../data/menu";
import MenuItem from "../components/MenuItem";

export default function MenuPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Starter", "Main", "Drinks"];

  const filteredItems = filter === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === filter);

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: "20px" }}>
        <h1>Menu</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ width: 'auto', fontSize: '0.9rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-menu">
        {filteredItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}