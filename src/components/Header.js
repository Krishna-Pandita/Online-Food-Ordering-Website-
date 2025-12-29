import { LOGO_URL } from "../utils/constants"
import { useState } from "react"
import {Link} from "react-router-dom";
import useOnlinestatus from "../utils/useonlinestatus";

const Header = () => {
  const [btnNameReact, setbtnNameReact] = useState("Login");
  const isOnline = useOnlinestatus();

  // Header Component

  return (

    <div className="header">                             {/* Full Header Section*/}

      <div className="logoContainer">                    {/* Logo Section*/}

        <img src={LOGO_URL} alt="Swiggy Logo" />
        <p className="name">FoodX</p>
        </div>

      <div className="navbar">                           {/* Navbar Section*/}
        <ul className="nav-li">
          <li id="onlinestatus">Online Status: {isOnline ? "✅" : "🔴"}</li>
          <li> <Link to="/">Home</Link></li>
          <li> <Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact us</Link></li>
          <li><Link to="/grocery">Grocery</Link></li>
          <li>Cart</li>
        </ul>
      </div>

      <div className="btns1">                            {/* Buttons Section*/}
        <button className="sign-in" onClick={() => {
          btnNameReact === "Login" ? setbtnNameReact("LogOut") : setbtnNameReact("Login");
        }}>{btnNameReact}</button>


      </div>




    </div>
  )
}

export default Header;