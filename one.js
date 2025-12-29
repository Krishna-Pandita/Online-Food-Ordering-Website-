import React,{lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
// import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Error from "./src/components/Error";
import ResMenu from "./src/components/ResMenu";
// import Grocery from "./src/components/Grocery";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";


const Grocery = lazy(()=>import("./src/components/Grocery"));

const About  = lazy(()=>import("./src/components/About"))

const Applayout = () => {
    return (
        <div className="app">

            <Header />
            <Outlet />

        </div>
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
        ],
        errorElement: <Error />,
    },

]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);