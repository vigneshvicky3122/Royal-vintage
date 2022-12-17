import React from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function CreateUser() {
  let navigate = useNavigate();

  let handleSubmit = async (data) => {
    try {
      let rest = await axios.post(`${url}/signup`, data);
      if (rest.data.statusCode === 200) {
        window.alert(rest.data.message);
        navigate("/login");
      }
      if (rest.data.statusCode === 401) {
        window.confirm(rest.data.message);
        navigate("/login");
      }
      if (rest.data.statusCode === 404) {
        window.alert(rest.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("* Required"),
      email: yup.string().email("Enter a valid email").required("* Required"),
      password: yup
        .string()
        .max(8, "Min & Max character allowed is 2-8")
        .min(5, "Enter a secure password")
        .required("* Required"),
      mobile: yup
        .string()
        .matches(/^\d{10}$/, "Enter a valid Mobile number")
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
          <h1>REGISTER HERE!</h1>
          <br />
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="name">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
            />
            {formik.touched.mobile && formik.errors.mobile ? (
              <div style={{ color: "red" }}>{formik.errors.mobile}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="name">Password</label>
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
            <button type="submit" className="submit-btn">
              Sign up
            </button>
          </div>
          <div>
            <p>
              Have an account?{" "}
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

export default CreateUser;
