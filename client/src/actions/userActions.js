import axios from "axios";

import {
    ADD_CONTENT,
    GET_ERRORS
} from "./types";

export const addContent = (contentData, history) => dispatch => {
  console.log("Add Content: ", contentData);
  axios
    .post("/api/users/addContent", contentData)
    .then(res => history.push("/")) 
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
