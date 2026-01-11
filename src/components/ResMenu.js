import { useParams } from "react-router-dom";
import resobj from "../utils/mockdata";
import { CDN_URL } from "../utils/constants";
import useResinfo from "../utils/useResinfo";

const ResMenu = () => {
  const { resId } = useParams(); // gets id from URL

  const restaurant = useResinfo(resId);

  // safety check
  if (!restaurant) {
    return <h2>Restaurant not found</h2>;
  }


  const {
    name,
    cuisines,
    costForTwo,
    avgRating,
    cloudinaryImageId,
    sla,
  } = restaurant.info;

  return (
    <div className=" my-7 mx-9">
      <div className="resMenu-card border border-solid border-gray-400 rounded-2xl w-98 h-auto py-4 cursor-pointer transform hover:scale-95 transition-transform duration-300">
      <img className="h-80 w-85 rounded-2xl mb-3 mx-6 " src={CDN_URL+cloudinaryImageId} alt="Image Not found"></img>
      <h1 className="mx-6 py-1 font-bold text-2xl">{name}</h1>
      <h3 className="mx-6 py-1 text-xl">{cuisines.join(", ")}</h3>
      <h3 className="mx-6 py-1  text-xl">{costForTwo}</h3>
      <h3 className="mx-5 py-1 px-1 text-xl">⭐ {avgRating}
  <span>•</span>
  {sla.slaString}</h3>
  </div>
      </div>
  );
};

export default ResMenu;
