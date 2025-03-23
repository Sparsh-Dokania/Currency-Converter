import { useState } from 'react';
import InputBox from './components/InputBox';
import './App.css';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Currency Converter</h1>
      </header>
      <main className="main">
        <form onSubmit={(e) => {
          e.preventDefault();
          convert();
        }}>
          <div className="input-group">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>
          <div className="swap-button">
            <button
              type="button"
              onClick={swap}
              className="btn swap-btn"
            >
              Swap
            </button>
          </div>
          <div className="input-group">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>
          <button type="submit" className="btn w-full convert-btn">
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;