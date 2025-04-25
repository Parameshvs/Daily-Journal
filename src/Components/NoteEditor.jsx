// // import React, { useState, useEffect } from 'react';
// // import ReactMde from 'react-mde';
// // import ReactMarkdown from 'react-markdown';
// // import axios from '../api/axios';
// // import 'react-mde/lib/styles/css/react-mde-all.css';

// // const NoteEditor = ({ selectedNote, onSaveComplete }) => {
// //   const [title, setTitle] = useState('');
// //   const [content, setContent] = useState('');
// //   const [tags, setTags] = useState('');
// //   const [selectedTab, setSelectedTab] = useState('write');

// //   useEffect(() => {
// //     if (selectedNote) {
// //       setTitle(selectedNote.title);
// //       setContent(selectedNote.content);
// //       setTags(selectedNote.tags?.join(', ') || '');
// //     }
// //   }, [selectedNote]);

// //   const handleSave = async () => {
// //     const noteData = {
// //       title,
// //       content,
// //       tags: tags.split(',').map(t => t.trim()),
// //     };

// //     try {
// //       if (selectedNote?.id) {
// //         await axios.put(`/notes/${selectedNote.id}`, noteData);
// //       } else {
// //         await axios.post('/notes', noteData);
// //       }

// //       // ✅ Clear input fields after save
// //       setTitle('');
// //       setContent('');
// //       setTags('');
// //       setSelectedTab('write');

// //       onSaveComplete();
// //     } catch (err) {
// //       console.error('Error saving note:', err);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     if (selectedNote?.id && window.confirm('Delete this note?')) {
// //       await axios.delete(`/notes/${selectedNote.id}`);
// //       onSaveComplete();

// //       // ✅ Clear fields after delete
// //       setTitle('');
// //       setContent('');
// //       setTags('');
// //       setSelectedTab('write');
// //     }
// //   };

// //   return (
// //     <div className="bg-white p-4 rounded shadow">
// //       <input
// //         value={title}
// //         onChange={e => setTitle(e.target.value)}
// //         placeholder="Title"
// //         className="w-full text-xl font-bold border-b p-2"
// //       />
// //       <input
// //         value={tags}
// //         onChange={e => setTags(e.target.value)}
// //         placeholder="Tags (comma separated)"
// //         className="w-full p-2 border my-2"
// //       />
// //       <ReactMde
// //         value={content}
// //         onChange={setContent}
// //         selectedTab={selectedTab}
// //         onTabChange={setSelectedTab}
// //         generateMarkdownPreview={md => Promise.resolve(<ReactMarkdown>{md}</ReactMarkdown>)}
// //       />
// //       <div className="flex justify-between mt-3">
// //         <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>
// //           Save
// //         </button>
// //         {selectedNote?.id && (
// //           <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
// //             Delete
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default NoteEditor;


// import React, { useState, useEffect } from 'react';
// import MDEditor from '@uiw/react-md-editor';
// import ReactMarkdown from 'react-markdown';
// import axios from '../api/axios';

// import 'react-mde/lib/styles/css/react-mde-all.css';

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




import React, { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import axios from '../api/axios';

const NoteEditor = ({ selectedNote, onSaveComplete }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  // Load selected note into the editor
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setTags(selectedNote.tags?.join(', ') || '');
    }
  }, [selectedNote]);

  // Save the note
  const handleSave = async () => {
    const noteData = {
      title,
      content,
      tags: tags.split(',').map(t => t.trim()),
    };

    try {
      if (selectedNote?.id) {
        await axios.put(`/notes/${selectedNote.id}`, noteData);
      } else {
        await axios.post('/notes', noteData);
      }

      // Clear the input fields after saving
      setTitle('');
      setContent('');
      setTags('');
      
      // Trigger the onSaveComplete callback to refresh the note list
      onSaveComplete();
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  // Delete the note
  const handleDelete = async () => {
    if (selectedNote?.id && window.confirm('Delete this note?')) {
      await axios.delete(`/notes/${selectedNote.id}`);
      onSaveComplete();
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full text-xl font-bold border-b p-2"
      />
      <input
        value={tags}
        onChange={e => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="w-full p-2 border my-2"
      />
      <div className="my-4">
        <MDEditor
          value={content}
          onChange={setContent}
        />
      </div>
      <div className="flex justify-between mt-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>
          Save
        </button>
        {selectedNote?.id && (
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
