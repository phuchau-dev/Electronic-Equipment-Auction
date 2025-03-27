import { combineReducers } from "@reduxjs/toolkit";
import {
  listCateNavSlice,
} from "src/redux/clientcate/client/Sclice";
const productsReducer = combineReducers({
  listCateNav: listCateNavSlice,

});

export default productsReducer;
