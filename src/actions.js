import axios from "axios";

export async function getLager() {
    const { data } = await axios.get("/lagermenu");
    //console.log("data: ", data);
    return {
        type: "GET_LAGER",
        lager: data.rows,
    };
}
