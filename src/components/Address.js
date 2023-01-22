import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import Navi from "./Navi";

function Address() {
  let params = useParams();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Alt, setAlt] = useState("");
  const [Files, setFiles] = useState("");
  const [Address, setAddress] = useState("");

  let navigate = useNavigate();

  let handleSubmit = async () => {
    let data = {
      Files,
      Name,
      Email,
      Mobile,
      Alt,
      Address,
      orderId: params.id,
    };
    try {
      let request = await axios.post(`${url}/address`, data, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          user: window.localStorage.getItem("UserId"),
        },
      });
      if (request.data.statusCode === 200) {
        navigate(`/${params.id}/order-summary`);
      }
      if (request.data.statusCode === 400) {
        console.log(request.data.message);
        navigate("/login");
      }
      if (request.data.statusCode === 404) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
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
          <h1>Customer Details</h1>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={Name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={Email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="text"
              className="form-control"
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              value={Mobile}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Alternative Mobile Number</label>
            <input
              id="alternative_mobile"
              name="alternative_mobile"
              type="text"
              className="form-control"
              onChange={(e) => {
                setAlt(e.target.value);
              }}
              value={Alt}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Customer Address</label>
            <textarea
              id="Customer_Address"
              name="Customer_Address"
              type="text"
              className="form-control"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={Address}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="name">Any one proof</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => {
                let files = e.target.files;
                let file = files[0];
                const reader = new FileReader();
                reader.addEventListener("load", (event) => {
                  setFiles(event.target.result);
                });
                reader.readAsDataURL(file);
              }}
            />
          </div>

          <div className="form-group">
            <button type="button" onClick={handleSubmit} className="submit-btn">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Address;
