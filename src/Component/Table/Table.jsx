import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import View from "../../assets/image/View.svg";
import Edit from "../../assets/image/Edit.svg";
import Trash from "../../assets/image/Trash.svg";
import add from "../../assets/image/add.svg";
import { getAction, deleteAction } from "../Action";
import "../Table/Table.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Close from "../../assets/image/Close.svg";
import search from '../../assets/image/search.svg';
import Forward from '../../assets/image/Forward.svg';
import Backward from '../../assets/image/Backward.svg';
import first from '../../assets/image/first.svg';
import last from '../../assets/image/last.svg';

function Tablecontent() {
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const users = useSelector((state) => state.login.userData);

  useEffect(() => {
    dispatch(getAction());
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onDelete = (id) => {
    if (id) {
      setDeleteUserId(id);
      setShowPopup(true);
    } else {
      console.error("User ID is undefined");
    }
  };

  const handleConfirm = () => {
    if (deleteUserId) {
      dispatch(deleteAction(deleteUserId))
        .then(() => {
          setShowPopup(false);
          dispatch(getAction());
        })
        .catch((error) => {
          console.error("Error deleting user: ", error);
          setShowPopup(false);
        });
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleUpdate = (id) => {
    const updatedUser = users.find((user) => user.id === id);
    navigate("/form", { state: { user: updatedUser, isUpdate: true } });
  };

  const handleView = (id) => {
    const viewUser = users.find((user) => user.id === id);
    navigate("/form", { state: { user: viewUser, isView: true } });
  };

  const handleAddClick = () => {
    navigate("/form");
  };

 
  if (!Array.isArray(users)) {
    console.error("Users data is not an array");
    return null; 
  }

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

 
  const adjustedItemsPerPage = currentItems.length < 10 ? 10 : itemsPerPage;
  const adjustedIndexOfLastItem = currentPage * adjustedItemsPerPage;
  const adjustedIndexOfFirstItem = adjustedIndexOfLastItem - adjustedItemsPerPage;
  const adjustedCurrentItems = users.slice(adjustedIndexOfFirstItem, adjustedIndexOfLastItem);

 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="layout">
        <div className="text d-flex justify-content-end mt-4"style={{gap:10}}>
          <div className="input">
          <img src={search}/>
          <input 
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Search"
          />
          </div>
          <button className="export" onClick={handleChange}>
            Export CSV
          </button>
        </div>
      </div>
      <div className="label">
        <Table className="Table mt-4  bg-white">
          <Table.Header className="table-secondary rounded-circle">
            <Table.Row>
              <Table.HeaderCell className="">Name</Table.HeaderCell>
              <Table.HeaderCell className="">
                PhoneNumber
              </Table.HeaderCell>
              <Table.HeaderCell className="">Email</Table.HeaderCell>
              <Table.HeaderCell className="">Country</Table.HeaderCell>
              <Table.HeaderCell className="">State</Table.HeaderCell>
              <Table.HeaderCell className="">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="text-center">
          {adjustedCurrentItems.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell className="">{user.customerName}</Table.Cell>
                <Table.Cell className="">
                  {user.customerPhonenumber}
                </Table.Cell>
                <Table.Cell className="">{user.customerEmail}</Table.Cell>
                <Table.Cell className="">{user.country}</Table.Cell>
                <Table.Cell className="">{user.state}</Table.Cell>
                <Table.Cell>
                  <button className="icons" onClick={() => handleView(user.id)}>
                    <img src={View} alt="View" />
                  </button>
                  <button className="icons" onClick={() => handleUpdate(user.id)}>
                    <img src={Edit} alt="Edit" />
                  </button>
                  <button className="icons" onClick={() => onDelete(user.id)}>
                    <img src={Trash} alt="Trash" />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="iconadd  text-end m-4">
        <img
          src={add}
          alt="Plus"
          onClick={handleAddClick}
          style={{ width: 50, height: 50 }}
        />
      </div>
      {showPopup && (
        <div
          className="modal fade show"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="mx-auto m-4">
                <h5 className="modal-title">Delete Record?</h5>
              </div>
              <div className="mx-auto m-3">
                <img src={Close} alt="close" />
              </div>
              <div className="mx-auto m-4" >
                <button type="button" className="Submit m-3" onClick={handleConfirm} >Delete</button>
                <button type="button" className="Goto" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
<div className="pagination">
  <button
    className="primary_btn"
    onClick={() => paginate(1)}
    disabled={currentPage === 1}
  >
    <img src={Backward} alt="Backward" />
  </button>
  <button
    className="primary_btn"
    onClick={() => paginate(currentPage - 1)}
    disabled={currentPage === 1}
  >
    <img src={first} alt="first" />
  </button>
  {Array.from({ length: Math.ceil(users.length / adjustedItemsPerPage) }).map((_, index) => (
    <button
      key={index}
      onClick={() => paginate(index + 1)}
      className={`secondary_button ${currentPage === index + 1 ? "active" : ""}`}
    >
      {index + 1}
    </button>
  ))}
  <button
    className="primary_btn"
    onClick={() => paginate(currentPage + 1)}
    disabled={currentPage === Math.ceil(users.length / adjustedItemsPerPage)}
  >
    <img src={last}/>
  </button>
  <button
    className="primary_btn"
    onClick={() => paginate(Math.ceil(users.length / adjustedItemsPerPage))}
    disabled={currentPage === Math.ceil(users.length / adjustedItemsPerPage)}
  >
    <img src={Forward} alt="Forward" />
  </button>
</div>



    </>
  );
}

export default Tablecontent;
