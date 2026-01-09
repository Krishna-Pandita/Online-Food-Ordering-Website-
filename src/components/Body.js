import RestrauntCard from "./RestrauntCard";
import resobj from "../utils/mockdata";
import { useState, useEffect } from "react";
import resList from "../utils/mockdata";
import Shimmer from "./Shimmer";
import useOnlinestatus from "../utils/useonlinestatus";


import { Link } from "react-router-dom";

const Body = () => {

    const [listOfRestraunts, setlistOfRestraunts] = useState([]);
    const [searchText, setsearchText] = useState("");
    const [filteredRestraunts, setfilteredRestraunts] = useState([]);

    console.log("body rendered")

    useEffect(() => {
        fetchdata();
    }, [])

    const fetchdata = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();

        console.log(json);
        setlistOfRestraunts(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
        setfilteredRestraunts(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }


    const isOnline = useOnlinestatus();

    if (isOnline === false)
        return (
            <h1>Looks like you're Offline!!!  Please check your Internet Connection.</h1>
        )

    if (!listOfRestraunts || listOfRestraunts.length === 0) return <Shimmer />;


    // Body Component


    return (
        <div className="pb-6">                     {/*Body*/}
            <div className="body-div flex items-center justify-between px-6 bg-white">
                <div className="flex my-7 items-center gap-1.5 text-[25px] pl-100">
                    <input className="input-text h-18 w-160 border-solid rounded-2xl p-3 border border-gray-600 bg-gray-100 focus:outline-none inset-0 placeholder:text-[23px]  placeholder:flex placeholder:items-center placeholder:justify-center" type="text" value={searchText} placeholder="Search food or restaurants" onChange={(e) => {
                        setsearchText(e.target.value)
                    }} />

                    <button
                        className="border-solid border-2 rounded-xl h-13 w-14 cursor-pointer"
                        onClick={() => {
                            const filteredRestraunts = listOfRestraunts.filter((res) =>
                                res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
                            );

                            setfilteredRestraunts(filteredRestraunts);

                        }}
                    >
                        🔍
                    </button>

                </div>


                <div className="text-[25px] border-2 p-2.5 rounded-2xl ">                 {/*Search*/}
                    <button className="px-3 cursor-pointer"
                        onClick={() => {

                            const filteredRestraunts = listOfRestraunts.filter(
                                (res) => res?.info?.avgRating > 4
                            )

                            setfilteredRestraunts(filteredRestraunts);



                        }}>Top Rated Restaurants</button>
                </div>

            </div>
            <div className="flex flex-wrap justify-center items-center m-7 gap-7">           {/*Restraunt Container*/}

                {filteredRestraunts.map((restraunt) => (

                    <Link
                        key={restraunt.info.id}               // ✅ Add key here

                        to={"/restaurants/" + restraunt.info.id}><RestrauntCard                       // For Rendering Different Restraunts
                            resdata={restraunt} />  </Link>

                ))}

            </div>

        </div>
    )

}

export default Body;