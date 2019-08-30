import React, { useState } from 'react';

import BackendInteractions from '../BackendInteractions'

import Button from './Button';
import Input from './Input';
import Select from './Select';

const CheckoutForm = ({ browserInfo, setTransaction }) => {
  const [fullName, setFullName] = useState("Jane Doe");
  const [address, setAddress] = useState("733 Foster Street, Suite 100.");
  const [city, setCity] = useState("Durham");
  const [state, setState] = useState("NC");
  const [zip, setZip] = useState("27701");
  const [country, setCountry] = useState("USA");
  const [month, setMonth] = useState("10");
  const [year, setYear] = useState("2029");
  const [creditCardNumber, setCreditCardNumber] = useState("4556761029983886");
  const [cvv, setCvv] = useState("123");
  const [amount, setAmount] = useState("3001");
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [threeDsVersion, setThreeDsVersion] = useState("2");

  return (
    <div>
      <form className="bg-white mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Input name={"fullName"} value={fullName} setValue={setFullName} label="Full Name" placeholder="Jane Smith" />

        <hr className="my-4" />

        <Input name={"address"} value={address} setValue={setAddress} label="Address" placeholder="733 Foster Street, Suite 100." />

        <div className="flex flex-wrap">
          <Input name={"city"} value={city} setValue={setCity} label="City" placeholder="Durham" />
          <Input name={"state"} value={state} setValue={setState} label="State" placeholder="NC" />
          <Input name={"zip"} value={zip} setValue={setZip} label="Zip Code (subdivision)" placeholder="27701" />
          <Input name={"country"} value={country} setValue={setCountry} label="Country" placeholder="USA" />
        </div>

        <hr className="my-4" />

        <div className="flex flex-wrap">
          <Input name={"creditCardNumber"} value={creditCardNumber} setValue={setCreditCardNumber} label="Credit Card Number" placeholder="4111111111111111" />
          <Input name={"cvv"} value={cvv} setValue={setCvv} label="CVV" placeholder="123" />
          <Input name={"month"} value={month} setValue={setMonth} label="Month" placeholder="10" />
          <Input name={"year"} value={year} setValue={setYear} label="Year" placeholder="2020" />
        </div>

        <hr className="my-4" />

        <div className="flex flex-wrap">
          <Select
            value={amount}
            setValue={setAmount}
            options={[
              { value: "3001", label: "3001: Full frictionless flow" },
              { value: "3002", label: "3002: Fallback from 3DS 2 to 3DS 1" },
              { value: "3003", label: "3003: Secure device fingerprint flow with direct authorize" },
              { value: "3103", label: "3103: Secure device fingerprint flow with forced failure" },
              { value: "3004", label: "3004: Secure device fingerprint flow to challenge" },
              { value: "3104", label: "3104: Secure challenge flow with forced failure" },
            ]}
            label="Amount"
          />
          <Input name={"currency"} value={currencyCode} setValue={setCurrencyCode} label="Currency" placeholder="USD" />
        </div>

        <hr className="my-4" />

        <div className="flex flex-wrap">
          <Input name={"threeDsVersion"} value={threeDsVersion} setValue={setThreeDsVersion} label="3D Secure Version" placeholder="1, 2 or blank" />
        </div>

        <div className="mt-6 mx-2">
          <Button text="Purchase" onClick={() => {
            BackendInteractions.makePurchase({
              amount: amount,
              credit_card: {
                number: creditCardNumber,
                full_name: fullName,
                verification_value: cvv,
                month: month,
                year: year
              },
              attempt_3dsecure: true,
              three_ds_version: threeDsVersion,
              browser_info: browserInfo
            }, setTransaction)
          }} />
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;