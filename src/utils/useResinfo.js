import resobj from "./mockdata";

const useResinfo = (resId) => {
    const restaurant = resobj.find(
        (res) => res.info.id === resId
    );
    return restaurant;
}

export default useResinfo;