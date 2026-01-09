import { LOGO_URL } from "../utils/constants"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import useOnlinestatus from "../utils/useonlinestatus";
import Button from "@mui/material/Button";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
// import { NavLink } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { grey } from "@mui/material/colors";
import {LOGO} from "../utils/constants";




const Header = () => {
  const [btnNameReact, setbtnNameReact] = useState("Login");
  const [dark,setdark] = useState(false);

  useEffect(() => {
        document.body.classList.toggle("dark", dark);
  },[dark])


  const isOnline = useOnlinestatus();
  // Header Component

  return (

    <div className="header flex justify-between h-40 px-8 border-b border-gray-200">                             {/* Full Header Section*/}

      <div className="flex items-center">                    {/* Logo Section*/}

        <img className="h-29 rounded-3xl bg-transparent" src={LOGO_URL} alt="Swiggy Logo" />
        <p className="flex items-center text-3xl font-semibold">UrbanEats</p>
      </div>

      <div className="flex items-center justify-center">                           {/* Navbar Section*/}
        <ul className="flex justify-center items-center gap-14 text-[29px] font-normal ">
          <li id="onlinestatus">Online Status: {isOnline ? "Active" : "Disconnected"}</li>
          <li className="hover:text-orange-500 hover:font-bold"> <Link to="/">Home</Link></li>
          <li className="hover:text-orange-500 hover:font-bold"> <Link to="/about">About Us</Link></li>
          <li className="hover:text-orange-500 hover:font-bold"> <Link to="/contact">Contact us</Link></li>
          <li className="hover:text-orange-500 hover:font-bold"> <Link to="/grocery">Grocery</Link></li>
          <Button className="addItem" variant="text" startIcon={<ShoppingCartRounded />} sx={{
            fontSize: "21px",
            color: "black",
            padding: "8px 10px",
          }}>
            Add item
          </Button>

          {/* { <Button
            component={NavLink}
            to="/about"
            sx={{
              fontSize: "16px",
              color: "#000",
            }}
          >
            About
          </Button> } */}


        </ul>
      </div>

      <div className="flex justify-between items-center text-[29px] font-normal  gap-5 ">                            {/* Buttons Section*/}
        <Button className="Logging border-2 p-2.5 rounded-2xl px-6" variant="outlined" onClick={() => {
          btnNameReact === "Login" ? setbtnNameReact("Logout") : setbtnNameReact("Login");
        }} sx={{
          borderRadius: "16px",
          padding: "8px 24px",
          fontSize: "23px",
          textTransform: "none",
          borderColor: "#000000",
          color: "black",
          "&:hover": {
            backgroundColor: "#black",
            borderColor: "#black",
          },
        }}>{btnNameReact}</Button>

     
      {dark ? (
  <LightModeIcon
    sx={{
      height: 60,
      width: 70,
      borderRadius: "16px",
      border: "1px solid #9CA3AF",
      cursor: "pointer",
      padding: "8px",
    }}
    onClick={() => setdark(false)}
  />
) : (
  <DarkModeIcon
    sx={{
        height: 60,
      width: 70,
      borderRadius: "16px",
      border: "1px solid #9CA3AF",
      cursor: "pointer",
       padding: "8px",
    }}
    onClick={() => setdark(true)}
  />
)}

      </div>






    </div>
  )
}

export default Header;