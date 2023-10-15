import React, { useState } from "react";
import GetApi from "../GetApi/GetApi";
const LanguageZone = () => {
  const [global, setGlobal] = useState({});
  const handleGlobal = (apidata) => {
    setGlobal(apidata.data);
  };
  console.log(global);
  return (
    <section>
      <GetApi
        api="https://secom.privateyebd.com/api/v1/utility/admin/globalsettings"
        onDataFetched={handleGlobal}
      />
      <div>
        <div className="global-language mt-5">
          <div className="global-language-content card">
            <h3 className="fs-5">Language & Currencies Settings</h3>
            <form>
              <div className="global-language-lang mb-3">
                <label className="mb-2">Language</label>
                <input type="text " className="w-100 px=3 py-2 rounded" />
              </div>
              <div className="global-language-currency">
                <label className="mb-2">Currency</label>
                <input type="text " className="w-100 px=3 py-2 rounded" />
              </div>
              <button className="px-3 py-2 rounded w-100 my-4">
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
