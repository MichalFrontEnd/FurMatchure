export default function reducer(state = {}, actions) {
    if (actions.type === "GET_LAGER") {
        state = {
            ...state,
            lager: actions.lager,
        };
    }
    if (actions.type === "GET_PATTERNS") {
        state = {
            ...state,

            patterns: actions.patterns,
        };
    }
    //console.log("state: ", state);
    return state;
}
