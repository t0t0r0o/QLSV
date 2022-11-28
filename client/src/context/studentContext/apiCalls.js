import axios from "axios";
import {
  createStudentFailure,
  createStudentStart,
  createStudentSuccess,
  deleteStudentFailure,
  deleteStudentStart,
  deleteStudentSuccess,
  getStudentsFailure,
  getStudentsStart,
  getStudentsSuccess,
} from "./StudentActions";

const URL = "http://localhost:8000/api";

export const getStudents = async (dispatch) => {
  dispatch(getStudentsStart());
  try {
    const res = await axios.get(URL+"/students", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("JWT")).accessToken,
      },
    });
    dispatch(getStudentsSuccess(res.data));
  } catch (err) {
    dispatch(getStudentsFailure());
  }
};

//create
export const createStudent = async (student, dispatch) => {
  dispatch(createStudentStart());
  try {
    const res = await axios.post(URL+"/students", student, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("student")).accessToken,
      },
    });
    dispatch(createStudentSuccess(res.data));
  } catch (err) {
    dispatch(createStudentFailure());
  }
};

//delete
export const deleteStudent = async (id, dispatch) => {
  dispatch(deleteStudentStart());
  try {
    await axios.delete(URL+"/students/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("student")).accessToken,
      },
    });
    dispatch(deleteStudentSuccess(id));
  } catch (err) {
    dispatch(deleteStudentFailure());
  }
};
