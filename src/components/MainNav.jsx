import {Link} from "react-router-dom"

function MainNav() {
  return (
    <nav>
      <ul>
        Links:
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cheese">Cheese</Link>
        </li>
        <li>
          <Link to="/meat">Meat</Link>
        </li>
        <li>
          <Link to="/wine">Wine</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
          <Link to="/cart">Shopping Cart</Link>
        </li>
      </ul>
    </nav>
  )
}
export default MainNav
