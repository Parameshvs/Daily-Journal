import React from 'react';

const DateFilter = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <div className="mb-4 space-y-2">
      <label className="block text-sm font-medium">Filter by Date Range:</label>
      <div className="flex gap-2">
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
};

export default DateFilter;
