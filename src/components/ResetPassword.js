import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function ResetPassword() {
  let navigate = useNavigate();
  let params = useParams();
  const [Messages, setMessages] = useState([]);
  const [ActiveResponse, setActiveResponse] = useState(false);
  const [isColor, setColor] = useState("red");

  let handleSubmit = async (data) => {
    try {
      let request = await axios.put(`${url}/password-reset/${params.id}`, data);

      setActiveResponse(true);
      if (request.data.statusCode === 200) {
        setMessages(request.data.message);
        setColor("green");
        setTimeout(() => {
          navigate("/login");
        }, "5000");
      }
      if (request.data.statusCode === 401) {
        setMessages(request.data.message);
        setTimeout(() => {
          navigate("/sign-up");
        }, "5000");
      }
      if (request.data.statusCode === 404) {
        setTimeout(() => {
          navigate("/verify-email");
        }, "5000");
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
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .max(8, "Min & Max character allowed is 2-8")
        .min(5, "Enter a secure password")
        .required("* Required"),
      confirmPassword: yup
        .string()
        .max(8, "Min & Max character allowed is 2-8")
        .min(5, "Enter a secure password")
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
          <h1>Reset Password</h1>
          <br />
          <div className="form-group">
            <label htmlFor="name">New Password</label>
            <input
              id="password"
              name="password"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="name">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div style={{ color: "red" }}>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
          {ActiveResponse ? (
            <div style={{ color: isColor }}>{Messages}</div>
          ) : null}
          <div className="form-group">
            <button type="submit" className="submit-btn">
              Reset
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

export default ResetPassword;
