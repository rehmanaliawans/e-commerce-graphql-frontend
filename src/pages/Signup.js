import { useMutation } from "@apollo/client";
import { Card, CardContent, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIGNUP_USER } from "../gqlOperations/mutation";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const [SignupUser, { loading, error, data }] = useMutation(SIGNUP_USER);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    SignupUser({
      variables: {
        input: formData,
      },
    });
  };
  if (data) {
    localStorage.setItem("token", data.register.jwt);
    navigate("/");
  }
  return (
    <div className="container" style={{ maxWidth: "500px", marginTop: "10px" }}>
      {error && <div className="card-panel red">{error.message}</div>}
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              required
              placeholder="usename"
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              required
              placeholder="email"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Enter password"
              onChange={handleChange}
            />
            <button className="btn blue" type="submit">
              {loading ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                "Signup"
              )}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
