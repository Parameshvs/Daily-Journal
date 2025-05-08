
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import NoteEditor from '../Components/NoteEditor';
import NotesList from '../Components/NotesList';
import TagFilter from '../Components/TagFilter';
import DateFilter from '../Components/DateFilter';

const AdminDashboard = () => {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [tags, setTags] = useState([])
  const [currentTag, setCurrentTag] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [userId, setUserId] = useState('')

  const navigate = useNavigate();


  // Fetch notes and tags on component mount
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Fetch user ID dynamically
  const fetchUserId = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/byname');
      if (response.data && response.data.userId) {
        setUserId(response.data.userId)
      } else {
        alert('User ID not found.')
      }
    } catch (err) {
      console.error('Error fetching User ID:', err)
    }
  };

  const fetchNotes = async () => {
    try {
      const params = {}
      if (currentTag) params.tag = currentTag
      if (startDate && endDate) {
        params.startDate = startDate
        params.endDate = endDate
      }

      const response = await axios.get('/admin/notes', { params })
      setNotes(response.data);

      const allTags = [...new Set(response.data.flatMap(note => note.tags || []))]
      setTags(allTags)
    } catch (err) {
      console.error('Failed to fetch notes:', err)
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [currentTag, startDate, endDate]);

  const handleSave = async (noteData) => {
    try {
      if (selectedNote) {
        await axios.put(`/admin/notes/${selectedNote.id}`, noteData)
      } else {
        if (!userId) {
          await fetchUserId(); // Fetch user ID dynamically
        }
        if (!userId) {
          alert('User ID is required to assign the new note.')
          return;
        }
        await axios.post(`/admin/notes/${userId}`, noteData)
      }

      setSelectedNote(null)
      fetchNotes()
    } catch (err) {
      console.error('Error saving note:', err)
    }
  }

  const handleDelete = async (noteId) => {
    try {
      await axios.delete(`/admin/notes/${noteId}`)
      fetchNotes()
    } catch (err) {
      console.error('Error deleting note:', err)
    }
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>



      <div className="flex gap-4 flex-wrap">
        <TagFilter tags={tags} currentTag={currentTag} onTagSelect={setCurrentTag} />
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>


      <NoteEditor
        selectedNote={selectedNote}
        onSave={handleSave}
        onCancel={() => setSelectedNote(null)}
      />


      <NotesList
        notes={notes}
        tagFilter={currentTag}
        startDate={startDate}
        endDate={endDate}
        onNoteSelect={setSelectedNote}
        onNotesUpdated={fetchNotes}
      />
    </div>
  );
};

export default AdminDashboard;