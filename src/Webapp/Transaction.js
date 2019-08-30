import React from 'react';

function colorForState(state) {
  if (state === 'pending') {
    return 'yellow';
  } else if (state === 'succeeded') {
    return 'green';
  } else if (state === null || typeof state === 'undefined') {
    return 'gray';
  } else {
    return 'red';
  }
}

function label(text, color) {
  return (
    <div className={`text-${color}-700 text-sm pb-2`}>
      {text}
    </div>
  )
}

const Transaction = ({ transaction: { state, raw, required_action} }) => {
  const color = colorForState(state);

  if (!state) {
    return null;
  }

  return (
    <div>
      <span className="text-gray-700 uppercase font-bold">Transaction Details</span>
      <div className={`border rounded border-${color}-500 p-4 bg-${color}-100`}>

        {label(`State: ${state}`, color)}
        {label(`Required Action: ${!!required_action ? required_action : 'none'}`, color)}
        {raw && (
          <React.Fragment>
            {label('Raw Response', color)}
            <div className="border border-gray-500 rounded text-xs text-gray-700 bg-gray-300 p-2 break-all overflow-y-auto">
              {raw}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Transaction;