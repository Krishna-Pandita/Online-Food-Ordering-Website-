import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const groceryItems = [
  { id: 1, name: "Apple", price: 120, category: "Fruits" },
  { id: 2, name: "Banana", price: 60, category: "Fruits" },
  { id: 3, name: "Orange", price: 80, category: "Fruits" },
  { id: 4, name: "Mango", price: 150, category: "Fruits" },
  { id: 5, name: "Grapes", price: 90, category: "Fruits" },

  { id: 6, name: "Tomato", price: 40, category: "Vegetables" },
  { id: 7, name: "Potato", price: 30, category: "Vegetables" },
  { id: 8, name: "Onion", price: 35, category: "Vegetables" },
  { id: 9, name: "Carrot", price: 50, category: "Vegetables" },
  { id: 10, name: "Spinach", price: 25, category: "Vegetables" },

  { id: 11, name: "Milk", price: 50, category: "Dairy" },
  { id: 12, name: "Cheese", price: 200, category: "Dairy" },

  { id: 15, name: "Bread", price: 40, category: "Bakery" },
  { id: 18, name: "Chips", price: 30, category: "Snacks" },
  { id: 21, name: "Coke", price: 50, category: "Beverages" },
];

const Grocery = () => {

  const { cart, setCart } = useOutletContext();
  const [search, setSearch] = useState("");

  // ✅ Correct addToCart
  const addToCart = (item) => {
    const existingItem = cart.find(i => i.id === item.id);

    if (existingItem) {
      const updatedCart = cart.map(i =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const filteredItems = groceryItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grocery-container">

      <h1 className="text-xl">Grocery Store</h1>

      <div>
        🛒 Items in Cart: {cart.length}
      </div>

      <input
        type="text"
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="product-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="text-black dark:text-black">
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <p>{item.category}</p>

            <button onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Grocery;