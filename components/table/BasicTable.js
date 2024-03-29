'use client'
import MOCK_DATA from '@/data/MOCK_DATA.json'
import { useMemo } from 'react'
import { COLUMN, GROUPED_COLUMN } from './Columns'
import { useTable } from 'react-table'

export default function BasicTable() {
    const columns = useMemo(()=> COLUMN, [])
    const data = useMemo(()=> MOCK_DATA, [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data})
  return (
    <table {...getTableProps()} className="table-auto border-collapse w-full">
        <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-300">
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} className="px-4 py-2 text-left">
                            {column.render('Header')}
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
  )
}
