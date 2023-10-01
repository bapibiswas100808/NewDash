import React from "react";
import "./ViewBrand.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const ViewBrand = () => {
  const [viewBrand, setViewBrand] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = `Token ${localStorage.getItem("getToken")}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://secom.privateyebd.com/api/v1/inventory/admin/brands/${id}/`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(response.data);
        setViewBrand(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [accessToken, id]);
  const handleBrandViewUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.brandName.value;
    const is_active = viewBrand.is_active;
    const image = viewBrand.image;
    const brandForm = {
      name,
      is_active,
      image,
    };
    try {
      const response = await axios.put(
        `https://secom.privateyebd.com/api/v1/inventory/admin/brands/${id}/`,
        brandForm,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log(response);
      navigate("/brands");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="view-brand-area project-container">
        <h2 className=""> View Brand</h2>
        <div className="view-brand-content card">
          <div className="view-brand-image">
            <img src={viewBrand?.image_url} alt="" />
          </div>
          <form onSubmit={handleBrandViewUpdate}>
            <div className="view-brand-name my-4">
              <input
                className="px-3 py-2 w-100 rounded"
                type="text"
                defaultValue={viewBrand?.name}
                name="brandName"
              />
            </div>
            <button type="submit" className="w-100 px-3 py-2 mb-4 rounded">
              Update Brand
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ViewBrand;
