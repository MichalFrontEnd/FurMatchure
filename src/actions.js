import axios from "axios";

export async function getLager() {
    const { data } = await axios.get("/getlager");
    //console.log("data: ", data);
    return {
        type: "GET_LAGER",
        lager: data.rows,
    };
}
export async function getPatterns() {
    const { data } = await axios.get("/getpatterns");
    //console.log("data: ", data);
    return {
        type: "GET_PATTERNS",
        patterns: data.rows,
    };
}
