import "./App.css";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Buy from "./components/Buy";
import Contact from "./components/Contact";
import { useEffect, useState } from "react";
import SignupValidator from "./components/SignupValidator";
import SigninValidator from "./components/SigninValidator";
import { AnimatePresence } from "framer-motion";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  //signup data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  //step 0
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  //step 1
  const [fathersName, setFathersName] = useState("");
  const [mothersName, setMothersName] = useState("");
  const [age, setAge] = useState("");
  //step 2

  //check if user signed in before for private routes
  const [isSignedin, setIsSignedin] = useState(false);

  //sign up step
  const [step, setStep] = useState(0);

  //list of users come form local storage
  const listOfUsers = JSON.parse(localStorage.getItem("usersList"));
  //registered users
  const [users, setUsers] = useState(
    listOfUsers || [
      {
        email: null,
        password: null,
        confirmedPass: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        fahtersName: null,
        mothersName: null,
        age: null,
      },
    ]
  );

  useEffect(() => addToLocalStorage(), [users]);

  //signin data
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  //adding new user to users
  const addNewUser = () => {
    setUsers([
      ...users,
      {
        email: email,
        password: password,
        confirmedPass: confirmedPass,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        fathersName: fathersName,
        mothersName: mothersName,
        age: age,
      },
    ]);
  };

  //clear the states coming from sign up form after user has been registered
  const clearSignupData = () => {
    setEmail("");
    setPassword("");
    setConfirmedPass("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setFathersName("");
    setMothersName("");
    setAge("");
  };

  //clear the states coming from sign in form after user has been signedin
  const clearSigninData = () => {
    setLoginEmail("");
    setLoginPass("");
  };

  //check the entered data to signin with existed users
  const checkUser = (loginEmail, loginPass) => {
    const check = users.some((user) => {
      return user.email === loginEmail && user.password === loginPass;
    });
    if (check) {
      alert("You've been successfully signed in");
      setIsSignedin(true);
      navigate("/");
      clearSigninData();
    } else {
      alert("Entered credentials are invalid!");
    }
  };

  //add new users to the local storage for further logins
  const addToLocalStorage = () => {
    const userstolocal = JSON.stringify(users);
    localStorage.setItem("usersList", userstolocal);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("usersList");
    console.log("test2");
    setUsers([
      {
        email: null,
        password: null,
        confirmedPass: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        fahtersName: null,
        mothersName: null,
        age: null,
      },
    ]);
    const userstolocal = JSON.stringify(users);
    localStorage.setItem("usersList", userstolocal);
  };

  return (
    <div className="App">
      <AnimatePresence key={location.pathname} onExitComplete>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                clearLocalStorage={clearLocalStorage}
                setIsSignedin={setIsSignedin}
                isSignedin={isSignedin}
              />
            }
          />{" "}
          {/* Public Route */}
          <Route
            path="/about"
            element={
              <About setIsSignedin={setIsSignedin} isSignedin={isSignedin} />
            }
          />{" "}
          {/* Public Route */}
          <Route
            path="/buy"
            element={
              !isSignedin ? (
                <Navigate to="/signin" replace />
              ) : (
                <Buy setIsSignedin={setIsSignedin} isSignedin={isSignedin} />
              )
            }
          />{" "}
          {/* Private Route */}
          <Route
            path="/contact"
            element={
              !isSignedin ? (
                <Navigate to="/signin" replace />
              ) : (
                <Contact
                  setIsSignedin={setIsSignedin}
                  isSignedin={isSignedin}
                />
              )
            }
          />{" "}
          {/* Private Route */}
          <Route
            path="/signin"
            element={
              <SigninValidator
                setIsSignedin={setIsSignedin}
                isSignedin={isSignedin}
                loginEmail={loginEmail}
                setLoginEmail={setLoginEmail}
                loginPass={loginPass}
                setLoginPass={setLoginPass}
                checkUser={checkUser}
                clearSigninData={clearSigninData}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignupValidator
                users={users}
                setIsSignedin={setIsSignedin}
                isSignedin={isSignedin}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmedPass={confirmedPass}
                setConfirmedPass={setConfirmedPass}
                addNewUser={addNewUser}
                clearSignupData={clearSignupData}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                fathersName={fathersName}
                setFathersName={setFathersName}
                mothersName={mothersName}
                setMothersName={setMothersName}
                age={age}
                setAge={setAge}
                step={step}
                setStep={setStep}
              />
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
