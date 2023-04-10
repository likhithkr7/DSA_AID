import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  categoryListReducer,
  categoryDetailsReducer,
  categoryAddReducer,
  subcategoryAddReducer,
  editProblemReducer,
  categoryDeleteReducer,
  subcategoryDeleteReducer,
  problemAddReducer,
  problemDeleteReducer,
  editNoteReducer,
} from "./reducers/categoryReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  categoryAdd: categoryAddReducer,
  subCategoryAdd: subcategoryAddReducer,
  editProblem: editProblemReducer,
  categoryDelete: categoryDeleteReducer,
  subcategoryDelete: subcategoryDeleteReducer,
  problemAdd: problemAddReducer,
  problemDelete: problemDeleteReducer,
  editNote: editNoteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
