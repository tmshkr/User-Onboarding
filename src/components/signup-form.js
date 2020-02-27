import React, { useEffect, useState } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import axios from "axios";
import { withFormik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";

let teamList, setList, history, username;
let editing = false;

function SignupForm(props) {
  const { errors, touched, handleList, setValues } = props;
  [teamList, setList] = handleList;
  console.log(errors);

  history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (params.member && teamList[params.member]) {
      editing = true;
      username = params.member;
      setValues(teamList[username]);
    }
  }, []);

  return (
    <>
      {params.member && !teamList[params.member] && <Redirect to="/list" />}
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
          GitHub handle
          <Field
            type="text"
            name="github"
            placeholder="username"
            className="form-control"
          />
          <p className="error">{touched.github && errors.github}</p>
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
        <label className="form-group">
          Role
          <Field as="select" name="role" className="form-control">
            <option disabled>Choose one</option>
            <option>DevOps</option>
            <option>Back-end</option>
            <option>Front-end</option>
            <option>Full-stack</option>
            <option>UX/UI</option>
          </Field>
          <p className="error">{touched.role && errors.role}</p>
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
    </>
  );
}

export default withFormik({
  mapPropsToValues({ name, email, github, password, role, terms }) {
    return {
      name: name || "",
      github: github || "",
      email: email || "",
      password: password || "",
      role: role || "Choose one",
      terms: terms
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    github: Yup.string()
      .test(
        "username checks out",
        "That username is already in use",
        value => (editing && username === value) || !teamList[value]
      )
      .required("Please enter your GitHub username"),
    email: Yup.string()
      .notOneOf(["waffle@syrup.com"], "That email is already taken.")
      .email()
      .required("Please enter a valid email address"),
    password: Yup.string()
      .min(6)
      .required("Please enter a valid password"),
    role: Yup.string().notOneOf(["Choose one"], "Please select a role"),
    terms: Yup.bool().required("You must agree to the terms")
  }),
  handleSubmit(formData) {
    console.log(formData);
    axios.post("https://reqres.in/api/users").then(res => {
      const copy = { ...teamList };
      if (username !== formData.github) {
        delete copy[username];
      }
      copy[formData.github] = formData;
      setList(copy);
      history.push("/list");
    });
  }
})(SignupForm);
