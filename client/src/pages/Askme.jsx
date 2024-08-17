// src/SubmitQuestion.js
import React, { useState } from 'react';
import axios from 'axios';
import { base_url } from '../config.js';

function Askme() {
  const [question, setQuestion] = useState('');

  const submitQuestion = async (e) => {
    e.preventDefault();
    if (question.trim()) {
      await axios.post(`${base_url}/api/questions`, { content: question });
      setQuestion('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 to-purple-600 p-4 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Ask me...</h1>
      <form onSubmit={submitQuestion} className="w-full max-w-sm">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full text-black p-3 mb-4 border bg-blue-100 border-none rounded-lg shadow-sm focus:outline-none "
          placeholder="Ask me..."
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Askme;
