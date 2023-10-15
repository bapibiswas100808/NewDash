import React, { useEffect, useRef, useState } from "react";
import "./Website.css";
import GetApi from "../GetApi/GetApi";
import axios from "axios";

const Website = () => {
  const [siteDetail, setSiteDetail] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [imageId, setImageId] = useState();
  const logoRef = useRef(null);

  useEffect(() => {
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const siteForm = new FormData();
    siteForm.append("document", newImage);
    siteForm.append("doc_type", 0);
    const fetchdata = async () => {
      try {
        const response = await axios.post(
          "https://secom.privateyebd.com/api/v1/auth/documents/upload/",
          siteForm,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(response.data);
        setImageId(response.data.id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [newImage]);
  const handleWebSite = (apidata) => {
    setSiteDetail(apidata.data);
  };
  const handleSiteLogo = () => {
    logoRef.current.click();
  };
  const handleNewImage = (e) => {
    const NewImage = e.target.files[0];
    setNewImage(NewImage);
  };
  const handleWebSetting = (e) => {
    e.preventDefault();
  };
  console.log(siteDetail);
  console.log(imageId);
  return (
    <section className="web-setting-area">
      <GetApi
        api="https://secom.privateyebd.com/api/v1/utility/user/websiteinfo/"
        onDataFetched={handleWebSite}
      />
      <div className="project-container">
        <h2 className="my-4 fs-4">website settings</h2>
        <div className="web-settings-content card">
          <form onSubmit={handleWebSetting}>
            <div className="site-logo mb-3">
              <img
                onClick={handleSiteLogo}
                src={
                  newImage
                    ? URL.createObjectURL(newImage)
                    : siteDetail?.logo_url
                }
                alt=""
              />
              <input
                onChange={handleNewImage}
                ref={logoRef}
                hidden
                type="file"
              />
            </div>
            <div className="site-name mb-3">
              <label className="mb-2">Site Name</label>
              <input
                name="siteName"
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                defaultValue={siteDetail.site_name}
              />
            </div>
            <div className="site-url mb-3">
              <label className="mb-2">Website URL</label>
              <input
                name="urlName"
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                defaultValue={siteDetail.website_url}
              />
            </div>
            <div className="site-email mb-3">
              <label className="mb-2">Email</label>
              <input
                name="emailName"
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                defaultValue={siteDetail.email}
              />
            </div>
            <div className="site-mobile mb-3">
              <label className="mb-2">Mobile Nmber</label>
              <input
                name="mobileName"
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                defaultValue={siteDetail.phone}
              />
            </div>
            <div className="site-longitude mb-3">
              <label className="mb-2">Longitude</label>
              <input
                name="longitudeName"
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                defaultValue={siteDetail.longitude}
              />
            </div>
            <div className="site-Latitude mb-3">
              <label className="mb-2">Latitude</label>
              <input
                name="latitudeName"
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                defaultValue={siteDetail.latitude}
              />
            </div>
            <div className="site-address mb-3">
              <label className="mb-2">Address</label>
              <input
                name="adressName"
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                defaultValue={siteDetail.address}
              />
            </div>
            <div className="site-facebook mb-3">
              <label className="mb-2">Facebook</label>
              <input
                name="facebookName"
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                defaultValue={siteDetail.facebook}
              />
            </div>
            <div className="site-twitter mb-3">
              <label className="mb-2">Twitter</label>
              <input
                name="twitterName"
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                defaultValue={siteDetail.twitter}
              />
            </div>
            <div className="site-linkedin mb-3">
              <label className="mb-2">Linkedin</label>
              <input
                name="linkedinName"
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                defaultValue={siteDetail.linkedin}
              />
            </div>
            <div className="site-instagram mb-3">
              <label className="mb-2">Instagram</label>
              <input
                name="instagramName"
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                defaultValue={siteDetail.instagram}
              />
            </div>
            <div className="site-youtube mb-3">
              <label className="mb-2">Youtube</label>
              <input
                name="youtubeName"
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                defaultValue={siteDetail.youtube}
              />
            </div>
            <button disabled type="submit" className="w-100 px-3 py-2 rounded">
              Update Settings
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Website;
