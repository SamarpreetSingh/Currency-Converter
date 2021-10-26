import React from "react";
import "./CurrencyRow.css";

const CurrencyRow = (props) => {
  const { options, selectedCurrency, changeHandler, inputval, valueHandler } = props;


  const selectHandler = (e) => {
    changeHandler(e.target.value);
  };

  const inputHandler = (e) => {
    valueHandler(e.target.value);
  };

  return (
    <div className="crow">
      <input
        type="number"
        className="input"
        value={inputval}
        onChange={inputHandler}
      ></input>
      <select value={selectedCurrency} onChange={selectHandler}>
        {options.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default CurrencyRow;
