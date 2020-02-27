import React from "react";
import { withFormik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";

function Form({ errors }) {
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
      </label>
      <label className="form-group">
        Email
        <Field
          type="email"
          name="email"
          placeholder="you@example.com"
          className="form-control"
        />
      </label>
      <label className="form-group">
        Password
        <Field type="password" name="password" className="form-control" />
      </label>
      <label className="form-group checkbox">
        <Field type="checkbox" name="terms" className="form-check-input" />I
        agree to the Terms of Service
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
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required(),
    terms: Yup.bool().required()
  }),
  handleSubmit(values) {
    console.log(values);
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
  }
})(Form);
