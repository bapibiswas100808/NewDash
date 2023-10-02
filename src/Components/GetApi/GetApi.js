import axios from "axios";
import React, { useEffect } from "react";

const GetApi = ({ api, onDataFetched }) => {
  useEffect(() => {
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(api, {
          headers: {
            Authorization: accessToken,
          },
        });
        console.log(response.data);
        if (onDataFetched) onDataFetched(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return <></>;
};

export default GetApi;
