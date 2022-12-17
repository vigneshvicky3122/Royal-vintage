import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import Navi from "./Navi";

function EditProduct() {
  let [Features, setFeatures] = useState("");
  let [Amount, setAmount] = useState("");
  let [ProductName, setProductName] = useState("");
  let [Image, setImage] = useState("");

  let navigate = useNavigate();
  let params = useParams();
  useEffect(() => {
    getData();
  }, []);

  let handleSubmit = async () => {
    let formData = new FormData();
    formData.append("files", Image);
    formData.append("Features", Features);
    formData.append("ProductName", ProductName);
    formData.append("Amount", Amount);

    try {
      let request = await axios.put(
        `${url}/addProducts/${params.id}`,
        formData,
        {
          headers: {
            authorization: window.localStorage.getItem("app-token"),
            userId: window.localStorage.getItem("UserId"),
          },
        }
      );
      if (request.data.statusCode === 200) {
        window.confirm(request.data.message);
        navigate("/Dashboard");
      }
      if (request.data.statusCode === 400) {
        window.confirm(request.data.message);
        navigate("/login");
      }
      if (request.data.statusCode > 400) {
        window.alert(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let getData = async () => {
    try {
      let request = await axios.get(`${url}/product/${params.id}`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          user: window.localStorage.getItem("UserId"),
        },
      });
      if (request.data.statusCode === 200) {
        setProductName(request.data.products[0].ProductName);
        setAmount(request.data.products[0].Amount);
        setFeatures(request.data.products[0].Features);
      }

      if (request.data.statusCode === 400) {
        window.alert(request.data.message);
        navigate("/login");
      }
      if (request.data.statusCode > 400) {
        window.alert(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navi />
      <div className="form">
        <div className="login-form">
          <br />
          <h1>ADD to PRODUCT</h1>
          <br />
          <div className="form-group">
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              onChange={(e) => setProductName(e.target.value)}
              value={ProductName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Amount</label>
            <input
              id="amount"
              name="amount"
              type="amount"
              className="form-control"
              onChange={(e) => setAmount(e.target.value)}
              value={Amount}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Features</label>
            <textarea
              id="features"
              name="features"
              type="text"
              className="form-control"
              onChange={(e) => setFeatures(e.target.value)}
              value={Features}
            ></textarea>
          </div>
          <div className="form-group">
            <button type="button" onClick={handleSubmit} className="submit-btn">
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
