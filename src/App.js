import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";

function App() {
  const [options, setOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("AED");
  const [fromInput, setFromInput] = useState(0);
  const [toInput, setToInput] = useState(0);
  const [data, setData] = useState({});

  const fromHandler = (selected) => {
    setFromCurrency(selected);
  };
  const toHandler = (selected) => {
    setToCurrency(selected);
  };

  const fromValue = (val) => {
    setFromInput(val);
    setToInput((val * data[toCurrency]) / data[fromCurrency]);
  };

  const toValue = (val) => {
    setToInput(val);
    setFromInput((val * data[fromCurrency]) / data[toCurrency]);
  };

  useEffect(() => {
    fetch(
      "http://api.exchangeratesapi.io/v1/latest?access_key=24aa82bf8c057e0514dea51631c958ed"
    )
      .then((res) => res.json())
      .then((body) => {
        setData(body.rates);
        setOptions([...Object.keys(body.rates)]);
        setFromCurrency(body.base);
        setToCurrency(Object.keys(body.rates)[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFromInput((toInput * data[fromCurrency]) / data[toCurrency]);
  }, [fromCurrency]);

  useEffect(() => {
    setToInput((fromInput * data[toCurrency]) / data[fromCurrency]);

  }, [toCurrency]);

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <CurrencyRow
        options={options}
        selectedCurrency={fromCurrency}
        changeHandler={fromHandler}
        inputval={fromInput}
        valueHandler={fromValue}
      />
      <div className="equals">=</div>
      <CurrencyRow
        options={options}
        selectedCurrency={toCurrency}
        changeHandler={toHandler}
        inputval={toInput}
        valueHandler={toValue}
      />
    </div>
  );
}

export default App;
