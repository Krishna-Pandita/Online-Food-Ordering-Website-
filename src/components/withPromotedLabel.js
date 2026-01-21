import RestrauntCard from "./RestrauntCard"

const withPromotedLabel  = (RestrauntCard) =>{
    return (props) => {
        return (
            <div className="relative">
                <button className="absolute bg-black text-white">Promoted</button>
                <RestrauntCard {...props} />
            </div>
        )

    }
}
export default withPromotedLabel;