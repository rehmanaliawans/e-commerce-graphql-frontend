import { useMutation } from "@apollo/client";
import { Card, CardContent, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqlOperations/mutation";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    loginUser({
      variables: {
        input: formData,
      },
    });
  };
  if (data) {
    if (data) {
      localStorage.setItem("token", data.login.jwt);
      navigate("/");
    }
  }
  return (
    <div className="container" style={{ maxWidth: "500px", marginTop: "10px" }}>
      {error && <div className="card-panel red">{error.message}</div>}
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="identifier"
              required
              placeholder="Enter email or usename"
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
                "Login"
              )}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
