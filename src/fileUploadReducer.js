export default (state, action) => {
    console.log(state)
    switch(action.type) {
        case "ADD_SIZE":
            console.log("comeing here")
            return state
    }
    return state || {};
}
