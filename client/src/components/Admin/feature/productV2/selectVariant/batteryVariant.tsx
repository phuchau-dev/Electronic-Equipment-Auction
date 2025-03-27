import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { StylesConfig, SingleValue } from "react-select";
import { AppDispatch, RootState } from "src/redux/store";
import { getAllBatteryThunk } from "src/redux/product/attributes/Thunk";
import { Battery } from "src/services/product_v2/types/attributes/getAllBattery";

const batteryStyles: StylesConfig<Battery, false> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isDisabled
      ? undefined
      : isSelected
      ? "#d3d3d3"
      : isFocused
      ? "#f0f0f0"
      : undefined,
    color: isDisabled ? "#ccc" : isSelected ? "black" : "black",
    cursor: isDisabled ? "not-allowed" : "default",
    ":active": {
      ...styles[":active"],
      backgroundColor: !isDisabled
        ? isSelected
          ? "#d3d3d3"
          : "#e0e0e0"
        : undefined,
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "black",
  }),
  clearIndicator: (styles) => ({
    ...styles,
    color: "black",
    cursor: "pointer",
  }),
};

interface BatterySelectProps {
  onChange: (selectedOption: SingleValue<Battery>) => void;
  value: SingleValue<Battery> | null;
  className?: string;
}

const BatterySelect: React.FC<BatterySelectProps> = ({ onChange, value, className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { batteries, isLoading } = useSelector((state: RootState) => state.getAttributes.getAllBattery);

  useEffect(() => {
    dispatch(getAllBatteryThunk());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const batteryOptions = batteries.map((battery: Battery) => ({
    ...battery,
    _id: battery._id,
    name: battery.name,
  }));

  return (
    <Select
      classNamePrefix="react-select"
      closeMenuOnSelect
      isMulti={false}
      options={batteryOptions}
      styles={batteryStyles}
      value={value}
      onChange={onChange}
      className={className}
      isClearable={true}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option._id}
    />
  );
};

export default BatterySelect;
