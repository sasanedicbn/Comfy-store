import { useState } from "react";

const Products = () => {
    const [data, setData] = useState([])
    const fetchProducts = async () => {
        try {
          const response = await fetch('https://strapi-store-server.onrender.com/api/products?');
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const data = await response.json();
          setData(data.data)
          console.log(data)
          return data;
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          return null; 
        }
      }
      console.log(data)
    return(
        <>
        <form
      method="get"
      className="product-search-form"
    >
      <div className="form-control">
        <label htmlFor="search" className="label">
          <span className="label-text capitalize">Search product</span>
        </label>
        <input type="search" name="search" className="input input-bordered input-sm" value="" />
      </div>
      <div className="form-control">
        <label htmlFor="category" className="label">
          <span className="label-text capitalize">Select category</span>
        </label>
        <select name="category" id="category" className="select select-bordered select-sm">
          <option value="all" >all</option>
          <option value="Tables">Tables</option>
          <option value="Chairs">Chairs</option>
          <option value="Kids">Kids</option>
          <option value="Sofas">Sofas</option>
          <option value="Beds">Beds</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="company" className="label">
          <span className="label-text capitalize">Select company</span>
        </label>
        <select name="company" id="company" className="select select-bordered select-sm">
          <option value="all" >all</option>
          <option value="Modenza">Modenza</option>
          <option value="Luxora">Luxora</option>
          <option value="Artifex">Artifex</option>
          <option value="Comfora">Comfora</option>
          <option value="Homestead">Homestead</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="order" className="label">
          <span className="label-text capitalize">Sort by</span>
        </label>
        <select name="order" id="order" className="select select-bordered select-sm">
          <option value="a-z" >a-z</option>
          <option value="z-a">z-a</option>
          <option value="high">high</option>
          <option value="low">low</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="price" className="label cursor-pointer">
          <span className="label-text capitalize">Select price</span>
          <span className="current-price">$1,000.00</span>
        </label>
        <input type="range" name="price" min="0" max="100000" className="range range-primary " step="1000" value="100000" />
        <div className="">
          <span className="min-price">0</span>
          <span className="max-price">Max : $1,000.00</span>
        </div>
      </div>
      <div className="form-control items-center">
        <label htmlFor="shipping" className="label cursor-pointer">
          <span className="free-shipping">Free shipping</span>
        </label>
        <input type="checkbox" name="shipping" className="checkbox checkbox-primary checkbox-sm" />
      </div>
      <button type="submit" className="btn btn-primary ">Search</button>
      <button type="submit" className="btn btn-primary  green">Reset</button>
    </form>
    <div className="products">
      <button onClick={fetchProducts}>SASA</button>
      {data.length > 0 && data.map((product) => (
                            <li key={product.id} className="product-container">
                                <div className="product-details">
                                    <img src={product.attributes.image} alt={product.attributes.title} />
                                    <p>{product.attributes.title}</p>
                                    <p>{product.attributes.price}</p>
                             </div>
                </li>
         ))}
     </div>
    </>
    )
}
export default Products;