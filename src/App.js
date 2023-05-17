import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// import { ChakraProvider, Box, Center, Input, Button } from '@chakra-ui/react';

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
      <div className='app'>
        <section className='sideBar'>
          <button>New Chat</button>
        </section>
        <section className='main'></section>
      </div>
    
  );
}

export default App;
