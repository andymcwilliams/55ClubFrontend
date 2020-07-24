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
  const [userListLoading, setUserListLoading] = useState(true);
  const [errorsObject, setErrorsObject] = useState();

  useEffect(() => {
    fetch("https://localhost:5001/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log("users fetched");
        console.log(JSON.stringify(data));
        console.log(typeof data);
      });

    sleep(300).then(() => {
      setUserListLoading(false);
    });
  }, []);

  const sleep = (waitTimeInMs) =>
    new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

  const createUser = async () => {
    setUserListLoading(true);

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

    var data = await resp.json();

    if (!resp.ok) {
      setErrorsObject(data.errors);
    } else {
      var newUserList = [...users, data];
      setUsers(newUserList);

      setUserFirstName("");
      setUserSecondName("");
      setUserEmail("");
      setUserCaption("");
    }

    sleep(300).then(() => {
      setUserListLoading(false);
    });
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
          {errorsObject && (
            <p className="text-danger">{JSON.stringify(errorsObject)}</p>
          )}
        </div>
      </div>
      {userListLoading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <Users users={users} />
      )}
    </>
  );
}

export default App;
