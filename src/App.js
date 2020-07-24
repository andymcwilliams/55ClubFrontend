import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Users from "./components/Users";

function App() {
  // state for keeping list of users
  const [users, setUsers] = useState([]);
  const [userFirstName, setUserFirstName] = useState();
  const [userSecondName, setUserSecondName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userCaption, setUserCaption] = useState();

  useEffect(() => {
    fetch("https://localhost:5001/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log("users fetched");
        console.log(JSON.stringify(data));
        console.log(typeof data);
      });
  }, []);

  const createUser = async () => {
    var resp = await fetch("https://localhost:5001/api/users", {
      method: "post",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        firstName: userFirstName,
        secondName: userSecondName,
        emailAddress: userEmail,
        caption: userCaption,
      }),
    });

    resp = await resp.json();

    var newUserList = [...users, resp];
    setUsers(newUserList);

    setUserFirstName("");
    setUserSecondName("");
    setUserEmail("");
    setUserCaption("");
  };

  const handleFirstNameChange = (e) => {
    setUserFirstName(e.target.value);
  };

  const handleSecondNameChange = (e) => {
    setUserSecondName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleCaptionChange = (e) => {
    setUserCaption(e.target.value);
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Create a User</h5>
          <Form
            placeholder={"First Name"}
            value={userFirstName}
            changeHandler={handleFirstNameChange}
          />
          <Form
            placeholder={"Second Name"}
            value={userSecondName}
            changeHandler={handleSecondNameChange}
          />
          <Form
            placeholder={"Email Address"}
            value={userEmail}
            changeHandler={handleEmailChange}
          />
          <Form
            placeholder={"Caption"}
            value={userCaption}
            changeHandler={handleCaptionChange}
          />
          <button onClick={() => createUser()}>Create</button>
        </div>
      </div>
      <Users users={users} />
    </>
  );
}

export default App;
