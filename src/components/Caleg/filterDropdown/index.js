import React from "react";
import Select from "react-select";
import "./filterDropdown.css"

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    borderColor: '#9e9e9e',
    minHeight: '30px',
    height: '30px',
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '25px',
    padding: '0 0',
    width: '150px',
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '25px',
  }),
  
};

const FilterDropdown = ({ options, selectedOption, onOptionSelect }) => {
  return (
    <>
    <div className="filter-dropdown">
    <Select
      options={[{ label: "All", value: "" }, ...options.map((option) => ({ label: option, value: option }))]}
      value={{ label: selectedOption, value: selectedOption }}
      onChange={(option) => onOptionSelect(option.value)}
      styles={selectStyles}
    />
    </div>
    </>
  );
};

export default FilterDropdown;