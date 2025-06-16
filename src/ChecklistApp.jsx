// ChecklistApp.jsx
import React, { useState } from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

export default function ChecklistApp() {
  const [checklists, setChecklists] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [input, setInput] = useState('');
  const [newListTitle, setNewListTitle] = useState('');

  const addItem = () => {
    if (input.trim() && activeIndex !== null) {
      const updated = [...checklists];
      updated[activeIndex].items.push({ text: input.trim(), done: false });
      setChecklists(updated);
      setInput('');
    }
  };

  const toggleDone = (itemIndex) => {
    const updated = [...checklists];
    updated[activeIndex].items[itemIndex].done = !updated[activeIndex].items[itemIndex].done;
    setChecklists(updated);
  };

  const deleteItem = (itemIndex) => {
    const updated = [...checklists];
    updated[activeIndex].items = updated[activeIndex].items.filter((_, i) => i !== itemIndex);
    setChecklists(updated);
  };

  const addChecklist = () => {
    if (newListTitle.trim()) {
      const newChecklist = { title: newListTitle.trim(), items: [] };
      setChecklists([...checklists, newChecklist]);
      setNewListTitle('');
      setActiveIndex(checklists.length);
    }
  };

  const deleteChecklist = (index) => {
    const confirmed = window.confirm(`Are you sure you want to delete the checklist "${checklists[index].title}"?`);
    if (!confirmed) return;

    const updated = checklists.filter((_, i) => i !== index);
    setChecklists(updated);
    if (updated.length === 0) {
      setActiveIndex(null);
    } else if (activeIndex === index) {
      setActiveIndex(0);
    } else if (activeIndex > index) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <>
      <nav className="bg-gray-100 border-b border-gray-300 py-5 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-black text-2xl sm:text-3xl font-semibold text-center">My Checklists</h1>
        </div>
      </nav>

      <div className="max-w-full sm:max-w-6xl mx-auto pt-8 px-4 text-gray-800 font-sans overflow-x-hidden">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section */}
          <div className="flex flex-col gap-8 w-full lg:w-[40%]">
            {/* Create a New Checklist */}
            <section className="bg-gray-50 rounded-md p-4">
              <h2 className="text-lg font-medium mb-2 text-gray-800">Create a New Checklist</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter new checklist title"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  className="flex-grow border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <button
                  onClick={addChecklist}
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition w-full sm:w-auto"
                >
                  + New List
                </button>
              </div>
            </section>

            {/* Checklist List */}
            <section className="bg-gray-50 rounded-md p-4">
              <h2 className="text-lg font-medium mb-2">Your Checklists</h2>
              {checklists.length > 0 ? (
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  {checklists.map((list, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`flex items-center justify-between w-full max-w-full px-4 py-3 rounded-md shadow-sm text-sm cursor-pointer transition ${
                        i === activeIndex
                          ? 'bg-gray-200 border border-gray-400 text-gray-800'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <span className="font-medium text-base truncate max-w-[70%]">{list.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChecklist(i);
                        }}
                        className="ml-3 p-1 hover:bg-red-100 rounded-full"
                        title="Delete List"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No checklists yet. Create one to begin.</p>
              )}
            </section>
          </div>

          {/* Right Section */}
          <section className="bg-gray-50 rounded-md p-4 flex-1">
            {activeIndex !== null ? (
              <>
                <h2 className="text-lg font-medium mb-2">Items in "{checklists[activeIndex].title}"</h2>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Add a new item"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                  <button
                    onClick={addItem}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition w-full sm:w-auto"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-3">
                  {checklists[activeIndex].items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center gap-3 px-4 py-4 bg-white rounded-md shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleDone(index)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          {item.done ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400" />
                          )}
                        </button>
                        <span
                          className={`text-base break-words ${
                            item.done ? 'line-through text-gray-400' : 'text-black'
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteItem(index)}
                        title="Delete Item"
                        className="p-2 hover:bg-red-100 rounded-full"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 italic pt-6">
                Create a checklist to add items to it.
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
