import { useState } from "react";
import data from "../data.json";

function App() {

  const [cart, setCart] = useState([]);
  // const [clicked, setClicked] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);

      if (existingItem) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const deleteCartItems = (product) => {
    setCart((cartItem) => {
      const deleteItem = cartItem.filter((item) => item.name !== product.name);
      return deleteItem;
    });
  };

  const decreaseItem = (product) => {
    if (product.quantity > 1) {
      setCart((cartItem) => {
        return cartItem.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      });
    } else if (product.quantity === 1) {
      setCart((cartItem) => {
        return cartItem.filter((item) => item.name !== product.name);
      });
    }
  };

  // if(deleteItem){
  //       return deleteItem.map((item) =>
  //         item.name === product.name ? {...item, quantity: item.quantity - 1 } : item,
  //       );
  //     }
  //     return [...cartItem, {...product, quantity: 1}];

  return (
    <main>
      <h1 className="text-rose900 text-3xl font-bold py-5">Desserts</h1>

      <div className="flex flex-col lg:flex-row gap-x-5">
        <section className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {data.map((item) => {
              const isInCart = cart.find(
                (cartItem) => cartItem.name === item.name,
              );

              return (
                <div>
                  <div className="relative p-2">
                    <img
                      className="rounded-lg"
                      src={item.image.desktop}
                      alt=""
                    />

                    {isInCart ? (
                      <div className="flex gap-4 justify-center absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 bg-red-primary text-white rounded-2xl px-3 py-2">
                        <button onClick={() => decreaseItem(isInCart)}>
                          -
                        </button>
                        <span>{isInCart.quantity}</span>
                        <button onClick={() => addToCart(item)}>+</button>
                      </div>
                    ) : (
                      <button
                        // ${!clicked ? "bg-rose400" : "bg-white"}
                        className={`flex gap-1 justify-center absolute bottom-1 left-1/2 -translate-x-1/2 
                      translate-y-1/2 whitespace-nowrap bg-white border border-rose400 rounded-2xl font-semibold px-3 py-2`}
                        onClick={() => addToCart(item)}
                      >
                        <img src="/images/icon-add-to-cart.svg" alt="" />
                        Add to Cart
                      </button>
                    )}
                  </div>

                  <div className="pt-8">
                    <p className="text-rose300">{item.category}</p>
                    <p className="font-bold text-rose900">{item.name}</p>
                    <p className="text-red-primary">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* sidebar */}
        <aside className="bg-white border w-sm max-h-[60%] rounded mr-10">
          <div className="text-start ml-4 mb-3 py-2">
            <h2 className="text-red-primary font-bold text-2xl">
              Your Cart ({totalItems})
            </h2>
          </div>

          {/* empty cart rendering */}
          {cart.length == 0 && (
            <div className="flex flex-col items-center gap-6">
              <img
                className="w-fit h-full"
                src="/images/illustration-empty-cart.svg"
                alt=""
              />

              <p className="text-rose900">Your added items will appear here</p>
            </div>
          )}

          {/* Rendering cart items */}
          {cart.map((item) => (
            <div className="">
              <div className="grid grid-cols-1 gap-2 relative">
                <p className="font-semibold pl-2 mx-4 pt-3 text-[15px]">
                  {item.name}
                </p>

                <div className="absolute bottom-[30%] left-[90%]">
                  {/* Delete Button */}
                  <button
                    className="ring-1 p-0.5 ring-rose500 rounded-full"
                    onClick={() => deleteCartItems(item)}
                  >
                    <img src="/images/icon-remove-item.svg" alt="" />
                  </button>
                </div>

                <div className="flex flex-row gap-2 mx-4 px-2 border-b border-gray-200 text-[14px]">
                  <div className="flex gap-2 mb-2">
                    <span className="text-red-primary font-semibold">
                      {item.quantity}x
                    </span>

                    <p className="text-rose500">@ ${item.price.toFixed(2)}</p>

                    <p className="text-rose900 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </aside>
      </div>
    </main>
  );
}

export default App;
