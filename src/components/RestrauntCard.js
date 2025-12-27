import { CDN_URL } from "../utils/constants";

const RestrauntCard = (props) =>{                   // Restraunt Card

    const {resdata} = props;

    // console.log(props)

const {cloudinaryImageId,name,cuisines,costForTwo,avgRating} = resdata?.info;

    return (
        <div className="res-card">
            
            <img className="res-logo" src={CDN_URL+cloudinaryImageId} alt="Image Loading">
            </img>

            <h2>{name}</h2> 

            <h4>{cuisines.join(", ")}</h4> 

            <h4>Only {costForTwo}</h4>

            <h4>{avgRating} Stars</h4>

            {/* <h4>{resdata.info.sla.deliveryTime} minutes</h4> */}

        </div>
    )
}

export default RestrauntCard;
