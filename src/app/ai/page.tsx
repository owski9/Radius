// @ts-nocheck
"use client"
import React, { useState } from 'react';
import { OpenAI } from 'openai';
import config from "dotenv"

config.config()
const key = process.env.NEXT_PUBLIC_AIKEY
console.log(key)

if (!key) {
  throw new Error('Theres no API key. AI will not work without it. Check your secret variables or ENV file for a variable called NEXT_PUBLIC_AIKEY if it does not exist thats your problem right there.')
}
const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true
});

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const initialPrompt = "Hi! I'm Radius assistant for the proxy site: https://radiusowski.site/. I'm here to make sure that the user is able to use the site fully and is directed to a solution if a problem occurs. also, if the user has recived an error while using radius, tell them to send a screenshot of the error to radiushelpmail@gmail.com. The purpose of radius is to keep your browsing secure. Radius configures sites to allow users to unblock any website, even in school. To search the web enter anything into the search box on the home page. In the top left corner of the site, you should see three lines. If you click on that icon, a menu will open up. There, you'll find options like the Games page, Apps page, and Settings page.";

const ChatComponent: React.FC = () => {
  const [messageLog, setMessageLog] = useState<Message[]>([
    { role: 'system', content: initialPrompt }
  ]);
  const [input, setInput] = useState<string>('');
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newMessageLog = [...messageLog, { role: 'user', content: input }];
    setMessageLog(newMessageLog);
    setInput('');
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: newMessageLog
      });

      const assistantMessage = response.choices[0].message.content;
      setMessageLog([...newMessageLog, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-[300px] h-[400px] bg-[#0000007c]" style={{
      border: '1px solid #ccc',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      padding: '10px'
    }}>
      <div style={{ height: 'calc(100% - 50px)', overflowY: 'auto' }}>
        {messageLog.map((msg, index) => (
          <div key={index} style={{ padding: '5px' }}>
            <strong>{msg.role === 'user' ? 'User' : 'Assistant'}:</strong>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className='flex mt-[10px] bg-[#353535b6]'>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: '5px' }}
          className='bg-[#353535b6]'
          placeholder='Ask Radius Assistant'
        />
        <button type="submit" style={{ marginLeft: '5px' }}>Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;
