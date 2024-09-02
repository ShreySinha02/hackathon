import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"

function Navbar() {
  return (
    <div className=" w-full h-full  bg-white flex flex-row pl-16 items-center space-x-8">
        <div>
            <Link to="/">
            <img src={logo} alt="logo" />
            </Link>
        </div>
        <div>
            <ul>
                <li><Link to="/challenge">Explore Challege</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar;