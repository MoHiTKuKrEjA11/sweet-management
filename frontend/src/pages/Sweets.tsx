import React, { useEffect, useState } from "react";
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

  const fetchSweets = async () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    const res = await fetch(`${API}/sweets?${params.toString()}`, {
      headers: authHeader(),
    });
    setSweets(await res.json());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSweets();
      } catch (error) {
        console.error("Failed to fetch sweets:", error);
      }
    };

    fetchData();
  }, []);

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
    <div>
      <h1>Sweets</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchSweets();
        }}
      >
        <input
          placeholder="Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Category
          </option>
          <option>Chocolate</option>
          <option>Candy</option>
          <option>Lollipop</option>
          <option>Other</option>
        </select>
        <input
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button>Search</button>
      </form>

      {role === "ADMIN" && (
        <button onClick={() => setModalType("ADD")}>Add Sweet</button>
      )}

      <Modal isOpen={modalType === "ADD"} onClose={() => setModalType(null)}>
        <h2>Add Sweet</h2>
        <form onSubmit={handleAddSweet}>
          <input
            required
            placeholder="Name"
            onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
          />
          <select
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
            type="number"
            required
            placeholder="Price"
            onChange={(e) =>
              setNewSweet({ ...newSweet, price: e.target.value })
            }
          />
          <button>Add</button>
        </form>
      </Modal>

      <Modal
        isOpen={modalType === "EDIT"}
        onClose={() => {
          setEditSweet(null);
          setModalType(null);
        }}
      >
        <h2>Edit Sweet</h2>

        {editSweet && (
          <form onSubmit={handleEdit}>
            <input
              value={editSweet.name}
              onChange={(e) =>
                setEditSweet({ ...editSweet, name: e.target.value })
              }
            />
            <select
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
              type="number"
              value={editSweet.price}
              onChange={(e) =>
                setEditSweet({ ...editSweet, price: Number(e.target.value) })
              }
            />
            <button>Save</button>
          </form>
        )}
      </Modal>

      {sweets.map((s) => (
        <div
          key={s.id}
          style={{ border: "1px solid gray", margin: 10, padding: 10 }}
        >
          <b>{s.name}</b> ({s.category}) — ${s.price} — Stock: {s.quantity}
          <div>
            <input
              type="number"
              min={1}
              value={amounts[s.id] || 1}
              onChange={(e) =>
                setAmounts({ ...amounts, [s.id]: Number(e.target.value) })
              }
            />
            <button
              disabled={s.quantity === 0}
              onClick={() => purchaseSweet(s)}
            >
              Buy
            </button>
          </div>
          <button
            onClick={() => {
              setEditSweet(s);
              setModalType("EDIT");
            }}
          >
            Edit
          </button>
          {role === "ADMIN" && (
            <>
              <button onClick={() => restockSweet(s.id)}>Restock</button>
              <button onClick={() => deleteSweet(s.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
