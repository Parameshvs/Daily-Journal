// import React, { useEffect, useState } from 'react';
// import axios from '../api/axios';

// const NotesList = ({ onNoteSelect, searchQuery, tagFilter, sortBy }) => {
//   const [notes, setNotes] = useState([]);

//   const loadNotes = async () => {
//     const res = await axios.get('/notes');
//     let filtered = res.data;

//     // Search by title/content
//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       filtered = filtered.filter(note =>
//         note.title.toLowerCase().includes(q) || note.content.toLowerCase().includes(q)
//       );
//     }

//     // Filter by tag
//     if (tagFilter) {
//       filtered = filtered.filter(note =>
//         note.tags?.includes(tagFilter)
//       );
//     }

//     // Sort
//     if (sortBy === 'updated') {
//       filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
//     } else {
//       filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//     }

//     setNotes(filtered);
//   };

//   useEffect(() => {
//     loadNotes();
//   }, [searchQuery, tagFilter, sortBy]);

//   return (
//     <div className="space-y-3">
//       {notes.map(note => (
//         <div
//           key={note.id}
//           className="bg-gray-100 p-3 rounded shadow cursor-pointer hover:bg-gray-200"
//           onClick={() => onNoteSelect(note)}
//         >
//           <h3 className="font-bold">{note.title}</h3>
//           <p className="text-sm text-gray-600">{note.content.slice(0, 100)}...</p>
//           <div className="text-xs text-gray-500 mt-1">
//             Tags: {note.tags?.join(', ') || 'None'}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NotesList;


import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const NotesList = ({ searchQuery, tagFilter, sortBy, startDate, endDate, onNoteSelect }) => {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    try {
      let res;
  
      if (startDate && endDate) {
        res = await axios.get('/notes/filter/date-range', {
          params: {
            startDate,
            endDate,
          },
        });
      } else if (tagFilter) {
        res = await axios.get('/notes/filter/tag', {
          params: { tag: tagFilter },
        });
      } else if (searchQuery) {
        res = await axios.get('/notes/search', {
          params: { query: searchQuery },
        });
      } else {
        res = await axios.get('/notes');
      }
  
      let filtered = res.data;
  
      // In case searchQuery or tagFilter are combined with date range
      if (searchQuery && !(startDate && endDate)) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(note =>
          note.title.toLowerCase().includes(q) ||
          note.content.toLowerCase().includes(q)
        );
      }
  
      if (tagFilter && !(startDate && endDate)) {
        filtered = filtered.filter(note =>
          note.tags?.includes(tagFilter)
        );
      }
  
      // Apply sorting
      if (sortBy === 'updated') {
        filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      } else {
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
  
      setNotes(filtered);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
  
  useEffect(() => {
    loadNotes();
  }, [searchQuery, tagFilter, sortBy, startDate, endDate]);

  return (
    <div className="space-y-3">
      {notes.length === 0 ? (
        <div className="text-center text-gray-500 italic py-4 border rounded bg-gray-50">
          No notes found for the selected filters.
        </div>
      ) : (
        notes.map(note => (
          <div
            key={note.id}
            className="bg-gray-100 p-3 rounded shadow cursor-pointer hover:bg-gray-200"
            onClick={() => onNoteSelect(note)}
          >
            <h3 className="font-bold">{note.title}</h3>
            <p className="text-sm text-gray-600">{note.content.slice(0, 100)}...</p>
            <div className="text-xs text-gray-500 mt-1">
              Tags: {note.tags?.join(', ') || 'None'}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotesList;
