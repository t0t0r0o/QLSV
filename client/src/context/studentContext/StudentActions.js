export const getStudentsStart = () => ({
    type: "GET_STUDENTS_START",
  });
  
  export const getStudentsSuccess = (users) => ({
    type: "GET_STUDENTS_SUCCESS",
    payload: users,
  });
  
  export const getStudentsFailure = () => ({
    type: "GET_STUDENTS_FAILURE",
  });
  
  export const createStudentStart = () => ({
    type: "CREATE_STUDENT_START",
  });
  
  export const createStudentSuccess = (student) => ({
    type: "CREATE_STUDENT_SUCCESS",
    payload: student,
  });
  
  export const createStudentFailure = () => ({
    type: "CREATE_STUDENT_FAILURE",
  });
  
  export const updateStudentStart = () => ({
    type: "UPDATE_STUDENT_START",
  });
  
  export const updateStudentSuccess = (student) => ({
    type: "UPDATE_STUDENT_SUCCESS",
    payload: student,
  });
  
  export const updateStudentFailure = () => ({
    type: "UPDATE_STUDENT_FAILURE",
  });
  
  export const deleteStudentStart = () => ({
    type: "DELETE_STUDENT_START",
  });
  
  export const deleteStudentSuccess = (id) => ({
    type: "DELETE_STUDENT_SUCCESS",
    payload: id,
  });
  
  export const deleteStudentFailure = () => ({
    type: "DELETE_STUDENT_FAILURE",
  });
  