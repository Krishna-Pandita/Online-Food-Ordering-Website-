import { CDN_URL } from "../utils/constants";

const RestrauntCard = (props) =>{                   // Restraunt Card

    const {resdata} = props;

    // console.log(props)

const {cloudinaryImageId,name,cuisines,costForTwo,avgRating} = resdata?.info;

    return (
        <div className="h-130 w-100 bg-gray-50 items-center justify-center p-2 rounded-2xl hover:border-2 hover:border-gray-600">
            
            <img className="h-77 w-100 flex rounded-2xl" src={CDN_URL+cloudinaryImageId} alt="Image Loading">
            </img>

            <h2 className="font-bold text-xl p-2 py-2">{name}</h2> 

            <h4 className="text-lg p-1 px-2">{cuisines.join(", ")}</h4> 

            <h4 className="text-lg p-1 px-2">Only {costForTwo}</h4>

            <h4 className="text-lg p-1 px-2">{avgRating} Stars</h4>

            {/* <h4>{resdata.info.sla.deliveryTime} minutes</h4> */}

        </div>
    )
}

export default RestrauntCard;
