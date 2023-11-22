import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user";
import subjectReducer from "./slice/subject";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    subject: subjectReducer,
    user: userReducer,
  },
});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
