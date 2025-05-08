
// Import required modules and libraries
import React, { useState, useEffect } from 'react';  // React hooks for managing state and lifecycle
import MDEditor from '@uiw/react-md-editor';        // Markdown editor component
import axios from '../api/axios';                   // Axios instance to make API requests

// Define the NoteEditor component with props: selectedNote and onSaveComplete
const NoteEditor = ({ selectedNote, onSaveComplete }) => {
  // State for note title, content, and tags
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  // Effect: Whenever the selected note changes, load its data into the editor
  useEffect(() => {
    if (selectedNote) {
      // Load existing note details
      setTitle(selectedNote.title || '')
      setContent(selectedNote.content || '')
      setTags(selectedNote.tags ? selectedNote.tags.join(', ') : '')
    } else {
      // If no note is selected, reset the editor fields
      setTitle('')

      setContent('')

      setTags('')
    }

  }, [selectedNote])

  // Handle saving the note (either create new or update existing)
  const handleSave = async () => {
    // Prepare note data for the request
    const noteData = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    }

    try {
      if (selectedNote?.id) {
        // Update existing note using PUT request
        await axios.put(`/notes/${selectedNote.id}`, noteData)
      } else {
        // Create new note using POST request
        await axios.post('/notes', noteData)
      }

      // Clear the editor fields after successful save
      setTitle('')
      setContent('')
      setTags('')

      // Notify parent component to refresh the notes list
      onSaveComplete()

    } catch (error) {
      // Log error if saving fails
      console.error('Error saving note:', error)
    }
  }

  // Handle deleting the selected note
  const handleDelete = async () => {
    // Do nothing if no note is selected
    if (!selectedNote?.id) return

    // Ask user for delete confirmation
    const confirmDelete = window.confirm('Are you sure you want to delete this note?')

    if (confirmDelete) {
      try {

        // Delete the note using DELETE request
        await axios.delete(`/notes/${selectedNote.id}`)


        // Clear editor and refresh list after delete
        setTitle('')
        setContent('')
        setTags('')
        onSaveComplete()
      } catch (error) {
        // Log error if delete fails
        console.error('Error deleting note:', error)
      }
    }
  }


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
