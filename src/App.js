import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');

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
          }
        ]
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <input onChange={(e) => setPrompt(e.target.value)}></input>
        <button onClick={() => {completePrompt(prompt)}}>Click to complete</button>
      </header>
    </div>
  );
}

export default App;
