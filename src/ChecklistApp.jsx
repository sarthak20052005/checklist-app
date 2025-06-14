import React, { useState } from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

export default function ChecklistApp() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const addItem = () => {
    if (input.trim()) {
      setItems([...items, { text: input.trim(), done: false }]);
      setInput('');
    }
  };

  const toggleDone = (index) => {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Checklist</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add new item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow"
        />
        <button onClick={addItem}>Add</button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-white rounded shadow"
          >
            <div className="flex items-center gap-3">
              <button onClick={() => toggleDone(index)} className="bg-transparent hover:bg-gray-100 p-1 rounded-full">
                {item.done ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <span className={`text-base ${item.done ? 'line-through text-gray-400' : ''}`}>
                {item.text}
              </span>
            </div>
            <button onClick={() => deleteItem(index)} className="bg-transparent hover:bg-red-100 p-1 rounded-full">
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
