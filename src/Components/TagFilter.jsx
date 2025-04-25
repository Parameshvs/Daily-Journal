import React from 'react';

const TagFilter = ({ currentTag, tags, onTagSelect }) => {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      <button onClick={() => onTagSelect(null)} className={`px-3 py-1 rounded ${!currentTag ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All</button>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`px-3 py-1 rounded ${tag === currentTag ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
