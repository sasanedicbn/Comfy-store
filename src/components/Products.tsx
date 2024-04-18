import { useEffect, useState } from "react";

const Products = () => {
    const [data, setData] = useState([]);
    // https://strapi-store-server.onrender.com/api/products?search=&category=&company=all&order=a-z&price=100000
    const [params, setParams] = useState({
        category: '',
        company: 'all',
        order: 'a-z',
        search: '',
        price: 100000,
        shipping: ''
    });

    const fetchProducts = async () => {
        try {
            const baseURL = 'https://strapi-store-server.onrender.com/api/products?';
            console.log('PARAMS:',params)
            const url = `${baseURL}search=${params.search}&category=${params.category}&company=${params.company}&order=${params.order}&price=${params.price}&shipping=${params.shipping}`;
            console.log('url', url)
            const response = await fetch(url);
            console.log('RESPONSE', response)

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const responseData = await response.json();
            console.log('reposnseDATA' ,responseData)
            setData(responseData.data);
            return responseData;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return null;
        }
    };

    async function searchProducts(event) {
        event.preventDefault()
       await  fetchProducts();
    }
    useEffect(() => {
        (async () => {
          await fetchProducts();
        })();
      }, []);
      
    const priceHandler = (e) => {
        setParams(prevParams => ({ ...prevParams, price: e.target.value }));
    };

    const isCheckedHandler = () => {
        setParams(prevParams => ({ ...prevParams, shipping: !prevParams.shipping }));
    };

    const productHandler = (e) => {
        setParams(prevParams => ({ ...prevParams, search: e.target.value }));
    };

    const categoryHandler = (e) => {
        setParams(prevParams => ({ ...prevParams, category: e.target.value }));
    };

    const companyHandler = (e) => {
        setParams(prevParams => ({ ...prevParams, company: e.target.value }));
    };

    const sortHandler = (e) => {
        setParams(prevParams => ({ ...prevParams, order: e.target.value }));
    };
    console.log(params)
  
    return (
        <>
            <form
                method="get"
                className="product-search-form"
            >
                <div className="form-control">
                    <label htmlFor="search" className="label">
                        <span className="label-text">Search product</span>
                    </label>
                    <input
                        type="search"
                        name="search"
                        className="input input-bordered input-sm"
                        value={params.search}
                        onChange={productHandler}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="category" className="label">
                        <span className="label-text capitalize">Select category</span>
                    </label>
                    <select
                        name="category"
                        id="category"
                        className="select select-bordered select-sm"
                        value={params.category}
                        onChange={categoryHandler}
                    >
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
                    <select
                        name="company"
                        id="company"
                        className="select select-bordered select-sm"
                        value={params.company}
                        onChange={companyHandler}
                    >
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
                    <select
                        name="order"
                        id="order"
                        className="select select-bordered select-sm"
                        value={params.order}
                        onChange={sortHandler}
                    >
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
                    <input
                        type="range"
                        name="price"
                        min="0"
                        max="100000"
                        className="range"
                        step="1000"
                        value={params.price}
                        onChange={priceHandler}
                    />
                    <div className="">
                        <span className="min-price">0</span>
                        <span className="max-price">Max : $1,000.00</span>
                    </div>
                </div>
                <div className="form-control items-center">
                    <label htmlFor="shipping" className="label cursor-pointer">
                        <span className="free-shipping">Free shipping</span>
                    </label>
                    <input
                        type="checkbox"
                        name="shipping"
                        className="checkbox "
                        checked={params.shipping}
                        onChange={isCheckedHandler}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={searchProducts}>Search</button>
                <button type="submit" className="btn btn-primary green">Reset</button>
            </form>
            <div className="products">
                {data.length > 0 && data.map((product) => (
                    <li key={product.id} className="product-container">
                        <div className="product-details">
                            <img src={product.attributes.image} alt={product.attributes.title} />
                            <p className="product-title">{product.attributes.title}</p>
                            <p>${product.attributes.price}</p>
                        </div>
                    </li>
                ))}
            </div>
        </>
    );
};

export default Products;
