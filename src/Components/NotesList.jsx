
import React, { useEffect, useState } from 'react'
const NotesList = ({
  notes,
  tagFilter,
  startDate,
  endDate,
  onNoteSelect,
  onNotesUpdated
}) => {
  const [filteredNotes, setFilteredNotes] = useState(notes)

  useEffect(() => {
    let filtered = notes

    if (tagFilter) {
      filtered = filtered.filter(note => note.tags?.includes(tagFilter))
    }

    if (startDate && endDate) {
      filtered = filtered.filter(note => {
        const noteDate = new Date(note.created_at)
        return noteDate >= new Date(startDate) && noteDate <= new Date(endDate)
      })
    }

    setFilteredNotes(filtered);
    if (onNotesUpdated) onNotesUpdated()
  }, [notes, tagFilter, startDate, endDate, onNotesUpdated])

  return (
    <div className="space-y-4">
      {filteredNotes.length === 0 ? (
        <div className="text-center text-gray-500 italic py-6 px-4 border border-dashed rounded-lg bg-gray-50 shadow-inner">
          No notes found for the selected filters.
        </div>
      ) : (
        filteredNotes.map(note => (

          <div
            key={note.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition cursor-pointer hover:bg-gray-50"
            onClick={() => onNoteSelect(note)}
          >
            
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {note.title}
              </h3>
              <span className="text-xs text-gray-400">
                {new Date(note.updated_at).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2">{note.content}</p>

            <div className="mt-2 flex flex-wrap gap-2">
              {note.tags?.length > 0 ? (
                note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 italic">No tags</span>
              )}
            </div>

            <div className="mt-2 text-xs text-gray-500 italic">
              Created by: <span className="font-medium">{note.user?.name || 'Unknown User'}</span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default NotesList;
