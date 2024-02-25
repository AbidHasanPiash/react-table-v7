'use client'
import MOCK_DATA from '@/data/MOCK_DATA.json'
import { useMemo } from 'react'
import { COLUMN, GROUPED_COLUMN } from './Columns'
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'
import GlobalFilter from './GlobalFilter'

export default function FilteredTable() {
    const columns = useMemo(()=> COLUMN, [])
    const data = useMemo(()=> MOCK_DATA, [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state: { globalFilter },
        setGlobalFilter,
    } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);
  return (
    <div>
        <div className='flex items-center justify-between p-4'>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
            {/* <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className='w-fit py-2 pl-2 px-10 rounded-lg outline-none focus:bg-gray-100 ring-1 ring-gray-300 focus:ring-primary'
            >
            {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                Show {pageSize}
                </option>
            ))}
            </select> */}
        </div>
        <table {...getTableProps()} className="table-auto border-collapse w-full">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-300">
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-4 py-2 text-left">
                                <p className='flex items-center justify-start space-x-4'>
                                    <span>{column.render('Header')}</span>
                                    <span>
                                    {column.isSorted ? (
                                        column.isSortedDesc ? '⬇️' : '⬆️'
                                    ) : ''}
                                    </span>
                                </p>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} className="border-t border-gray-200 hover:bg-gray-100 even:bg-gray-50">
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()} className="px-4 py-2">
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                {footerGroups.map(footerGroup=>(
                    <tr {...footerGroup.getFooterGroupProps()} className="bg-gray-300 font-bold">
                        {footerGroup.headers.map(column=>(
                            <td {...column.getFooterProps()} className="px-4 py-2 text-left">
                                {column.render('Footer')}
                            </td>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
    </div>
    )
}
