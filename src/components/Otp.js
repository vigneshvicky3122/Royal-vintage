import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function Otp() {
  let navigate = useNavigate();
  let params = useParams();
  const [Messages, setMessages] = useState([]);
  const [ActiveResponse, setActiveResponse] = useState(false);
  const [isColor, setColor] = useState("red");

  let handleSubmit = async (data) => {
    try {
      let request = await axios.post(`${url}/reset-otp-verify`, {
        data,
        user: params.id,
      });
      setMessages(request.data.message);
      setActiveResponse(true);
      if (request.data.statusCode === 200) {
        setColor("green");
        setTimeout(() => {
          navigate(`/password-reset/${request.data.userId}`);
        }, "3000");
      }
      if (request.data.statusCode === 401) {
        setTimeout(() => {
          navigate("/verify-email");
        }, "3000");
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: yup.object({
      otp: yup
        .number()
        .test(
          "maxDigits",
          "number field must have exactly 6 digits",
          (number) => String(number).length === 6
        )
        .required("* Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <>
      <div className="form">
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <br />
          <h1>Verify Otp</h1>
          <br />
          <div className="form-group">
            <label htmlFor="name">One Time Password</label>
            <input
              id="otp"
              name="otp"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otp}
            />
            {formik.touched.otp && formik.errors.otp ? (
              <div style={{ color: "red" }}>{formik.errors.otp}</div>
            ) : null}
          </div>
          {ActiveResponse ? (
            <div style={{ color: isColor }}>{Messages}</div>
          ) : null}
          <div className="form-group">
            <button type="submit" className="submit-btn">
              Verify
            </button>
          </div>
          OR
          <div>
            <a href="/sign-up" className="sign-container">
              Create New Account
            </a>
          </div>
          <div>
            <p>
              Bact to{" "}
              <a href="/login" className="sign-container">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Otp;
