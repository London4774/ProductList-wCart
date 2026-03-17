import { useState } from 'react'
import data from "../data.json";

function App() {

  const [cartCount, setCartCount] = useState(0);

  return (
    <main>
      <h1 className="text-pink-500 text-2xl">Desserts</h1>

      <div className="flex flex-col lg:flex-row gap-x-5">

      <section className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border">
          {data.map((item, index) => (
            <div key={index}>
              
              <div className="relative">
                <img src={item.image.desktop} alt="" />
                <button className="absolute bottom-1 right-1/2 whitespace-nowrap bg-white border rounded text-red-primary"
                onClick={() => setCartCount(item => item + 1)}>Add to Cart</button>
              </div>
                <p>{item.category}</p>
                <p>{item.name}</p>
                <p className="text-red-primary">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>        
      </section>

      <aside className="border max-2xl">
        <div>
          <p>your cart {cartCount}</p>
          <img src="/images/illustration-empty-cart.svg" alt="" />
        </div>
      </aside>
    </div>
    </main>
  )
}

export default App
      