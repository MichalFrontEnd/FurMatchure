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
    if (actions.type === "ADD_PATTERNS") {
        state = {
            ...state,

            patterns: [...state.patterns, actions.newPattern],
        };
    }
    console.log("state.patterns after ADD: ", state.patterns);
    return state;
}
