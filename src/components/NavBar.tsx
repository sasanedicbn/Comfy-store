import { Link, Outlet } from "react-router-dom";
const NavBar = () => {
    return (
        <>
        <div className="navbar">
            <ul>
                <li className="brand"><Link to="/">COMFY</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="#" className="cart-icon">Cart</Link></li>
            </ul>
        </div>
        <Outlet/>
        </>
    );
}

export default NavBar;
