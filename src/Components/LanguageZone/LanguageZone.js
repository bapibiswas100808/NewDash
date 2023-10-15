import React, { useState } from "react";
import GetApi from "../GetApi/GetApi";
import "./LanguageZone.css";

const LanguageZone = () => {
  const [currency, setCurrency] = useState([]);
  const [country, setCountry] = useState([]);
  const handleCurrency = (apidata) => {
    setCurrency(apidata.data);
  };
  const handleCountry = (apidata) => {
    setCountry(apidata.data.results);
  };
  console.log(country);
  return (
    <section className="language-area">
      <GetApi
        api="https://secom.privateyebd.com/api/v1/utility/admin/currency/"
        onDataFetched={handleCurrency}
      />
      <GetApi
        api="https://secom.privateyebd.com/api/v1/auth/country/"
        onDataFetched={handleCountry}
      />
      <div>
        <div className="global-language mt-5">
          <div className="global-language-content card">
            <h3 className="fs-5">Language & Currencies Settings</h3>
            <form>
              <div className="global-language-lang mb-3">
                <label className="mb-2">Language</label>
                <select className="w-100 form-select">
                  {country &&
                    country.map((d, id) => <option key={id}>{d.name}</option>)}
                </select>
              </div>
              <div className="global-language-currency">
                <label className="mb-2">Currency</label>
                <select className="w-100 form-select">
                  {currency &&
                    currency.map((d, id) => (
                      <option key={id}>{d.currency_name}</option>
                    ))}
                </select>
              </div>
              <button disabled className="px-3 py-2 rounded w-100 my-4">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageZone;
