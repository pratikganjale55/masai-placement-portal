import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#1F2937",
      }}
    >
      <img src="/error404.png" width={"30%"} alt="404error" />
      <h1>Oops! 404 Not Found</h1>
      <h4>The page you are looking for does not exist.</h4>
      <Link to="/">
        <Button
          type="primary"
          style={{
            background: "#1F2937",
            color: "White",
            fontWeight: 600,
          }}
        >
          Go back to home
        </Button>
      </Link>
    </div>
  );
};

export default Error404;
