const UserReducer = (state, action) => {
    switch (action.type) {
      case "GET_STUDENTS_START":
        return {
          students: [],
          isFetching: true,
          error: false,
        };
      case "GET_STUDENTS_SUCCESS":
        return {
          students: action.payload,
          isFetching: false,
          error: false,
        };
      case "GET_STUDENTS_FAILURE":
        return {
          students: [],
          isFetching: false,
          error: true,
        };
      case "CREATE_STUDENT_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "CREATE_STUDENT_SUCCESS":
        return {
          students: [...state.students, action.payload],
          isFetching: false,
          error: false,
        };
      case "CREATE_STUDENT_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      case "UPLOAD_STUDENT_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "UPLOAD_STUDENT_SUCCESS":
        return {
          students: state.students.map(
            (student) => student._id === action.payload._id && action.payload
          ),
          isFetching: false,
          error: false,
        };
      case "UPLOAD_STUDENT_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      case "DELETE_STUDENT_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "DELETE_STUDENT_SUCCESS":
        return {
          students: state.students.filter((student) => student._id !== action.payload),
          isFetching: false,
          error: false,
        };
      case "DELETE_STUDENT_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      default:
        return { ...state };
    }
  };
  
  export default UserReducer;
  