
const NavBar = () => {
    return (
        <div className="navbar">
            <ul>
                <li className="brand">COMFY</li>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#" className="cart-icon">Cart</a></li>
            </ul>
        </div>
    );
}

export default NavBar;
