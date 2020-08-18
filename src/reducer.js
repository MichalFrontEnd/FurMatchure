export default function reducer(state = {}, actions) {
    if (actions.type === "GET_LAGER") {
        state = {
            ...state,
            lager: actions.lager,
        };
    }
    console.log("state: ", state);
    return state;
}
