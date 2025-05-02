
// import React, { useState, useEffect } from 'react';
// import MDEditor from '@uiw/react-md-editor';
// import axios from '../api/axios';

// const NoteEditor = ({ selectedNote, onSaveComplete }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [tags, setTags] = useState('');

//   // Load selected note into the editor
//   useEffect(() => {
//     if (selectedNote) {
//       setTitle(selectedNote.title);
//       setContent(selectedNote.content);
//       setTags(selectedNote.tags?.join(', ') || '');
//     }
//   }, [selectedNote]);

//   // Save the note
//   const handleSave = async () => {
//     const noteData = {
//       title,
//       content,
//       tags: tags.split(',').map(t => t.trim()),
//     };

//     try {
//       if (selectedNote?.id) {
//         await axios.put(`/notes/${selectedNote.id}`, noteData);
//       } else {
//         await axios.post('/notes', noteData);
//       }

//       // Clear the input fields after saving
//       setTitle('');
//       setContent('');
//       setTags('');
      
//       // Trigger the onSaveComplete callback to refresh the note list
//       onSaveComplete();
//     } catch (err) {
//       console.error('Error saving note:', err);
//     }
//   };

//   // Delete the note
//   const handleDelete = async () => {
//     if (selectedNote?.id && window.confirm('Delete this note?')) {
//       await axios.delete(`/notes/${selectedNote.id}`);
//       onSaveComplete();
//     }
//   };

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <input
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//         placeholder="Title"
//         className="w-full text-xl font-bold border-b p-2"
//       />
//       <input
//         value={tags}
//         onChange={e => setTags(e.target.value)}
//         placeholder="Tags (comma separated)"
//         className="w-full p-2 border my-2"
//       />
//       <div className="my-4">
//         <MDEditor
//           value={content}
//           onChange={setContent}
//         />
//       </div>
//       <div className="flex justify-between mt-3">
//         <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>
//           Save
//         </button>
//         {selectedNote?.id && (
//           <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
//             Delete
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NoteEditor;




// import React, { useState, useEffect } from 'react';
// import MDEditor from '@uiw/react-md-editor';
// import axios from '../api/axios';

// const NoteEditor = ({ selectedNote, onSaveComplete }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [tags, setTags] = useState('');

//   // Load selected note data into the editor when selectedNote changes
//   useEffect(() => {
//     if (selectedNote) {
//       setTitle(selectedNote.title || '');
//       setContent(selectedNote.content || '');
//       setTags(selectedNote.tags ? selectedNote.tags.join(', ') : '');
//     } else {
//       // Clear form when no note is selected
//       setTitle('');
//       setContent('');
//       setTags('');
//     }
//   }, [selectedNote]);

//   // Save note (create or update)
//   const handleSave = async () => {
//     const noteData = {
//       title,
//       content,
//       tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
//     }

//     try {
//       if (selectedNote?.id) {
//         // Update existing note
//         await axios.put(`/notes/${selectedNote.id}`, noteData);
//       } else {
//         // Create new note
//         await axios.post('/notes', noteData);
//       }

//       // Clear the editor fields after save
//       setTitle('');
//       setContent('');
//       setTags('');

//       // Refresh the notes list
//       onSaveComplete();
//     } catch (error) {
//       console.error('Error saving note:', error);
//     }
//   };

//   // Delete note
//   const handleDelete = async () => {
//     if (!selectedNote?.id) return;

//     const confirmDelete = window.confirm('Are you sure you want to delete this note?');

//     if (confirmDelete) {
//       try {
//         await axios.delete(`/notes/${selectedNote.id}`);

//         // After delete, clear form and refresh notes
//         setTitle('');
//         setContent('');
//         setTags('');

//         onSaveComplete();
//       } catch (error) {
//         console.error('Error deleting note:', error);
//       }
//     }
//   }

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         className="w-full text-xl font-bold border-b p-2"
//       />

//       <input
//         value={tags}
//         onChange={(e) => setTags(e.target.value)}
//         placeholder="Tags (comma separated)"
//         className="w-full p-2 border my-3"
//       />

//       <div className="my-4">
//         <MDEditor
//           value={content}
//           onChange={setContent}
//           height={400}
//         />
//       </div>

//       <div className="flex justify-end gap-4 mt-4">
//         {selectedNote?.id && (
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Delete
//           </button>
//         )}

//         <button
//           onClick={handleSave}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NoteEditor;




// import React, { useState, useEffect } from 'react';
// import MDEditor from '@uiw/react-md-editor';
// import axios from '../api/axios';

// const NoteEditor = ({ selectedNote, onSaveComplete }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [tags, setTags] = useState('');

//   // Load selected note data into the editor when selectedNote changes
//   useEffect(() => {
//     if (selectedNote) {
//       setTitle(selectedNote.title || '');
//       setContent(selectedNote.content || '');
//       setTags(selectedNote.tags ? selectedNote.tags.join(', ') : '');
//     } else {
//       // Clear form when no note is selected
//       setTitle('');
//       setContent('');
//       setTags('');
//     }
//   }, [selectedNote]);

