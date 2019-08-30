import React, { useState } from 'react';
import Loader from './Loader';
import Select from './Select';
import Button from './Button';

const Spreedly = window.Spreedly
const SIZES = { '01': 'one', '02': 'two', '03': 'three', '04': 'four', '05': 'five' };

const submitSizeSelection = (browserSize, setBrowserSizeSelected) => {
  const mappedSize = SIZES[browserSize];

  if (mappedSize) {
    document.getElementById('challenge-iframe').classList.add(`${mappedSize}-container`);
    setBrowserSizeSelected(true);
  } else {
    alert('Browser size must be 01, 02, 03, 04, or 05');
  }
}

const SpreedlyBrowserInfoCollection = ({ browserInfo, setBrowserInfo, browserSize, setBrowserSize }) => {
  const [browserSizeSelected, setBrowserSizeSelected] = useState(false);

  let internalBrowserInfo = "";
  if ((browserInfo === null || browserInfo === "")  && browserSizeSelected) {
    internalBrowserInfo = Spreedly.ThreeDS.serialize(
      // 01, 02, 03, 04, 05
      browserSize,
      // Accept Header gathered from your webserver
      "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    );
    setTimeout(() => { setBrowserInfo(internalBrowserInfo); }, 1500);
  }

  if (!browserSizeSelected) {
    return (
      <form className="bg-white mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-lg uppercase text-gray-600 mb-4">Please select a browser size for the challenge window</h3>
          <Select
            value={browserSize}
            setValue={setBrowserSize}
            options={[
              { value: "01", label: "01: 250px x 400px" },
              { value: "02", label: "02: 390px x 300px" },
              { value: "03", label: "03: 500px x 600px" },
              { value: "04", label: "04: 600px x 400px" },
              { value: "05", label: "05: Fullscreen" },
            ]}
            label="Amount"
          />
        <div className="mt-6 mx-2">
          <Button text="Select" onClick={() => submitSizeSelection(browserSize, setBrowserSizeSelected) } />
        </div>
      </form>
    )
  }

  return (
    <div>
      <Loader message="Collecting Browser Info" />
      <div className="mx-auto break-all p-8 text-gray-500 text-xs">
        {internalBrowserInfo}
      </div>
    </div>
  );
};

export default SpreedlyBrowserInfoCollection;
