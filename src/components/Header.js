import { LOGO_URL } from "../utils/constants"
import { useState } from "react"
import {Link} from "react-router-dom";
import useOnlinestatus from "../utils/useonlinestatus";


const Header = () => {
  const [btnNameReact, setbtnNameReact] = useState("Login");
  const isOnline = useOnlinestatus();

  // Header Component

  return (

    <div className="flex justify-between h-40 px-8">                             {/* Full Header Section*/}

      <div className="flex items-center">                    {/* Logo Section*/}

        <img className="h-29 rounded-3xl bg-transparent" src={LOGO_URL} alt="Swiggy Logo" />
        <p className="flex items-center text-5xl font-semibold">FoodX</p>
        </div>

      <div className="flex items-center justify-center">                           {/* Navbar Section*/}
        <ul className="flex justify-center items-center gap-12 text-[29px] font-normal ">
          <li id="onlinestatus">Online Status: {isOnline ? "Active" : "Disconnected"}</li>
          <li className="hover:text-orange-500"> <Link to="/">Home</Link></li>
          <li className="hover:text-orange-500"> <Link to="/about">About Us</Link></li>
          <li className="hover:text-orange-500"> <Link to="/contact">Contact us</Link></li>
          <li className="hover:text-orange-500"> <Link to="/grocery">Grocery</Link></li>
          <li className="hover:text-orange-500">Cart</li>
        </ul>
      </div>

      <div className="flex justify-end items-center text-[29px] font-normal  ">                            {/* Buttons Section*/}
        <button className="border-2 p-2.5 rounded-2xl px-6" onClick={() => {
          btnNameReact === "Login" ? setbtnNameReact("LogOut") : setbtnNameReact("Login");
        }}>{btnNameReact}</button>


      </div>




    </div>
  )
}

export default Header;