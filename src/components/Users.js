import React from "react";

function Users(props) {
  return (
    <div className="card">
      {props.users.map((user) => (
        <div className="card-body">
          <h5 className="card-title">
            {user.firstName} {user.secondName}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">{user.emailAddress}</h6>
          <p className="card-text">{user.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default Users;
