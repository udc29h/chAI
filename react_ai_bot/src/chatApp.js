import React, { useState } from 'react';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const ChatApp = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const generateText = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: inputText }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': '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', // Replace with your actual API key
          },
        }
      );

      setOutputText(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-app">
      <h1>ChatGPT React App</h1>
      <div className="input-container">
        <Typeahead
          labelKey="name"
          placeholder="Type your message..."
          onChange={(selected) => handleInputChange(selected[0])}
          options={[]}
        />
        <button onClick={generateText} disabled={isLoading}>
          Generate
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {outputText && <div className="output">{outputText}</div>}
    </div>
  );
};

export default ChatApp;
