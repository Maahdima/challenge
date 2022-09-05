import React from "react";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SigninValidator(props) {
  const {
    loginEmail,
    setLoginEmail,
    loginPass,
    setLoginPass,
    checkUser,
    isSignedin,
    setIsSignedin,
  } = props;

  const navigate = useNavigate();

  const handleSubmit = () => {
    checkUser(loginEmail, loginPass);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar setIsSignedin={setIsSignedin} isSignedin={isSignedin} />

      <div style={{ margin: "20px" }}>
        <h3>SIGNING IN</h3>

        <ValidatorForm
          onSubmit={handleSubmit}
          onError={(errors) => console.log(errors)}
        >
          <TextValidator
            style={{ marginBottom: "10px" }}
            label={"Email"}
            onChange={(e) => setLoginEmail(e.target.value)}
            value={loginEmail}
            validators={["required", "isEmail"]}
            errorMessages={["This field is required", "Email is not valid"]}
          />
          <TextValidator
            type="password"
            style={{ marginBottom: "10px" }}
            label={"Password"}
            onChange={(e) => setLoginPass(e.target.value)}
            value={loginPass}
            validators={["required"]}
            errorMessages={["This field is required"]}
          />
          <Button type="submit" variant="contained">
            LOGIN
          </Button>
        </ValidatorForm>
      </div>
    </motion.div>
  );
}

export default SigninValidator;
