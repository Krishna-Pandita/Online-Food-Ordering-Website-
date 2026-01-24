import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";

import RestrauntCard from "./RestrauntCard";
import Shimmer from "./Shimmer";
import useOnlinestatus from "../utils/useonlinestatus";

const Body = () => {
 
          // FOR SETTING SEARCHED TEXT OF RESTURANT
  const [searchText, setSearchText] = useState("");

          //FOR WHAT'S ON YOUR MIND? RESTUARANTS
         
  const [minditems, setminditems] = useState([]);

          //FOR TOP RESTAURANTS

  const [topBrandsTitle, setTopBrandsTitle] = useState("");          //TITLE
  const [topBrandRestaurants, setTopBrandRestaurants] = useState([]);  //RESTUARNTS LIST
 
          //FOR POPULAR RESTAURANTS

  const [popularRestaurantsTitle, setPopularRestaurantsTitle] = useState("");   //TITLE
  const [popularRestaurantsList, setPopularRestaurantsList] = useState([]);     //RESTUARNTS LIST

           // FOR FILTERING RESTAURANTS

  const [originalTopBrands, setOriginalTopBrands] = useState([]);    // FOR RESET TOP RESTAURANTS
  const [originalPopular, setOriginalPopular] = useState([]);        // FOR RESET POPULAR RESTUARANTS
  
            // FOR BEST PLACES SECTION

  const[bestplaces, setbestplaces] = useState([]); 

              //  FOR BEST CUISINES

    const[bestcuisineslist,setbestcuisineslist] = useState([]);
    


  const isOnline = useOnlinestatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.3538&lng=85.8145&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await res.json();
      const cards = json?.data?.cards || [];

      // minditms restaurants

const mindCard = cards?.find(
  (c) => c?.card?.card?.id === "whats_on_your_mind"
);

setminditems(
  mindCard?.card?.card?.gridElements?.infoWithStyle?.info || []
);

              /*  TOP BRANDS \ */

      const topBrandCard = cards.find(
        (c) => c?.card?.card?.id === "top_brands_for_you"
      );
      const topBrands =
        topBrandCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];
      setTopBrandsTitle(topBrandCard?.card?.card?.header?.title || "");
      setTopBrandRestaurants(topBrands);

      setOriginalTopBrands(topBrands);

      /* ================= POPULAR RESTAURANTS ================= */
      const popularCard = cards.find(
        (c) => c?.card?.card?.id === "restaurant_grid_listing_v2"
      );

      const popularRestaurants =
        popularCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        const popularTitleCard = cards.find(
        (c) => c?.card?.card?.id === "popular_restaurants_title"
      );
      
      const popularTitle = popularTitleCard?.card?.card?.title || "Popular Restaurants";

      setPopularRestaurantsTitle(popularTitle);
      setPopularRestaurantsList(popularRestaurants);

      setOriginalPopular(popularRestaurants);



  /* ================= BEST PLACES ================= */

    const bestPlacesCard = cards.find(
      (c) => c?.card?.card?.id === "restaurant_near_me_links"
    );

    setbestplaces(bestPlacesCard?.card?.card?.brands || []);



      // BETS CUISINES

    const bestcuisnescard = cards?.find((c) => c?.card?.card?.title==="Best Cuisines Near Me");
    const cuisineslist = bestcuisnescard?.card?.card?.brands || [];

    setbestcuisineslist(cuisineslist);


    } catch (err) {
      console.error("Error fetching restaurants:", err);
    }



  };

  if (!isOnline) {
    return (
      <div className="mt-10 flex justify-center">
        <h1 className="text-2xl text-gray-800">
          You're offline! Please check your internet connection.
        </h1>
      </div>
    );



  }

  if (topBrandRestaurants.length === 0 && popularRestaurantsList.length === 0) return <Shimmer />;

  return (

    <div className="pagebody pb-6  px-2">
 
               {/* search input + top rated restaurants + show all */}
                        
      <div className="flex items-center justify-between px-6 pb-6">

                     {/* 🔍 SEARCH BAR */}
                     
        <div className="search flex items-center gap-2 justify-center mt-4">
          <input
            className="h-17 w-158 border rounded-2xl p-3 bg-gray-100 ml-12 "
            type="text"
            placeholder=" Search food or restaurants"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className="border-2 rounded-2xl h-14 w-14 text-2xl cursor-pointer"
            onClick={() => {
              const filteredTop = originalTopBrands.filter((res) =>
                res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
              );
              const filteredPop = originalPopular.filter((res) =>
                res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
              );
              setTopBrandRestaurants(filteredTop);
              setPopularRestaurantsList(filteredPop);
            }}
          >
            🔍
          </button>
        </div>

        {/* ⭐ TOP RATED FILTER */}
         
         <div className="flex justify-end items-center gap-4">
        <button
          className="border-2 rounded-2xl px-4 py-2 h-13 cursor-pointer"
          onClick={() => {
            const filteredTop = originalTopBrands.filter(
              (res) => res?.info?.avgRating > 4.2
            );
            const filteredPop = originalPopular.filter(
              (res) => res?.info?.avgRating > 4.2
            );
            setTopBrandRestaurants(filteredTop);
            setPopularRestaurantsList(filteredPop);
          }}
        >
          Top Rated Restaurants
        </button>


        {/* 🔄 RESET FILTER */}
        <button
          className="border-2 rounded-2xl px-4 py-2 h-13 cursor-pointer"
          onClick={() => {
            setTopBrandRestaurants(originalTopBrands);
            setPopularRestaurantsList(originalPopular);
          }}
        >
          Show All
           </button>
        </div>


      </div>

     
                        {/* whats_on_your_mind*/}
 
{minditems.length> 0 && (
  <>
    <div className=" mx-9 py-4">
      <h2 className="text-2xl font-bold px-17 py-4">What's on your mind?</h2>
      
      <div className="   category-container flex overflow-x-auto hover-scroll py-0.5">
        {minditems.map((item) => (
          <div key={item.id} >
          <div className=" w-47 h-48  flex justify-center items-center rounded-4xl overflow-x-auto dark:bg-[#06173f]">
            <img
              src={ CDN_URL+item.imageId}
              alt={item.alt}
              className="w-37 h-40 bg-gray-400 rounded-2xl cursor-pointer "
            />
            </div>
            {/* <p>{item.action.text}</p> */}
          </div>
        ))}
      </div>

    </div>
  </>
)}



      {/* 🔹 TOP BRANDS */}

      {topBrandsTitle && topBrandRestaurants.length > 0 && (
        <div className="py-4 ">
          <h2 className="text-2xl font-bold px-17 py-4">{topBrandsTitle}</h2>
          <div className="flex flex-wrap gap-5 px-8 justify-center items-center">
            {topBrandRestaurants.map((res) => (
              <Link
                key={`top-${res.info.id}`}
                to={`/restaurants/${res.info.id}`}
              >
                <RestrauntCard resdata={res} />
              </Link>
            ))}
          </div>
        </div>
      )}


      {/* 🔹 POPULAR RESTAURANTS */}

      {popularRestaurantsTitle && popularRestaurantsList.length > 0 && (
        <div className="py-6 ">
          <h2 className="text-2xl font-bold px-17 py-4">
            {popularRestaurantsTitle}
          </h2>
          <div className="flex flex-wrap gap-5 px-8 justify-center items-center">
            {popularRestaurantsList.map((res) => (
              <Link
                key={`popular-${res.info.id}`}
                to={`/restaurants/${res.info.id}`}
              >
                <RestrauntCard resdata={res} />
              </Link>
            ))}
          </div>
        </div>
      )}


                     {/* 🔹 best places */}

           
{bestplaces.length > 0 && (
  <div className="py-6">
    <h2 className="text-2xl font-bold px-17 py-4">
      Best Places to Eat Across Cities
    </h2>

    <div className="flex flex-wrap gap-4 px-8 justify-center">
      {bestplaces.map((place, index) => (
        <a
          key={`best-${index}`}
          href={place.link}
          target="_blank"
          className="w-72 border rounded-xl p-4 hover:shadow-lg transition"
        >
          <p className="bestPlacesLink font-semibold text-lg text-center text-gray-700">
            {place.text}
          </p>
        </a>
      ))}
    </div>
  </div>
)}

 

                   {/* BEST CUISNES NEAR ME  */}

        {bestcuisineslist.length > 0 &&(
        
        <div className="py-6">
            <h2 className="text-2xl font-bold px-17 py-4">Best Cuisines Near Me</h2>

        <div className="flex flex-wrap gap-4 px-8 justify-center">
            {bestcuisineslist.map((place,index)=>(
<a key={`cuisines-${index}`}
href={place.link}
target="_blank"
className="w-72 border rounded-xl p-4 hover:shadow-lg transition"

>
<p className="bestPlacesLink font-semibold text-lg text-center text-gray-700">{place.text}</p>
</a>

            ))}
          </div>
        

        </div>
        )}


    </div>
  );
};

export default Body;
