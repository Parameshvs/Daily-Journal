// import React, { useState } from 'react';
// import NoteEditor from '../components/NoteEditor';
// import NotesList from '../components/NotesList';
// import TagFilter from '../components/TagFilter';
// import DateFilter from '../Components/DateFilter'; // corrected 'Components' to 'components'
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [selectedNote, setSelectedNote] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [tagFilter, setTagFilter] = useState(null);
//   const [sortBy, setSortBy] = useState('created');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const navigate = useNavigate(); // for logout navigation

//   const tags = ['work', 'personal', 'ideas']; // Ideally fetched from backend

//   const handleLogout = () => {
//     localStorage.removeItem('authToken'); // remove token
//     navigate('/login'); // redirect to login
//   };

//   return (
//     <div className="p-6">
//       {/* Top bar with Logout */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Main content grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Sidebar (left) */}
//         <div className="col-span-1">
//           {/* Search Input */}
//           <input
//             type="text"
//             placeholder="Search notes..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full border p-2 mb-4 rounded"
//           />

//           {/* Tag Filter */}
//           <TagFilter
//             currentTag={tagFilter}
//             tags={tags}
//             onTagSelect={setTagFilter}
//           />

//           {/* Date Filter */}
//           <DateFilter
//             startDate={startDate}
//             endDate={endDate}
//             setStartDate={setStartDate}
//             setEndDate={setEndDate}
//           />

//           {/* Sort Options */}
//           <div className="mb-4">
//             <label className="mr-2 text-sm">Sort By:</label>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="border p-1 text-sm"
//             >
//               <option value="created">Date Created</option>
//               <option value="updated">Last Updated</option>
//             </select>
//           </div>

//           {/* Notes List */}
//           <NotesList
//             searchQuery={searchQuery}
//             tagFilter={tagFilter}
//             sortBy={sortBy}
//             startDate={startDate}
//             endDate={endDate}
//             onNoteSelect={setSelectedNote}
//           />
//         </div>

//         {/* Editor (right) */}
//         <div className="col-span-2">
//           <NoteEditor
//             selectedNote={selectedNote}
//             onSaveComplete={() => setSelectedNote(null)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import NoteEditor from '../components/NoteEditor';
import NotesList from '../components/NotesList';
import TagFilter from '../components/TagFilter';
import DateFilter from '../components/DateFilter';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Dashboard = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState(null);
  const [sortBy, setSortBy] = useState('created');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const response = await axios.get('/notes');
      setNotes(response.data);

      // Update tags dynamically
      const allTags = new Set();
      response.data.forEach(note => {
        note.tags?.forEach(tag => allTags.add(tag));
      });
      setTags(Array.from(allTags));
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleSaveComplete = () => {
    fetchNotes(); // Re-fetch notes and tags after saving
    setSelectedNote(null); // Optional: Clear selected note after save
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border p-2 mb-4 rounded"
          />

          <TagFilter
            currentTag={tagFilter}
            tags={tags}
            onTagSelect={setTagFilter}
          />

          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />

          <div className="mb-4">
            <label className="mr-2 text-sm">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border p-1 text-sm"
            >
              <option value="created">Date Created</option>
              <option value="updated">Last Updated</option>
            </select>
          </div>

          <NotesList
            notes={notes}
            searchQuery={searchQuery}
            tagFilter={tagFilter}
            sortBy={sortBy}
            startDate={startDate}
            endDate={endDate}
            onNoteSelect={setSelectedNote}
          />
        </div>

        <div className="col-span-2">
          <NoteEditor
            selectedNote={selectedNote}
            onSaveComplete={handleSaveComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
