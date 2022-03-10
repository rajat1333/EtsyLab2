import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";

function AddItem({ closeModal }) {
  const [newItem, setNewItem] = useState({});

  return (
    <div>
      <Modal
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => {
            closeModal(false);
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Please enter the details for New Item</h4>
          <h6>Upload Item Photo</h6>
          <input type="file" className="form-control" />
          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className="col-lg-3 control-label">Name of the item:</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" value="dey-dey" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label">Description:</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" value="bootdey" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label">Price:</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" value="bootdey" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label">Quantity available:</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" value="bootdey" />
              </div>
            </div>
            <br />
            <div className="form-group">
              <label className="col-lg-3 control-label">Product Category:</label>
              <div className="col-lg-8">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    USD
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <br />
            <button className="btn btn-primary" type="button">
              Save changes
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              closeModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddItem;
