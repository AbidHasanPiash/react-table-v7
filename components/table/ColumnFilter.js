import React from 'react'

export default function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column
  return (
    <input
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Self Search"
        className="w-fit py-2 pl-2 rounded-lg outline-none focus:bg-gray-100 ring-1 ring-gray-300 focus:ring-primary"
    />
  )
}
