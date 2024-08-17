// src/SubmitQuestion.js
import React, { useState } from 'react';
import axios from 'axios';
import { base_url } from '../config';

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
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Ask a Question</h1>
      <form onSubmit={submitQuestion} className="w-full max-w-sm">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your question..."
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Askme;
