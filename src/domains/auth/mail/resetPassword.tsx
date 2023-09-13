import * as React from "react";

const ResetPassword = ({ tokenReset, url }) => {
  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          marginBottom: "10px",
          color: "#333",
        }}
      >
        Your reset password link
      </h1>
      <a
        href={`${url}/${tokenReset}`}
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#0080ff",
        }}
      >
        reset your password
      </a>
    </div>
  );
};

export default ResetPassword;
