import React from "react";
import axios from "axios";
import { withFormik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";

function Form({ errors, touched }) {
  console.log(errors);
  return (
    <FormikForm className="card">
      <label className="form-group">
        Name
        <Field
          type="text"
          name="name"
          placeholder="Your Name"
          className="form-control"
        />
        <p className="error">{touched.name && errors.name}</p>
      </label>
      <label className="form-group">
        Email
        <Field
          type="email"
          name="email"
          placeholder="you@example.com"
          className="form-control"
        />
        <p className="error">{touched.email && errors.email}</p>
      </label>
      <label className="form-group">
        Password
        <Field type="password" name="password" className="form-control" />
        <p className="error">{touched.password && errors.password}</p>
      </label>
      <label className="form-group checkbox">
        <Field type="checkbox" name="terms" className="form-check-input" />I
        agree to the Terms of Service
        <p className="error">{touched.terms && errors.terms}</p>
      </label>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </FormikForm>
  );
}

export default withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email()
      .required("Please enter a valid email address"),
    password: Yup.string()
      .min(6)
      .required("Please enter a valid password"),
    terms: Yup.bool().required("You must agree to the terms")
  }),
  handleSubmit(values) {
    console.log(values);
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
    axios.post("https://reqres.in/api/users").then(res => console.log(res));
  }
})(Form);
