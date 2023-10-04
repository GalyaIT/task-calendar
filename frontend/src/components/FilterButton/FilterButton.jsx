import React from "react";
import "./FilterButton.css";

const FilterButton = (props) => {
  return (
    <button
      className={
        props.isPressed === true ? "select-button active" : "select-button"
      }
      type='button'
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </button>
  );
};

export default FilterButton;