//   // Save note (create or update)
//   const handleSave = async () => {
//     const noteData = {
//       title,
//       content,
//       tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
//     };

//     try {
//       if (selectedNote?.id) {
//         // Update existing note
//         await axios.put(`/notes/${selectedNote.id}`, noteData);
//       } else {
//         // Create new note
//         await axios.post('/notes', noteData);
//       }

//       // Clear the editor fields after save
//       setTitle('');
//       setContent('');
//       setTags('');

//       // Refresh the notes list
//       onSaveComplete();
//     } catch (error) {
//       console.error('Error saving note:', error);
//     }
//   };

//   // Delete note
//   const handleDelete = async () => {
//     if (!selectedNote?.id) return;

//     const confirmDelete = window.confirm('Are you sure you want to delete this note?');

//     if (confirmDelete) {
//       try {
//         await axios.delete(`/notes/${selectedNote.id}`);

//         // After delete, clear form and refresh notes
//         setTitle('');
//         setContent('');
//         setTags('');

//         onSaveComplete();
//       } catch (error) {
//         console.error('Error deleting note:', error);
//       }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200">
//       <div className="space-y-4">
//         {/* Title Input */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-1">Title</label>
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter title..."
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
//           />
//         </div>

//         {/* Tags Input */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-1">Tags</label>
//           <input
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             placeholder="Comma separated tags"
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
//           />
//         </div>

//         {/* Markdown Editor */}
//         <div>
//           <label className="block text-gray-700 font-semibold mb-1">Content</label>
//           <div className="border rounded-lg overflow-hidden">
//             <MDEditor
//               value={content}
//               onChange={setContent}
//               height={400}
//             />
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-3 pt-4">
//           {selectedNote?.id && (
//             <button
//               onClick={handleDelete}
//               className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow-md transition duration-300"
//             >
//               Delete
//             </button>
//           )}
//           <button
//             onClick={handleSave}
//             className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition duration-300"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteEditor;


// Import required modules and libraries
import React, { useState, useEffect } from 'react';  // React hooks for managing state and lifecycle
import MDEditor from '@uiw/react-md-editor';        // Markdown editor component
import axios from '../api/axios';                   // Axios instance to make API requests

// Define the NoteEditor component with props: selectedNote and onSaveComplete
const NoteEditor = ({ selectedNote, onSaveComplete }) => {
  // State for note title, content, and tags
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  // Effect: Whenever the selected note changes, load its data into the editor
  useEffect(() => {
    if (selectedNote) {
      // Load existing note details
      setTitle(selectedNote.title || '');
      setContent(selectedNote.content || '');
      setTags(selectedNote.tags ? selectedNote.tags.join(', ') : '');
    } else {
      // If no note is selected, reset the editor fields
      setTitle('');
      setContent('');
      setTags('');
    }
  }, [selectedNote]);

  // Handle saving the note (either create new or update existing)
  const handleSave = async () => {
    // Prepare note data for the request
    const noteData = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    };

    try {
      if (selectedNote?.id) {
        // Update existing note using PUT request
        await axios.put(`/notes/${selectedNote.id}`, noteData);
      } else {
        // Create new note using POST request
        await axios.post('/notes', noteData);
      }

      // Clear the editor fields after successful save
      setTitle('');
      setContent('');
      setTags('');

      // Notify parent component to refresh the notes list
      onSaveComplete();
    } catch (error) {
      // Log error if saving fails
      console.error('Error saving note:', error);
    }
  };

  // Handle deleting the selected note
  const handleDelete = async () => {
    // Do nothing if no note is selected
    if (!selectedNote?.id) return;

    // Ask user for delete confirmation
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');

    if (confirmDelete) {
      try {

        // Delete the note using DELETE request
        await axios.delete(`/notes/${selectedNote.id}`);
        

        // Clear editor and refresh list after delete
        setTitle('');
        setContent('');
        setTags('');
        onSaveComplete();
      } catch (error) {
        // Log error if delete fails
        console.error('Error deleting note:', error);
      }
    }
  };

  // Component UI
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <div className="space-y-4">
        {/* Title Input Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
          />
        </div>

        {/* Tags Input Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Tags</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Comma separated tags"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
          />
        </div>

        {/* Markdown Editor for Content */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Content</label>
          <div className="border rounded-lg overflow-hidden">
            <MDEditor
              value={content}
              onChange={setContent}
              height={400}
            />
          </div>
        </div>

        {/* Action Buttons: Delete (if editing) and Save */}
        <div className="flex justify-end gap-3 pt-4">
          {selectedNote?.id && (
            <button
              onClick={handleDelete}
              className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow-md transition duration-300"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Export the component for use in other parts of the app
export default NoteEditor;
