import React, { useEffect, useState } from 'react';

import BackendInteractions from './BackendInteractions';

import Header from './Webapp/Header';
import CheckoutForm from './Webapp/CheckoutForm';
import Transaction from './Webapp/Transaction';
import Loader from './Webapp/Loader';

import SpreedlyBrowserInfoCollection from './Webapp/SpreedlyBrowserInfoCollection';
import SpreedlyLifecycle from './Webapp/SpreedlyLifecycle';

const COLLECT_BROWSER_INFO = 1;
const COLLECT_USER_INFORMATION = 2;
const SUBMIT_TRANSACTION_TO_BACKEND = 3;
const HANDLE_LIFECYCLE_EVENTS = 4;
const FINISHED = 5;

function renderContentArea(browserInfo, setBrowserInfo, transaction, setTransaction, browserSize, setBrowserSize, step) {
  if (step === COLLECT_BROWSER_INFO) {
    return <SpreedlyBrowserInfoCollection browserInfo={browserInfo} setBrowserInfo={setBrowserInfo} browserSize={browserSize}  setBrowserSize={setBrowserSize} />
  } else if (step === COLLECT_USER_INFORMATION) {
    return <CheckoutForm browserInfo={browserInfo} setTransaction={setTransaction} />
  } else if (step === SUBMIT_TRANSACTION_TO_BACKEND) {
    return <Loader message="Submitting transaction to backend" />;
  } else if (step === HANDLE_LIFECYCLE_EVENTS) {
    return <SpreedlyLifecycle transaction={transaction} setTransaction={setTransaction} browserSize={browserSize} />;
  } else if (step === FINISHED) {
    const color = transaction.state === 'succeeded' ? 'green' : 'red';
    const icons = transaction.state === 'succeeded' ? '💸💰💵' : '🛑👎🏽💔';
    return (
      <div className={`border border-${color}-500 rounded text-md text-${color}-700 bg-${color}-100 p-2 break-all overflow-y-auto mb-8`}>
        <span role="img" aria-label="purchase icons">{icons}</span> Purchase Complete
      </div>
    );
  }
}

function App() {
  const [browserInfo, setBrowserInfo] = useState("");
  const [transaction, setTransaction] = useState({});
  const [browserSize, setBrowserSize] = useState("03");
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  // eslint-disable-next-line
  useEffect(() => {
    if (token && !transaction.token) {
      BackendInteractions.getTransaction(token, setTransaction);
    }
  });

  let step;
  if  (Object.keys(transaction).length > 0 && !!transaction.token && !!transaction.state && transaction.state !== 'pending') {
    step = FINISHED;
  } else if (Object.keys(transaction).length > 0 && !!transaction.token && transaction.state === 'pending') {
    step = HANDLE_LIFECYCLE_EVENTS;
  } else if (browserInfo === "") {
    step = COLLECT_BROWSER_INFO;
  } else if(Object.keys(transaction).length === 0) {
    step = COLLECT_USER_INFORMATION;
  } else if (Object.keys(transaction).length > 0 && !transaction.token) {
    step = SUBMIT_TRANSACTION_TO_BACKEND;
  }

  return (
    <div className="m-auto max-w-4xl">
      <div>
        <Header currentStep={step} />
        {
          renderContentArea(
            browserInfo,
            setBrowserInfo,
            transaction,
            setTransaction,
            browserSize,
            setBrowserSize,
            step,
          )
        }
        <Transaction transaction={transaction} />
      </div>
    </div>
  );
}

export default App;
