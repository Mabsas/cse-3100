import React from "react";

const ContactUs = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Contact Us</h1>
      <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <label style={{ display: "flex", flexDirection: "column", fontSize: "16px", color: "#555" }}>
          Name:
          <input
            type="text"
            name="name"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
              marginTop: "5px"
            }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", fontSize: "16px", color: "#555" }}>
          Email:
          <input
            type="email"
            name="email"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
              marginTop: "5px"
            }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", fontSize: "16px", color: "#555" }}>
          Message:
          <textarea
            name="message"
            rows="5"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
              marginTop: "5px"
            }}
          ></textarea>
        </label>
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            alignSelf: "center"
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
