import { CDN_URL } from "../utils/constants";

const RestrauntCard = (props) => {                   // Restraunt Card

    const { resdata } = props;

    // console.log(props)

    const { cloudinaryImageId, name, cuisines, costForTwo, avgRating, sla , areaName} = resdata?.info;

    return (
        <div className=" res-card h-106 w-82 bg-gray-50 items-center justify-center py-2 px-2 pb-4 mx-2 rounded-2xl hover:border-gray-600 transform hover:scale-95 transition-transform duration-300">
<div className="flex justify-center items-center ">
            <img className="h-60 w-74 mt-1 flex rounded-2xl" src={CDN_URL + cloudinaryImageId} alt="">
            </img>
</div>
            <h2 className="font-bold text-lg pt-1.5 px-1.5 py-1 text-gray-800">{name}</h2>

            <h3 className="text-md px-1.5 py-0.5 text-gray-800">🟊 {avgRating}
          <span className="px-1">•</span>
          {sla.slaString}</h3>

            <h4 className="text-md font-normal text-gray-800 px-2">{cuisines.join(", ")}</h4>

            <h3 className="text-md px-2 text-gray-800">{areaName}</h3>


            {/* <h4 className="text-md p-1 px-2">Only {costForTwo}</h4> */}


          {/* <h4 className="text-sm p-1 px-2">{areaName}</h4> */}

            {/* <h4>{resdata.info.sla.deliveryTime} minutes</h4> */}

        </div>
        
    )
}

export default RestrauntCard;
