const FavoriteActions = {
    ADD_FAVORITE: val => {
        return {
            type: "ADD_FAVORITE",
            payload: val
        };
    },
    REMOVE_FAVORITE: val => {
        return {
            type: "REMOVE_FAVORITE",
            payload: val
        };
    },
};

export default FavoriteActions
