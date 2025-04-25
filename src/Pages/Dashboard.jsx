import React, { useState } from 'react';
import NoteEditor from '../components/NoteEditor';
import NotesList from '../components/NotesList';
import TagFilter from '../components/TagFilter';
import DateFilter from '../Components/DateFilter';

const Dashboard = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState(null);
  const [sortBy, setSortBy] = useState('created');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const tags = ['work', 'personal', 'ideas']; // Ideally fetched from backend

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="col-span-1">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <TagFilter currentTag={tagFilter} tags={tags} onTagSelect={setTagFilter} />

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
            onChange={e => setSortBy(e.target.value)}
            className="border p-1 text-sm"
          >
            <option value="created">Date Created</option>
            <option value="updated">Last Updated</option>
          </select>
        </div>

        <NotesList
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
          onSaveComplete={() => setSelectedNote(null)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
