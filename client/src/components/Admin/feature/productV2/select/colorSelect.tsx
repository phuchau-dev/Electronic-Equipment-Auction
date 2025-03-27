import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { StylesConfig, SingleValue } from "react-select";
import { AppDispatch, RootState } from "src/redux/store";
import { getAllOperatingSystemThunk } from "src/redux/product/attributes/Thunk";
import { OperatingSystem } from "src/services/product_v2/types/attributes/getAllOperatingSystem";

const osStyles: StylesConfig<OperatingSystem, false> = {
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
      backgroundColor: !isDisabled ? (isSelected ? "#d3d3d3" : "#e0e0e0") : undefined,
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

interface OsSelectProps {
  onChange: (selectedOption: SingleValue<OperatingSystem>) => void;
  value: SingleValue<OperatingSystem> | null;
  className?: string;
}

const OsSelect: React.FC<OsSelectProps> = ({ onChange, value, className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { operatingSystems, isLoading } = useSelector((state: RootState) => state.getAttributes.getAllOperatingSystem);

  useEffect(() => {
    dispatch(getAllOperatingSystemThunk());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const osOptions = operatingSystems.map((os: OperatingSystem) => ({
    ...os,
    _id: os._id,
    name: os.name,
  }));

  return (
    <Select
      classNamePrefix="react-select"
      closeMenuOnSelect
      isMulti={false}
      options={osOptions}
      styles={osStyles}
      value={value}
      onChange={onChange}
      className={className}
      isClearable={true}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option._id}
    />
  );
};

export default OsSelect;
