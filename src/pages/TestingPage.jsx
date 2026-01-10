import React from "react";
import Button from "../components/common/Button/Button";

const TestingPage = () => {
  const handleClick = () => {
    alert("kaam kro");
  };
  return (
    <>
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-blue-600">Tailwind is working ✅</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          gap: "20px",
        }}
      >
        <Button onClick={handleClick} label="Now" color="#EA4335" />
        <Button onClick={handleClick} label="Let's" color="#34A853" />
        <Button onClick={handleClick} label="Start" color="#FBBC04" />
        <Button onClick={handleClick} label="This!" color="#4285F4" />
      </div>
    </>
  );
};

export default TestingPage;
