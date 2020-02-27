import React from "react";
import { withFormik, Form as FormikForm, Field } from "formik";

function Form(props) {
  return (
    <FormikForm className="card">
      <Field
        type="text"
        name="name"
        placeholder="Your Name"
        className="form-control"
      />
      <Field
        type="email"
        name="email"
        placeholder="you@example.com"
        className="form-control"
      />
      <Field type="password" name="password" className="form-control" />
      <Field type="checkbox" name="terms" className="form-control" />
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
      terms: terms || ""
    };
  }
})(Form);
