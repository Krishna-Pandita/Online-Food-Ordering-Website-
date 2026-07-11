import { LOGO_URL } from "../utils/constants"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import useOnlinestatus from "../utils/useonlinestatus";
import Button from "@mui/material/Button";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
// import logo from "../assets/foodimage23333.png";



const Header = () => {
  const [btnNameReact, setbtnNameReact] = useState("Login");
  const [dark,setdark] = useState(false);

useEffect(() => {
  document.documentElement.classList.toggle("dark", dark);
  document.body.classList.toggle("dark", dark);
}, [dark]);


  const isOnline = useOnlinestatus();
  // Header Component

  return (

    <div className="header flex justify-between h-31 px-8 border-b border-gray-200">                             {/* Full Header Section*/}

      <div className="flex items-center gap-3.5">                    {/* Logo Section*/}

        <img className=" ml-4 h-20 rounded-b-4xl bg-transparent border border-solid border-gray-300" src={LOGO_URL} alt="Swiggy Logo" />
        <p className="flex items-center text-xl font-semibold">UrbanEats</p>
      </div>

      <div className="flex items-center justify-center">                           {/* Navbar Section*/}
        <ul className="flex justify-center items-center gap-14 text-[23px] font-normal ">
          
          {/* <li id="onlinestatus">Online Status: {isOnline ? "Active" : "Disconnected"}</li> */}
          <li className="hover:text-orange-500 hover:font-bold"> <Link to="/">Home</Link></li>
          <li className="hover:text-orange-500 hover:font-bold"> <Link to="/about">About Us</Link></li>
          <li className="hover:text-orange-500 hover:font-bold"> <Link to="/contact">Contact us</Link></li>
          <li className="hover:text-orange-500 hover:font-bold"> <Link to="/grocery">Grocery</Link></li>
          <li className="hover:text-orange-500 hover:font-bold"> <Link to="/cart">Cart</Link></li>

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
        <Button className="Logging border-2 p-2.5 rounded-2xl px-6" variant="text" onClick={() => {
          btnNameReact === "Login" ? setbtnNameReact("Logout") : setbtnNameReact("Login");
        }} sx={{
          borderRadius: "16px",
          padding: "8px 24px",
          fontSize: "19px",
          textTransform: "none",
          // borderColor: "#000000",
          color: "black",
          "&:hover": {
            // backgroundColor: "#black",
            // borderColor: "#black",
          },
        }}>{btnNameReact}</Button>

     
      {dark ? (
  <LightModeIcon
  
    sx={{
      height: 40,
      width: 50,
      // borderRadius: "16px",
      // border: "1px solid #9CA3AF",
      cursor: "pointer",
      // padding: "8px",
      
    }}
    onClick={() => setdark(false)} 
 />
) : (
  <DarkModeIcon
    sx={{
        height: 40,
      width: 50,
      // borderRadius: "16px",
      // border: "1px solid #9CA3AF",
      cursor: "pointer",
      //  padding: "8px",
    }}
    onClick={() => setdark(true)}
  />
)}

      </div>






    </div>
  )
}

export default Header;