import { useEffect, useState } from "react";
import { MetaData, Product } from "./TypecriptTypes";
import buildURL from "./helpers";
import { baseURL } from "./Constants";

const Products = () => {
    const [data, setData] = useState<{ data: Product[]; meta?: MetaData }>([]);
    const [params, setParams] = useState({
        category: '',
        company: 'all',
        order: 'a-z',
        search: '',
        price: 100000,
        shipping: ''
    });
    const [currentPage, setCurrentPage] = useState(1);

    

    const fetchProducts = async () => {
        try {
            const url = buildURL(baseURL, {...params, page: currentPage})
            console.log('url', url)
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const responseData = await response.json();
            setData(responseData);
            console.log(responseData)
            return responseData;
           
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return null;
        }
    };

    const searchProducts = async (event) => {
        event.preventDefault();
        setCurrentPage(1);
        await fetchProducts();
    };
    useEffect(() => {
        (async () => {
          await fetchProducts();
        })();
      }, [currentPage]);
      
    const handlerInputData = (event) =>{
      const { name, value} = event.target;
      setParams((prevState) => ({...prevState, [name]: value}))
    }

    const handlePageChange = (page:number) => {
        setCurrentPage(page);
    };
    const paginationButtons = () => {
        if (!data.meta || !data.meta.pagination || !data.meta.pagination.pageCount) return null;

        const maxCount = data.meta.pagination.pageCount;
        const buttons = [];
        console.log('buttons',buttons)
        for (let i = 1; i <= maxCount; i++) {
            buttons.push(
                <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? 'active' : ''}>
                    {i}
                </button>
            );
        }
        return buttons;
    }
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
                        onChange={(event) =>handlerInputData(event)}
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
                        onChange={(event) => handlerInputData(event)}
                    >
                       {data.meta && data.meta.categories && data.meta.categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                         ))}
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
                        onChange={(event) =>handlerInputData(event)}
                    >
                         {data.meta && data.meta.companies && data.meta.companies.map(company => (
                          <option key={company} value={company}>{company}</option>
                         ))}
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
                        onChange={(event) => handlerInputData(event)}
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
                        <span className="current-price">${params.price}</span>
                    </label>
                    <input
                        type="range"
                        name="price"
                        min="0"
                        max="100000"
                        className="range"
                        step="1000"
                        value={params.price}
                        onChange={(event) => handlerInputData(event)}
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
                        onChange={(event) => handlerInputData(event)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={searchProducts}>Search</button>
                <button type="submit" className="btn btn-primary green">Reset</button>
            </form>
            <div className="products">
                {data.data && data.data.map((product) => (
                    <li key={product.id} className="product-container">
                        <div className="product-details">
                            <img src={product.attributes.image} alt={product.attributes.title} />
                            <p className="product-title">{product.attributes.title}</p>
                            <p>${product.attributes.price}</p>
                        </div>
                    </li>
                ))}
            </div>
            {data.meta && data.meta?.pagination?.pageCount && (
        <div className="pagination">
           <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
           {paginationButtons()}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === data.meta.pagination.pageCount}>Next</button>
       </div>
)}
        </>
    );
};

export default Products;


