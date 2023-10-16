import CRM from "../../Pages/SubPages/CRM/CRM";
import "./Notification.css";
const Notification = () => {
  return (
    <div className="notification-area">
      <div className="project-container">
        <h2 className="my-4 fs-4">Notification</h2>
        <div className="card">
          <CRM
            pageApi="https://secom.privateyebd.com/api/v1/notification/admin/notification/"
            heading="Notifications"
            pages="Pages"
            pageName="Notifications"
            buttonName5="Add New Notification"
            td1="id"
            td2="Message"
            td3="Is Read?"
            td4="Notification"
            data2="id"
            data3="message"
            data4="is_read"
            data5="notification_type"
            showActiveColumn={true}
            showActiveMenu={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
