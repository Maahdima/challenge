import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Navbar from "./Navbar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SignupValidator(props) {
  const {
    users,
    addNewUser,
    clearSignupData,
    email,
    setEmail,
    password,
    setPassword,
    confirmedPass,
    setConfirmedPass,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    fathersName,
    setFathersName,
    mothersName,
    setMothersName,
    age,
    setAge,
    step,
    setStep,
    isSignedin,
    setIsSignedin,
  } = props;

  const navigate = useNavigate();

  useEffect(() => customValidators(), [password]);

  const [showSnackBar, setShowSnackBar] = useState(false);

  const handleFormSubmit = () => {
    console.log("form submited");
    alert("You've been successfully registered");
    addNewUser();
    setStep(0);
    clearSignupData();
    navigate("/");
  };

  const handleSubmit = () => {
    setStep((prev) => prev + 1);
    step > 1 && handleFormSubmit();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackBar(false);
  };

  const handlePrevPage = () => {
    setStep((prev) => prev - 1);
  };

  const customValidators = () => {
    ValidatorForm.addValidationRule("isPasswordsMatch", (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("isEmailRepeated", (value) => {
      const emailCheck = users.some((user) => user.email === value);
      if (emailCheck) {
        return false;
      }
      return true;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar setIsSignedin={setIsSignedin} isSignedin={isSignedin} />

      <div style={{ margin: "20px" }}>
        <h3>SIGNING UP</h3>

        <ValidatorForm
          onSubmit={handleSubmit}
          onError={(errors) => console.log(errors)}
        >
          <TextValidator
            style={{ marginBottom: "10px" }}
            label={
              step === 0 ? "Email" : step === 1 ? "First Name" : "Father`s Name"
            }
            onChange={
              step === 0
                ? (e) => setEmail(e.target.value)
                : step === 1
                ? (e) => setFirstName(e.target.value)
                : (e) => setFathersName(e.target.value)
            }
            value={step === 0 ? email : step === 1 ? firstName : fathersName}
            validators={
              step === 0
                ? ["required", "isEmail", "isEmailRepeated"]
                : step === 1
                ? ["required"]
                : ["required"]
            }
            errorMessages={
              step === 0
                ? [
                    "This field is required",
                    "Email is not valid",
                    "This Email has already been registered!",
                  ]
                : step === 1
                ? [
                    "This field is required",
                    "You must enter a valid text",
                    "10",
                  ]
                : ["This field is required", "You must enter a valid text"]
            }
          />
          <TextValidator
            type={step === 0 && "password"}
            style={{ marginBottom: "10px" }}
            label={
              step === 0
                ? "Password"
                : step === 1
                ? "Last Name"
                : "Mother`s Name"
            }
            onChange={
              step === 0
                ? (e) => setPassword(e.target.value)
                : step === 1
                ? (e) => setLastName(e.target.value)
                : (e) => setMothersName(e.target.value)
            }
            value={step === 0 ? password : step === 1 ? lastName : mothersName}
            validators={
              step === 0
                ? ["required"]
                : step === 1
                ? ["required", "isString"]
                : ["required", "isString"]
            }
            errorMessages={
              step === 0
                ? ["This field is required"]
                : step === 1
                ? ["This field is required", "You must enter a valid text"]
                : ["This field is required", "You must enter a valid text"]
            }
          />
          <TextValidator
            type={step === 0 && "password"}
            style={{ marginBottom: "10px" }}
            label={
              step === 0
                ? "Confirm Password"
                : step === 1
                ? "Phone Number"
                : "Age"
            }
            onChange={
              step === 0
                ? (e) => setConfirmedPass(e.target.value)
                : step === 1
                ? (e) => setPhoneNumber(e.target.value)
                : (e) => setAge(e.target.value)
            }
            value={step === 0 ? confirmedPass : step === 1 ? phoneNumber : age}
            validators={
              step === 0
                ? ["required", "isPasswordsMatch"]
                : step === 1
                ? ["required", "isNumber", "isPositive"]
                : ["required", "isNumber"]
            }
            errorMessages={
              step == 0
                ? [
                    "This field is required",
                    "Entered passwrods are not the same!",
                  ]
                : step === 1
                ? [
                    "This field is required",
                    "You must enter a valid number",
                    "Entered number must be positive",
                  ]
                : ["This field is required", "You must enter a valid number"]
            }
          />
          <Button
            disabled={step < 1}
            style={{ marginTop: "10px" }}
            variant="contained"
            color="secondary"
            type="button"
            onClick={handlePrevPage}
          >
            Previous Step
          </Button>
          <Button
            disabled={step > 1}
            style={{ marginTop: "10px", marginLeft: "10px" }}
            variant="contained"
            type="submit"
          >
            Next Step
          </Button>
          <Button
            disabled={step < 2}
            style={{ marginTop: "10px", marginLeft: "10px" }}
            variant="contained"
            type={step > 1 ? "submit" : "button"}
          >
            Submit
          </Button>
        </ValidatorForm>
      </div>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          You've been successfully registered
        </Alert>
      </Snackbar>
    </motion.div>
  );
}

export default SignupValidator;
