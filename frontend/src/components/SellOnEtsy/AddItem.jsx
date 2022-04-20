import React, { useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import { storage_bucket } from "../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as constants from "../../config/constants";

function AddItem(props) {
  // const [newItem, setNewItem] = useState({});
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [description, setDescriptoin] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [quantity, setQantity] = useState();
  const [newCategory, setNewCategory] = useState();
  // const [shopName, setShopName] = useState();
  console.log("shop name from parent component is : " + props.name);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleNameChange = (e) => {
    if (e.target.value) {
      setName(e.target.value);
    }
  };
  const handleDescriptionChange = (e) => {
    if (e.target.value) {
      setDescriptoin(e.target.value);
    }
  };
  const handlePriceChange = (e) => {
    if (e.target.value) {
      setPrice(e.target.value);
    }
  };
  const handleQuantityChange = (e) => {
    if (e.target.value) {
      setQantity(e.target.value);
    }
  };
  const handleCategoryChange = (e) => {
    if (e.target.value) {
      setCategory(e.target.value);
    }
  };
  const handleAddCategoryChange = (e) => {
    if (e.target.value) {
      setNewCategory(e.target.value);
    }
  };
  const handleAddCategory = (e) => {
    alert("New category added")
    if (e.target.value) {
      setNewCategory(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    if (image != null) {
      console.log("image object is : " + image);
      const storageRef = ref(storage_bucket, image.name);
      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, image)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          console.log("Download URL", downloadURL);
          setImage(downloadURL);
          const newItem = {
            name: name,
            description: description,
            price: price,
            shop_name: props.name,
            category: category,
            quantity: quantity,
            image: downloadURL,
          };
          //code to add user object
          axios.defaults.withCredentials = true;
          axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

          axios
            .post("/shop/addItem", newItem)
            .then((response) => {
              console.log("Status Code : ", response.status);
              if (
                response.status === 200 &&
                response.data === constants.ITEM_ADDED_SUCCESSFULLY
              ) {
                alert("Item added succussesfully.");
                props.closeModal(false);
              }
            });
        });
    }
  };

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
            props.closeModal(false);
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Please enter the details for New Item</h4>
          <h6>Upload Item Photo</h6>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className="col-lg-3 control-label">
                Name of the item:
              </label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  placeholder="name"
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label">Description:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Description"
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label">Price:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Price"
                  onChange={handlePriceChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label">
                Quantity available:
              </label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Quantity"
                  onChange={handleQuantityChange}
                />
              </div>
            </div>
            <br />
            <div className="form-group">
              <label className="col-lg-3 control-label">
                Add New Category
              </label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  placeholder="New Category"
                  onChange={handleAddCategoryChange}
                />
                <button
              className="btn btn-primary"
              type="button"
              onClick={handleAddCategory}
            >
              Add Category
            </button>
            <br />
            <br />


              </div>
            </div>
            <div className="form-group" onChange={handleCategoryChange}>
              <label className="col-lg-3 control-label">
                Product Category:
              </label>
              <div className="col-lg-8">
              <div className="container pt-1">
                      <select
                        className="custom-select"
                        onChange={handleCategoryChange}
                      >
                        <option value="Clothing">Clothing</option>
                        <option value="Jewellery">Jewellery</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Home Decor">Home Decor</option>
                        <option value="Art">Art</option>
                        {newCategory && <option value={newCategory}>{newCategory}</option>}
                      </select>
                    </div>

                {/* <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Furniture
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Clothing</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Food</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
              </div>
            </div>

            <br />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSubmit}
            >
              Add Item
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.closeModal(false);
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
