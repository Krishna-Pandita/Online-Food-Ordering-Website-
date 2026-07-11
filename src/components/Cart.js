import { useOutletContext } from "react-router-dom";

const Cart = () => {

  const { cart, setCart } = useOutletContext();


  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">

      <h1 className="cart-heading text-xl">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
<div key={item.id} className="cart-item text-black">
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              <button  className="cursor-pointer" onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button className="cursor-pointer"  onClick={() => increaseQty(item.id)}>+</button>

              <p>₹{item.price * item.quantity}</p>

              <button className="cursor-pointer" onClick={() => removeItem(item.id)}>
                Remove
              </button>

            </div>
          ))}

          <h2 className="total text-xl font-semibold text-center dark:text-white">Total: ₹{total}</h2>

        </>
      )}

    </div>
  );
};

export default Cart;