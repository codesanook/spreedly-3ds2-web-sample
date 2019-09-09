import React, { useEffect } from 'react';

import Loader from './Loader';
import BackendInteractions from '../BackendInteractions';

const Spreedly = window.Spreedly;
const SIZES = { '01': 'one', '02': 'two', '03': 'three', '04': 'four', '05': 'five' };

const spreedlyStatusUpdates = (event, transaction, setTransaction) => {
  console.dir(event);

  if (event.action === 'trigger-completion') {
    // When making the authenticated Spreedly completion call for the transaction
    // the data flows as follows:
    //
    // Request
    // app frontend => app backend => Spreedly authenticated complete.
    // 
    // Response 
    // Spreedly authenticated complete => app backend => app frontend.
    //
    // You'll need to make sure that you update your application state accordingly.
    // an example of the completion call to this backend => Spreedly can be found here:
    // backend/app/controllers/transactions_controller.rb in the complete method.
    //
    // The frontend data in this application gets updated with setTransaction to reduce logic.
    // in your application, you'll need to handle errors and succeeded transaction states as well
    // as the challenge required_action from the completion response.
    BackendInteractions.makeCompletion(event.context.token, setTransaction, (data) => {
      console.log("completion", data)

      if (data.state === 'pending' && data.required_action === 'challenge') {
        document.getElementById('challenge-iframe-window').classList.remove('hidden');
        event.finalize(data);
      }
    });
  } else if (event.action === 'succeeded') {
      // Move users to completed transaction page
      document.getElementById('challenge-iframe-window').classList.add('hidden');
      Spreedly.removeHandlers();
      BackendInteractions.getTransaction(transaction.token, setTransaction);
  } else if (event.action === 'error') {
      // Present users with error
      document.getElementById('challenge-iframe-window').classList.add('hidden');
      BackendInteractions.getTransaction(transaction.token, setTransaction);
      Spreedly.removeHandlers();
  }
};

const SpreedlyLifecycle = ({ transaction, setTransaction, browserSize }) => {
  useEffect(() => {
    let lifecycle = new Spreedly.ThreeDS.Lifecycle({
      hiddenIframeLocation: 'hidden-iframe',
      challengeIframeLocation: 'challenge-iframe',
      transactionToken: transaction.token,
      challengeIframeClasses: SIZES[browserSize]
    });

    Spreedly.on('3ds:status', (event) => spreedlyStatusUpdates(event, transaction, setTransaction));

    lifecycle.start(transaction);
  }, []);

  return <div className="mb-8"><Loader message="Polling for status updates from the issuer..." /></div>;
};

export default SpreedlyLifecycle;
