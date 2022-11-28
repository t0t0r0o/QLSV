import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
const headers = {"Access-Control-Allow-Origin":"*"}
  await axios
    .post("http://localhost:8000/api/auth/login", user,{headers})
    .then((res) => dispatch(loginSuccess(res.data)))
    .catch((res) => {dispatch(loginFailure(res.response))});
};
