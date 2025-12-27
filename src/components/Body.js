import RestrauntCard from "./RestrauntCard";
import resobj from "../utils/mockdata";
import { useState, useEffect} from "react";
import resList from "../utils/mockdata";
import Shimmer from "./Shimmer";

import { Link } from "react-router-dom";

const Body = () =>{   
    
    const [listOfRestraunts, setlistOfRestraunts] = useState([]);
    const [searchText, setsearchText] = useState("");
    const [filteredRestraunts, setfilteredRestraunts] = useState([]);

    console.log("body rendered")

    useEffect(()=>{
        fetchdata();
    }, [])

     const fetchdata = async () =>{
const data =await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
const json = await data.json();

console.log(json);
setlistOfRestraunts(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
setfilteredRestraunts(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
     }

if (!listOfRestraunts || listOfRestraunts.length === 0) return <Shimmer />;


    // Body Component

    return (
        <div className="body">                     {/*Body*/}
   <div className="search-Parent">
             <div className="Search">
                <input className="search-box" type="text" value={searchText} onChange={(e)=>{
                      setsearchText(e.target.value)
                }}/>

               <button
                   id="search-Box"
                   onClick={() => {
                   const filteredRestraunts = listOfRestraunts.filter((res) =>
                   res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
               );

            setfilteredRestraunts(filteredRestraunts);
  }}
>
  Search
</button>

             </div>


            <div className="filter">                 {/*Search*/}
                    <button className="filterbtn"
                    onClick={() =>{
   
    const filteredRestraunts = listOfRestraunts.filter(
        (res) => res?.info?.avgRating>4
    )

setfilteredRestraunts(filteredRestraunts);



}}>Top Rated Restraunts</button>
                </div>

</div>
               <div className="res-container">           {/*Restraunt Container*/}

                {filteredRestraunts.map((restraunt) => (

                    <Link 
                        key={restraunt.info.id}               // ✅ Add key here

                    to={"/restaurants/"+restraunt.info.id}><RestrauntCard                       // For Rendering Different Restraunts
                    resdata={restraunt} />  </Link>                 

                ))}
                   
               </div>

        </div>
    )

}

export default Body;