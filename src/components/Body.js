import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RestrauntCard from "./RestrauntCard";
import Shimmer from "./Shimmer";
import useOnlinestatus from "../utils/useonlinestatus";

const Body = () => {
  const [searchText, setSearchText] = useState("");

  const [topBrandsTitle, setTopBrandsTitle] = useState("");
  const [topBrandRestaurants, setTopBrandRestaurants] = useState([]);

  const [popularRestaurantsTitle, setPopularRestaurantsTitle] = useState("");
  const [popularRestaurantsList, setPopularRestaurantsList] = useState([]);

  const [originalTopBrands, setOriginalTopBrands] = useState([]);
  const [originalPopular, setOriginalPopular] = useState([]);

  const isOnline = useOnlinestatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await res.json();
      const cards = json?.data?.cards || [];

      /* ================= TOP BRANDS ================= */
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

      /* Get title from API */
      const popularTitleCard = cards.find(
        (c) => c?.card?.card?.id === "popular_restaurants_title"
      );
      const popularTitle = popularTitleCard?.card?.card?.title || "Popular Restaurants";

      setPopularRestaurantsTitle(popularTitle);
      setPopularRestaurantsList(popularRestaurants);
      setOriginalPopular(popularRestaurants);
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
      {/* 🔍 SEARCH BAR */}
      <div className="flex items-center justify-between px-6 pb-6">
        <div className="search flex items-center gap-2 justify-center mt-4">
          <input
            className="h-15 w-146 border rounded-2xl p-3 bg-gray-100 ml-12 "
            type="text"
            placeholder=" Search food or restaurants"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className="border-2 rounded-2xl h-14 w-14"
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
    </div>
  );
};

export default Body;
