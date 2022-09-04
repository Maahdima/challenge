import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Buy from "./components/Buy";
import Contact from "./components/Contact";
import { useState } from "react";
import SignupValidator from "./components/SignupValidator";
import SigninValidator from "./components/SigninValidator";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [mothersName, setMothersName] = useState("");
  const [age, setAge] = useState("");
  //FIXME: how to set default values here?

  const [step, setStep] = useState(0);

  const [users, setUsers] = useState([
    {
      email: "",
      password: "",
      confirmedPass: "",
      //step 0
      firstName: "",
      lastName: "",
      phoneNumber: "",
      //step 1
      fahtersName: "",
      mothersName: "",
      age: "",
      //step 2
    },
  ]);

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

  const clearData = () => {
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

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} /> {/* Public Route */}
        <Route path="/about" element={<About />} /> {/* Public Route */}
        <Route path="/buy" element={<Buy />} /> {/* Private Route */}
        <Route path="/contact" element={<Contact />} /> {/* Private Route */}
        <Route path="/signin" element={<SigninValidator />} />
        <Route
          path="/signup"
          element={
            <SignupValidator
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmedPass={confirmedPass}
              setConfirmedPass={setConfirmedPass}
              addNewUser={addNewUser}
              clearData={clearData}
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
    </div>
  );
}

export default App;
