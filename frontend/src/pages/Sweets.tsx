import React, { useCallback, useEffect, useState } from "react";
import { API, authHeader } from "../api";
import Modal from "../components/Modal";

type Sweet = {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export default function Sweets() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [editSweet, setEditSweet] = useState<Sweet | null>(null);
  const role: "ADMIN" | "USER" | null = localStorage.getItem("role") as
    | "ADMIN"
    | "USER"
    | null;

  const [amounts, setAmounts] = useState<Record<number, number>>({});
  const [modalType, setModalType] = useState<string | null>("");

  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "Chocolate",
    price: "",
  });

  const fetchSweets = useCallback(async () => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    const res = await fetch(`${API}/sweets?${params.toString()}`, {
      headers: authHeader(),
    });

    setSweets(await res.json());
  }, [search, category, minPrice, maxPrice]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSweets();
      } catch (error) {
        console.error("Failed to fetch sweets:", error);
      }
    };

    fetchData();
  }, [fetchSweets]);

  const handleAddSweet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`${API}/sweets`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({
        ...newSweet,
        price: parseFloat(newSweet.price),
        quantity: 10,
      }),
    });

    fetchSweets();
  };

  const purchaseSweet = async (sweet: Sweet) => {
    const amount = amounts[sweet.id] || 1;

    if (amount > sweet.quantity) {
      alert("Not enough stock");
      return;
    }

    await fetch(`${API}/sweets/${sweet.id}/purchase`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({ amount }),
    });

    fetchSweets();
  };

  const restockSweet = async (id: number) => {
    const amount = Number(prompt("Enter restock amount"));
    if (!amount) return;

    await fetch(`${API}/sweets/${id}/restock`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({ amount }),
    });

    fetchSweets();
  };

  const deleteSweet = async (id: number) => {
    if (!confirm("Delete this sweet?")) return;

    await fetch(`${API}/sweets/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });

    fetchSweets();
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editSweet) return;

    await fetch(`${API}/sweets/${editSweet.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({
        name: editSweet.name,
        category: editSweet.category,
        price: editSweet.price,
      }),
    });

    setEditSweet(null);
    fetchSweets();
  };

  return (
    <div className="sweets-page">
      <h1 className="page-title">Sweets</h1>

      <form
        className="filter-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetchSweets();
        }}
      >
        <input
          className="input-field"
          placeholder="Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="input-field"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Category
          </option>
          <option>Chocolate</option>
          <option>Candy</option>
          <option>Lollipop</option>
          <option>Other</option>
        </select>
        <input
          className="input-field"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button type="submit" className="primary-btn">
          Search
        </button>
      </form>

      {role === "ADMIN" && (
        <button
          className="primary-btn add-btn"
          onClick={() => setModalType("ADD")}
        >
          Add Sweet
        </button>
      )}

      <Modal isOpen={modalType === "ADD"} onClose={() => setModalType(null)}>
        <h2 className="modal-title">Add Sweet</h2>
        <form className="modal-form" onSubmit={handleAddSweet}>
          <input
            className="input-field"
            placeholder="Name"
            required
            value={newSweet.name}
            onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
          />
          <select
            className="input-field"
            value={newSweet.category}
            onChange={(e) =>
              setNewSweet({ ...newSweet, category: e.target.value })
            }
          >
            <option>Chocolate</option>
            <option>Candy</option>
            <option>Lollipop</option>
            <option>Other</option>
          </select>
          <input
            className="input-field"
            type="number"
            placeholder="Price"
            required
            value={newSweet.price}
            onChange={(e) =>
              setNewSweet({ ...newSweet, price: e.target.value })
            }
          />
          <button type="submit" className="primary-btn">
            Add
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={modalType === "EDIT"}
        onClose={() => {
          setEditSweet(null);
          setModalType(null);
        }}
      >
        <h2 className="modal-title">Edit Sweet</h2>
        {editSweet && (
          <form className="modal-form" onSubmit={handleEdit}>
            <input
              className="input-field"
              value={editSweet.name}
              onChange={(e) =>
                setEditSweet({ ...editSweet, name: e.target.value })
              }
            />
            <select
              className="input-field"
              value={editSweet.category}
              onChange={(e) =>
                setEditSweet({ ...editSweet, category: e.target.value })
              }
            >
              <option>Chocolate</option>
              <option>Candy</option>
              <option>Lollipop</option>
              <option>Other</option>
            </select>
            <input
              className="input-field"
              type="number"
              value={editSweet.price}
              onChange={(e) =>
                setEditSweet({ ...editSweet, price: Number(e.target.value) })
              }
            />
            <button type="submit" className="primary-btn">
              Save
            </button>
          </form>
        )}
      </Modal>

      <div className="sweets-grid">
        {sweets.map((s) => (
          <div key={s.id} className="sweet-card">
            <h3>{s.name}</h3>
            <p>Category: {s.category}</p>
            <p>Price: ${s.price}</p>
            <p>Stock: {s.quantity}</p>

            <div className="sweet-actions">
              <input
                type="number"
                min={1}
                value={amounts[s.id] || 1}
                onChange={(e) =>
                  setAmounts({ ...amounts, [s.id]: Number(e.target.value) })
                }
                className="amount-input"
              />
              <button
                className="primary-btn"
                disabled={s.quantity === 0}
                onClick={() => purchaseSweet(s)}
              >
                Buy
              </button>
              <button
                className="secondary-btn"
                onClick={() => {
                  setEditSweet(s);
                  setModalType("EDIT");
                }}
              >
                Edit
              </button>
              {role === "ADMIN" && (
                <>
                  <button
                    className="secondary-btn"
                    onClick={() => restockSweet(s.id)}
                  >
                    Restock
                  </button>
                  <button
                    className="danger-btn"
                    onClick={() => deleteSweet(s.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
