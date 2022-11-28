import StudentReducer from "./StudentReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  students: [],
  isFetching: false,
  error: false,
};

export const StudentContext = createContext(INITIAL_STATE);

export const StudentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StudentReducer, INITIAL_STATE);

  return (
    <StudentContext.Provider
      value={{
        students: state.students,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
