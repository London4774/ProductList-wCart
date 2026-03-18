import { useState } from 'react'
import data from "../data.json";

function App() {

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);

      if(existingItem){
        return prevCart.map((item) => 
          item.name === product.name ? {...item, quantity: item.quantity + 1} : item
      );
    }
    return [...prevCart, {...product, quantity: 1}];
    });
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <main>
      <h1 className="text-pink-500 text-3xl font-bold py-5">Desserts</h1>

      <div className="flex flex-col lg:flex-row gap-x-5">

      <section className="flex-1 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border">
          {data.map((item, index) => (
            <div key={index}>
              
              <div className="relative p-2">
                <img className='rounded-sm' src={item.image.desktop} alt="" />

                <button className="flex gap-1 justify-center absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap bg-white border border-rose400 rounded-2xl font-semibold px-3 py-2"
                  onClick={() => addToCart(item)}>
                    <img src="/images/icon-add-to-cart.svg" alt="" />
                    Add to Cart
                </button>

              </div>

              <div className='pt-8'>
                <p className='text-rose300'>{item.category}</p>
                <p>{item.name}</p>
                <p className="text-red-primary">${item.price.toFixed(2)}</p>
              </div>

            </div>
          ))}
        </div>        
      </section>

      <aside className="border w-sm mr-10">
        <div>
          <h2 className='text-red-primary font-bold text-2xl'>Your Cart ({totalItems})</h2>
          <img src="/images/illustration-empty-cart.svg" alt="" />
        </div>
      </aside>

    </div>
    </main>
  )
}

export default App
