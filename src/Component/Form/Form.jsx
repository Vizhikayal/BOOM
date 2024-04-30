import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction, updateAction } from "../Action";
import Vector from "../../assets/image/Vector.svg";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Form/Form.scss";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isUpdate, isView, user } = location.state || {};

  useEffect(() => {
    if (isUpdate || isView) {
      setFormData(user);
    }
  }, [isUpdate, isView, user]);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhonenumber: "",
    firstName: "",
    lastName: "",
    alternatePhonenumber: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    image: "",
  });

  const handleChange = (e, fieldName) => {
    if (!isView) {
      const value = e.target.value || "";
      const updatedFormData = { ...formData, [fieldName]: value };
      setFormData(updatedFormData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUpdate) {
      dispatch(updateAction(formData))
        .then(() => {
          navigate("/table");
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } else {
      dispatch(loginAction(formData))
        .then(() => {
          setFormData({});
          navigate("/");
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
    }
  };

  const handleNavigation = (e) => {
    e.preventDefault();
    navigate("/table");
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="header-body ">
          <div className="Addcoustomer">
            {!isUpdate && !isView && (
              <>
                <div>Coustomer</div>
                <img src={Vector} alt="Vector"></img>
                <div>Add Customer</div>
              </>
            )}
          </div>

          {isView && (
            <>
              <div className="Addcoustomer">
                <div>Coustomer</div>
                <img src={Vector} alt="Vector"></img>
                <div>OverView of {formData.customerName}</div>
              </div>
              <div className="Detail mt-3">
                <h4>General Details</h4>
              </div>
              <div
                className="profile-display d-flex bg-light"
                style={{ width: 1322, gap: "30px" }}
              >
                <img
                  src={formData.image}
                  alt="profile"
                  width={65}
                  height={65}
                />
                <div className="customer-detail ">
                  <h3>{formData.customerName}</h3>
                  <p>Customer ID: {formData.id}</p>
                </div>
              </div>
            </>
          )}
          <div className="container bg-light mr-3">
            <div className=" p-3 ">
              <h2>Basic details</h2>
            </div>
            <div className="container-one text-left">
              <div className="row ">
                <div className="col">
                  <div className="menus">
                    <label>
                      <div>Customer Name</div>
                      <input
                        type="text"
                        placeholder="Enter"
                        value={formData.customerName}
                        onChange={(e) => handleChange(e, "customerName")}
                        disabled={isView}
                      />
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="menus">
                    <label>
                      <div>Customer Phone Number</div>
                      <input
                        type="text"
                        placeholder="Enter"
                        value={formData.customerPhonenumber}
                        onChange={(e) =>
                          handleChange(e, "customerPhonenumber")
                        }
                        disabled={isView}
                      />
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="menus">
                    <label>
                      <div>Customer Email</div>
                      <input
                        type="email"
                        placeholder="Enter"
                        value={formData.customerEmail}
                        onChange={(e) => handleChange(e, "customerEmail")}
                        disabled={isView}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-one bg-light mt-5  container">
            <div className="Add-menu">
              <div className=" p-3">
                <h2>Address details</h2>
              </div>
              <div className="menu">
                <div className="row g-2">
                  <div className="col-4">
                    <div className="p-3  ">
                      <div className="Addmenus">
                        <label>
                          <div>First Name</div>
                          <input
                            type="text"
                            placeholder="Enter"
                            value={formData.firstName}
                            onChange={(e) => handleChange(e, "firstName")}
                            disabled={isView}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3  ">
                      <div className="Addmenus">
                        <label>
                          <div>Last Name</div>
                          <input
                            type="text"
                            placeholder="Enter"
                            value={formData.lastName}
                            onChange={(e) => handleChange(e, "lastName")}
                            disabled={isView}
                          />
                        </label>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3  ">
                      {" "}
                      <div className="Addmenus">
                        <label>
                          <div>Alternate phone Number</div>
                          <input
                            type="text"
                            placeholder="Enter"
                            value={formData.alternatePhonenumber}
                            onChange={(e) =>
                              handleChange(e, "alternatePhonenumber")
                            }
                            disabled={isView}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-4">
                    <div className="p-3  ">
                      <div className="Addmenus">
                        <label>
                          <div>Address Line 1</div>
                          <input
                            type="text"
                            placeholder="Enter"
                            value={formData.addressLine1}
                            onChange={(e) => handleChange(e, "addressLine1")}
                            disabled={isView}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3  ">
                      <div className="Addmenus">
                        <label>
                          <div>Address Line 2</div>
                          <input
                            type="text"
                            placeholder="Enter"
                            value={formData.addressLine2}
                            onChange={(e) => handleChange(e, "addressLine2")}
                            disabled={isView}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3  ">
                      <div className="Addmenus">
                        <label>
                          <div>Country</div>
                          <select className="select"
                            id="countrySelect"
                            value={formData.country}
                            onChange={(e) => handleChange(e, "country")}
                            disabled={isView}
                          >
                            <option value="" disabled>Select Country</option>
                            <option value="USA">United States</option>
                            <option value="India">India</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-4">
                    <div className="p-3  ">
                      <div className="Addmenus">
                        <label>
                          <div>State</div>
                          <select className="select"
                            id="stateSelect"
                            value={formData.state}
                            onChange={(e) => handleChange(e, "state")}
                            disabled={isView}
                          >
                            <option value="" disabled>Select State</option>
                            <option value="TamilNadu">TamilNadu</option>
                            <option value="Texas">Texas</option>
                            <option value="New York">New York</option>
                            <option value="Florida">Florida</option>
                            <option value="Illinois">Illinois</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 ">
                      <div className="Addmenus">
                        <label>
                          <div>city</div>
                          <input
                            type="text"
                            placeholder="Enter"
                            value={formData.city}
                            onChange={(e) => handleChange(e, "city")}
                            disabled={isView}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3  ">
                      <div className="Addmenus">
                        <label>
                          <div>Pincode</div>
                          <input
                            type="text"
                            placeholder="Enter"
                            value={formData.pincode}
                            onChange={(e) => handleChange(e, "pincode")}
                            disabled={isView}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="footer-last"> */}
          {/* <div className="head-wrapper"> */}
            {/* </div> */}
        {/* </div> */}
      </Form>
           <div className="side">
           <div
              className=" footer d-flex justify-content-end "
              style={{ gap: 20, padding: 20 }}
            >
              <button className="Goto" onClick={handleNavigation}>
                Go Back
              </button>
              <button type="submit" className="Submit" onClick={handleSubmit}disabled={isView}>
                {isUpdate ? "Update" : "Save"}
              </button>
            </div>
           </div>
    </>
  );
}

export default Layout;
