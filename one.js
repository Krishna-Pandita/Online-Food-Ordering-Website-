import React, { lazy, Suspense, useState } from "react";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
// import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Error from "./src/components/Error";
import ResMenu from "./src/components/ResMenu";
// import Grocery from "./src/components/Grocery";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./src/utils/Appstore";
import Cart from "./src/components/Cart";
import ReactDOM from "react-dom/client";

const Grocery = lazy(()=>import("./src/components/Grocery"));

const About  = lazy(()=>import("./src/components/About"))

const Applayout = () => {

     const [cart, setCart] = useState([]);

    return (
        // <Provider store={appStore}>
        <div className="app">


            <Header />
            <Outlet context={{ cart, setCart }} />

        </div>
        // </Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <Suspense fallback={<h1>Loading About Page....</h1>}><About /></Suspense>,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading Grocery Page....</h1>}><Grocery /></Suspense>,
            },
            {
                path: "/restaurants/:resId",
                element:<ResMenu />,
            },
            {
                path: "/cart",
                element:<Cart />,
            }
        ],
        errorElement: <Error />,
    },

]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);