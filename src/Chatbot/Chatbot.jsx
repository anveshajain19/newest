
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import gptLogo from "./assets/assets/assistant-svgrepo-com.svg";
import addBtn from "./assets/assets/add-30.png";
import msgIcon from "./assets/assets/message.svg";
import home from "./assets/assets/home.svg";
import saved from "./assets/assets/bookmark.svg";
import rocket from "./assets/assets/rocket.svg";
import sendBtn from "./assets/assets/send.svg";
import userIcon from "./assets/assets/user-icon.png";
import gptImgLogo from "./assets/assets/assistant-svgrepo-com.svg";
import { sendMsgToOpenAi } from "./openai";
import "./Chatbot.css"; // Create this file for custom styling
import ReactMarkdown from "react-markdown"; // Markdown renderer

function Chatbot() {
  const navigate = useNavigate("/Home");
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([
    {
      text: "hi",
      isBot: true,
    },
  ]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessage([
      ...message,
      {
        text,
        isBot: false,
      },
    ]);
    const res = await sendMsgToOpenAi(input);
    setMessage([
      ...message,
      {
        text,
        isBot: false,
      },
      {
        text: res,
        isBot: true,
      },
    ]);
  };

  return (
    <div className="chatbot-container">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Upper Side */}
        <div className="sidebar-upper">
          <div className="sidebar-header">
            <img src={gptLogo} alt="logo" className="logo" />
            <span className="title">CodeGPT</span>
          </div>

          <button className="sidebar-btn green-btn">
            <img src={addBtn} alt="newChat" className="icon" />
            <span>New Chat</span>
          </button>

          <div className="sidebar-options">
            <button className="sidebar-btn gray-btn">
              <img src={msgIcon} alt="query" className="icon" />
              <span>Code Dijkastras?</span>
            </button>
            <button className="sidebar-btn gray-btn">
              <img src={msgIcon} alt="query" className="icon" />
              <span>Is this Correct cod...............</span>
            </button>
          </div>
        </div>

        {/* Lower Side */}
        <div className="sidebar-lower">
          <div className="sidebar-link" onClick={() => navigate("/")}>
            <img src={home} alt="Home" className="icon" />
            <span>Home</span>
          </div>

          <div className="sidebar-link">
            <img src={saved} alt="Save" className="icon" />
            <span>Saved</span>
          </div>

          <div className="sidebar-link">
            <img src={rocket} alt="Upgrade" className="icon" />
            <span>Upgrade to Pro</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-area">
        <div className="chat-messages">
          {message.map((message, i) => (
            <div
              key={i}
              className={`chat-message ${message.isBot ? "bot" : "user"}`}
            >
              <img
                src={message.isBot ? gptImgLogo : userIcon}
                alt="Avatar"
                className="avatar"
              />
              <div className="message-box">
                {message.isBot ? (
                  <ReactMarkdown>{message.text}</ReactMarkdown> // Format bot responses using markdown
                ) : (
                  <span>{message.text}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <form onSubmit={(e) => e.preventDefault()} className="input-form">
            <input
              type="text"
              placeholder="Send a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-box"
            />
            <button onClick={handleSend} className="send-btn">
              <img src={sendBtn} alt="send" className="send-icon" />
            </button>
          </form>
          <p className="disclaimer">
            CodeGPT may produce inaccurate information about people, places, or
            facts.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
