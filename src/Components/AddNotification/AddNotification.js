import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";

const AddNotification = () => {
  const navigate = useNavigate();
  const accessToken = `Token ${localStorage.getItem("getToken")}`;
  const [notificationType, setNotificationType] = useState(0);
  const [notificationRecipient, setNotificationRecipient] = useState([]);
  const [notificationRecipientFromApi, setNotificationRecipientFromApi] =
    useState([]);
  const [isActiveChecked, setIsActiveChecked] = useState(false);
  useEffect(() => {
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    axios
      .get("https://secom.privateyebd.com/api/v1/auth/admin/user/", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((apiData) => {
        setNotificationRecipientFromApi(
          apiData?.data.map((d) => ({ value: d.id, label: d.email }))
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleNotificationType = (e) => {
    e.preventDefault();
    setNotificationType(e.target.value);
  };
  const handleNotificationRecipient = (selectedOptions) => {
    const selectedValues = Array.from(
      selectedOptions,
      (option) => option.value
    );
    setNotificationRecipient(selectedValues);
  };
  const handleActiveCheck = (e) => {
    setIsActiveChecked(e.target.checked);
  };
  const handleAddNotification = (e) => {
    e.preventDefault();
    const form = e.target;
    const notification_type = notificationType;
    const recipient = notificationRecipient;
    const message = form.messeageName.value;
    const is_read = isActiveChecked;
    const notificationForm = {
      notification_type,
      recipient,
      message,
      is_read,
    };
    const notificationApi =
      "https://secom.privateyebd.com/api/v1/notification/admin/notification/";
    axios
      .post(notificationApi, notificationForm, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/notifications");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="add-notification-area">
      <div className="project-container">
        <h2 className="fs-5 my-4">Add Notifications</h2>
        <div className="add-notification-content card">
          <form onSubmit={handleAddNotification}>
            <div className="notification-type mb-3">
              <label className="fs-6 mb-2"> Notification Type</label>
              <select
                onChange={handleNotificationType}
                className="w-100 form-select rounded"
              >
                <option value="0">User</option>
                <option value="1">System</option>
              </select>
            </div>
            <div className="notification-recipient mb-3">
              <label className="fs-6 mb-2">Recipient</label>
              <Select
                onChange={handleNotificationRecipient}
                className="w-100 rounded"
                options={notificationRecipientFromApi}
                isMulti
              ></Select>
            </div>
            <div className="notification-messeage mb-3">
              <label className="fs-6 mb-2">Message</label>
              <textarea
                className="w-100 px-3 py-4 rounded"
                placeholder="Enter your messeage"
                name="messeageName"
              />
            </div>
            <div className="notification-read">
              <label className="fs-6 mb-2 me-5">Is Read?</label>
              <input
                type="checkbox"
                checked={isActiveChecked}
                onChange={handleActiveCheck}
              />
            </div>
            <button className="w-100 rounded px-3 py-2 my-4" type="submit">
              Send Notification
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddNotification;
