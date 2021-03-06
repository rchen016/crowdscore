import axios from "axios";

import {
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

export const changePassword = (contentData, history) => dispatch =>{
    console.log("Changing Password Now", contentData);
    axios
        .post("api/users/changePW", contentData)
        .then(res => history.push("/profile"))
        .catch(err=>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// export const removeContent = (contentData, history) => dispatch => {
//     axios.post("api/users/removeContent",contentData)
//         .then(res=>{
//             history.push("/settings")
//         })
//         .catch(err=>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             }));
// };
// export const retrieveContentList = (contentData, history) => dispatch =>{
//     console.log("UA: Retrieve: ",contentData);
//     axios
//         .post("api/users/getContentList", contentData)
//         .then(res => {
//             console.log("What is Res: ", res);
//             history.push("/settings")
//         })
//         .catch(err=>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         );
// };
