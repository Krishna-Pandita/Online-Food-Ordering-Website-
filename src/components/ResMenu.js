import { useParams } from "react-router-dom";
import resobj from "../utils/mockdata";

const ResMenu = () => {
  const { resid} = useParams(); // gets id from URL

  // find only the clicked restaurant
  const restaurant = resobj.find(
    (res) => res.info.id === resId
  );

  // safety check
  if (!restaurant) {
    return <h2>Restaurant not found</h2>;
  }

  const {
    name,
    cuisines,
    costForTwo,
    avgRating,
    areaName
  } = restaurant.info;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h3>{cuisines.join(", ")}</h3>
      <h3>{costForTwo}</h3>
      <h3>Rating: {avgRating}</h3>
    </div>
  );
};

export default ResMenu;
