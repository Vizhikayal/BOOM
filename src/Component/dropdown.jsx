import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

function PhoneNumberList({ onPhoneNumberChange }) {
  const [phone, setPhone] = useState("");

  const handleChange = (value, countryData) => {
    console.log("Value:", value);
    console.log("Country Data:", countryData);

    if (countryData) {
      const { inputValue } = countryData;

      const [dialCode, ...numberParts] = inputValue.split(" ");
      console.log("num", numberParts);
      const number = numberParts.join("").trim();

      setPhone(value);

      var mobile = number.replace(/^\+[0-9]{1,3}(\s|\-)/, "");
      var newdata = mobile.replace(/[^A-Z0-9]+/gi, "");

      const phoneData = {
        country_code: dialCode,
        number: newdata
      };

      console.log("dasdasdsadasdasd", phoneData);

      onPhoneNumberChange(phoneData);
    }
  };
  return (
    <div>
      <PhoneInput defaultCountry="in" value={phone} onChange={handleChange} />
    </div>
  );
}

export default PhoneNumberList;