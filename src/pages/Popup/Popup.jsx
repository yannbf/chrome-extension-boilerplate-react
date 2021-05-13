import React from 'react';
import logo from '../../assets/img/logo.svg';
import { FETCH_DATA } from '../../constants';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  const [data, setData] = React.useState();
  const fetchData = () => {
    chrome.runtime.sendMessage({ type: FETCH_DATA }, (response) => {
      // use the response here
      console.log('response is', response);

      setData(response);
    });
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup.js</code> and save to try.
        </p>
        <div>Data is: {JSON.stringify(data)}</div>
        <button onClick={fetchData}>Fetch some data for me!</button>
      </header>
    </div>
  );
};

export default Popup;
