import { useParams } from "react-router-dom";
import useResinfo from "../utils/useResinfo";
import { CDN_URL } from "../utils/constants";
// import Shimmer from "./Shimmer";

const ResMenu = () => {
  const { resId } = useParams();
  const restaurant = useResinfo(resId);

  if (!restaurant) return <h1>Restaurant not found</h1>;

  const { name, cuisines, costForTwo, cloudinaryImageId, sla, avgRating } = restaurant.info || {};
  return (
    <div className="res-bg my-7 ">
      {/* Restaurant Info */}
      <div className="flex justify-center items-center ">
        <div className="resMenu-card border rounded-3xl border-gray-200 h-106 w-85 py-3 bg-gray-50 transition-transform duration-300 hover:scale-95 cursor-pointer">
          <div className="flex justify-center items-center">
          <img
            className="rounded-3xl mb-2 h-60 w-74 flex justify-center items-center"
            src={CDN_URL + cloudinaryImageId}
            alt={name}
          />
          </div>
          <div className="pl-6 gap-2 ">
          <h1 className="font-bold text-lg text-gray-800 py-1">{name}</h1>
          <p className="text-md font-normal text-gray-800 py-1">{cuisines.join(", ")}</p>
          <p className="text-gray-800 text-md py-1">🟊 {avgRating} • {sla?.slaString || "N/A"}</p>
          <p className="font-bold text-gray-800">{costForTwo}</p>
          </div>
        </div>
      </div>

      </div>
  );
};

export default ResMenu;
