import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { StylesConfig, SingleValue } from "react-select";
import { AppDispatch, RootState } from "src/redux/store";
import { getAllCpuThunk } from "src/redux/product/attributes/Thunk";
import { Cpu } from "src/services/product_v2/types/attributes/getAllCpu";
const cpuStyles: StylesConfig<{ value: string; label: string }, false> = {
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

interface CpuSelectProps {
  onChange: (selectedOption: SingleValue<{ value: string; label: string }>) => void;
  value: SingleValue<{ value: string; label: string }> | null;
  className?: string;
}

const CpuSelect: React.FC<CpuSelectProps> = ({ onChange, value, className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cpus, isLoading } = useSelector(
    (state: RootState) => state.getAttributes.getAllCpu
  );

  useEffect(() => {
    dispatch(getAllCpuThunk());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const cpuOptions = cpus.map((cpu: Cpu) => ({
    value: cpu._id,
    label: cpu.name,
  }));

  return (
    <Select
      classNamePrefix="react-select"
      closeMenuOnSelect
      isMulti={false}
      options={cpuOptions}
      styles={cpuStyles}
      value={value}
      onChange={onChange}
      className={className}
      isClearable={true}
    />
  );
};

export default CpuSelect;
