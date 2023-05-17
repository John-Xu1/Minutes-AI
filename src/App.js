import "./App.css";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import TextBox from "./textBox";
// import { ChakraProvider, Box, Center, Input, Button } from '@chakra-ui/react';

function App() {
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState([]);
  const conversationRef = useRef(null);
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [chats]);

  async function completePrompt(newPrompt) {
    const updatedChatHistory = [...chats, newPrompt];
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: updatedChatHistory,
      }),
    });
    const data = await response.json();
    console.log(data);
    const reply = data.choices[0].message;
    console.log(reply);
    updatedChatHistory.push(reply);
    setChats(updatedChatHistory);
  }

  return (
    <div className="app">
      <section className="sideBar">
        <button id="newChatButton" onClick={() => {}}>
          <p>
            <FaPlus id="plusIcon" /> New Chat
          </p>
        </button>
        <ul id="history">
          <li>chat 1</li>
          <li>chat 2</li>
        </ul>
        <div>
          <hr />
          <p>Made by John</p>
        </div>
      </section>
      <section className="main">
        <h1>XuPT</h1>
        <div id="conversation" ref={conversationRef}>
          <ul>
            {chats.map((stuff, idx) => {
              return stuff.role === "user" ? (
                <TextBox content={stuff.content} role="user" />
              ) : (
                <TextBox content={stuff.content} role="assistant" />
              );
            })}
          </ul>
        </div>

        <div className="prompt">
          <input
            id="sendField"
            type="text"
            placeholder="Send a message."
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
          <div
            id="sendButton"
            onClick={() => {
              const message = { role: "user", content: `${prompt}` };
              const updated = [...chats, message];
              setChats(updated);
              document.getElementById("sendField").value = "";
              completePrompt(message);
            }}
          >
            <AiOutlineSend id="sendIcon" size={20} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
