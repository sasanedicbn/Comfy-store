const Products = () => {
    return(
        <form
      method="get"
      className="product-search-form"
    >
      <div className="form-control">
        <label htmlFor="search" className="label">
          <span className="label-text capitalize">search product</span>
        </label>
        <input type="search" name="search" className="input input-bordered input-sm" value="" />
      </div>
      <div className="form-control">
        <label htmlFor="category" className="label">
          <span className="label-text capitalize">select category</span>
        </label>
        <select name="category" id="category" className="select select-bordered select-sm">
          <option value="all" selected="">all</option>
          <option value="Tables">Tables</option>
          <option value="Chairs">Chairs</option>
          <option value="Kids">Kids</option>
          <option value="Sofas">Sofas</option>
          <option value="Beds">Beds</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="company" className="label">
          <span className="label-text capitalize">select company</span>
        </label>
        <select name="company" id="company" className="select select-bordered select-sm">
          <option value="all" selected="">all</option>
          <option value="Modenza">Modenza</option>
          <option value="Luxora">Luxora</option>
          <option value="Artifex">Artifex</option>
          <option value="Comfora">Comfora</option>
          <option value="Homestead">Homestead</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="order" className="label">
          <span className="label-text capitalize">sort by</span>
        </label>
        <select name="order" id="order" className="select select-bordered select-sm">
          <option value="a-z" selected="">a-z</option>
          <option value="z-a">z-a</option>
          <option value="high">high</option>
          <option value="low">low</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="price" className="label cursor-pointer">
          <span className="label-text capitalize">select price</span>
          <span>$1,000.00</span>
        </label>
        <input type="range" name="price" min="0" max="100000" className="range range-primary range-sm" step="1000" value="100000" />
        <div className="w-full flex justify-between text-xs px-2 mt-2">
          <span className="font-bold text-md">0</span>
          <span className="font-bold text-md">Max : $1,000.00</span>
        </div>
      </div>
      <div className="form-control items-center">
        <label htmlFor="shipping" className="label cursor-pointer">
          <span className="label-text capitalize">free shipping</span>
        </label>
        <input type="checkbox" name="shipping" className="checkbox checkbox-primary checkbox-sm" />
      </div>
      <button type="submit" className="btn btn-primary btn-sm">search</button>
      <a href="/products" className="btn btn-accent btn-sm">reset</a>
    </form>
    )
}
export default Products;