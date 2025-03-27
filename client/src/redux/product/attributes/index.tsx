import { combineReducers } from "@reduxjs/toolkit";
import {
  getAllRamSlice,
  getAllBatterySlice,
  getAllColorSlice,
  getAllCpuSlice,
  getAllGraphicsCardSlice,
  getAllOperatingSystemSlice,
  getAllScreenSlice,
  getAllStorageSlice
} from "src/redux/product/attributes/Slicle";
const getAttributesReducer = combineReducers({
  getAllRam: getAllRamSlice,
  getAllBattery:getAllBatterySlice,
  getAllColor:getAllColorSlice,
  getAllCpu:getAllCpuSlice,
  getAllGraphicsCard:getAllGraphicsCardSlice,
  getAllOperatingSystem:getAllOperatingSystemSlice,
  getAllScreen:getAllScreenSlice,
  getAllStorage:getAllStorageSlice
});

export default getAttributesReducer;
