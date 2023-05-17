import "./App.css";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
// import { ChakraProvider, Box, Center, Input, Button } from '@chakra-ui/react';

function App() {
  const [prompt, setPrompt] = useState("");

  async function completePrompt(input) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
      }),
    });
    const data = await response.json();
    console.log(data);
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
        <ul id="conversation"></ul>
        <div className="prompt">
          <input
            id="sendField"
            type="text"
            placeholder="Send a message."
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
          <div id="sendButton">
            <AiOutlineSend
              id="sendIcon"
              size={20}
              onClick={() => {
                let li = document.createElement("li");
                let textNode = document.createTextNode(prompt);
                li.appendChild(textNode);
                document.getElementById("conversation").appendChild(li);
                // completePrompt(prompt);
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
