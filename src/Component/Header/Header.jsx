import React from "react";
import notifications from "../../assets/image/notifications.svg";
import Avatar from "../../assets/image/Avatar.svg";
import "../Header/style.scss";

function Header() {
  return (
    <>
      <div className="side">
      <div
        className=" Header d-flex justify-content-between p-2 bg-white"
        style={{height:60}}
      >
        
      <div><h2>Customer</h2></div>  
        <div
          className="icon d-flex justify-content-end mt-1"
          style={{ width: 40, height: 40, gap: 10 }}
        >
          <img src={notifications} />
          <img src={Avatar} />
        </div>
      </div>
      </div>
    </>
  );
}
export default Header;
