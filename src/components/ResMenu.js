import { useParams } from "react-router-dom";
import resobj from "../utils/mockdata";
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
  } = restaurant.info;

  return (
    <div className="menu">
      <img src={cloudinaryImageId} alt="Image Not found"></img>
      <h1>{name}</h1>
      <h3>{cuisines.join(", ")}</h3>
      <h3>{costForTwo}</h3>
      <h3>Rating: {avgRating}</h3>
    </div>
  );
};

export default ResMenu;
