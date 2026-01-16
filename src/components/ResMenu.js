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


  // const itemCategoryCards =
  // restaurant?.cards
  //   ?.find(c => c.groupedCard)
  //   ?.groupedCard
  //   ?.cardGroupMap
  //   ?.REGULAR
  //   ?.cards
  //   ?.filter(
  //     item =>
  //       item.card?.card?.["@type"] ===
  //       "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  //   ) || [];


  // const itemCategoryCards =
  // restaurant.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter(
  //   item =>
  //     item.card?.card?.["@type"] ===
  //     "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  // );

  const {
    name,
    cuisines,
    costForTwo,
    avgRating,
    cloudinaryImageId,
    sla,
    areaName
  } = restaurant.info;

  return (
    <div className="res-bg my-7 flex justify-center items-center">
      <div className="resMenu-card border border-solid bg-yellow-100 border-gray-400 rounded-3xl w-82 h-auto py-6 cursor-pointer transform hover:scale-95 transition-transform duration-300">
        <div className="flex justify-between items-center">
        <img className="h-65 w-74 rounded-3xl mb-3 mx-6 " src={CDN_URL + cloudinaryImageId} alt="Image Not found"></img>
       </div>
        <h1 className="mx-7 font-bold text-xl">{name}</h1>
        <h3 className="mx-7 text-md font-normal text-gray-800">{cuisines.join(", ")}</h3>
        <h3 className="mx-7 gap-3 text-md text-gray-800">🟊 {avgRating}
          <span className="px-1">•</span>
          {sla.slaString}</h3>
        <h3 className="mx-7 text-md font-bold py-1 text-gray-800">{costForTwo}</h3>

      </div>
    </div>
  );
};

export default ResMenu;
