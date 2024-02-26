'use client'
import MOCK_DATA from '@/data/MOCK_DATA.json'
import { useMemo } from 'react'
import { COLUMN, GROUPED_COLUMN } from './Columns'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect } from 'react-table'
import GlobalFilter from './GlobalFilter'
import ColumnFilter from './ColumnFilter'
import Checkbox from './Checkbox'

export default function RowSelectionTable() {
    const columns = useMemo(()=> COLUMN, [])
    const data = useMemo(()=> MOCK_DATA, [])
    const defaultColumn = useMemo(()=>{
        return{ Filter: ColumnFilter },[]}
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        gotoPage,
        pageCount,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize,
        prepareRow,
        state: { globalFilter, pageIndex, pageSize },
        setGlobalFilter,
        selectedFlatRows
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: {
                globalFilter: '',
                sortBy: [],
                pageIndex: 0,
                pageSize: 10,
            },
    },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns,
                ];
            });
        }
    );
  return (
    <div>
        <div className='flex items-center justify-between p-4'>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
            <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className='w-fit py-2 pl-2 px-10 rounded-lg outline-none focus:bg-gray-100 ring-1 ring-gray-300 focus:ring-primary'
            >
            {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                Show {pageSize}
                </option>
            ))}
            </select>
        </div>
        <table {...getTableProps()} className="table-auto border-collapse w-full">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-300">
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-4 py-2 text-left">
                                <div className='flex'>
                                    <p className='flex items-center justify-start space-x-4'>
                                        <span>{column.render('Header')}</span>
                                        <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? '⬇️' : '⬆️'
                                        ) : ''}
                                        </span>
                                    </p>
                                    <div>{column.canFilter ? <ColumnFilter column={column}/> : null}</div>
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map(row => {
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
        {/* pagination */}
        <div className="m-4 flex justify-between items-center">
            <div>
                <span>
                    Showing{' '}
                    <strong>
                    {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
            </div>
            <div>
                <button 
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    className='border-y border-l border-blue-500 px-2 pt-0.5 disabled:text-gray-400'
                >
                    Start
                </button>
                <button 
                    onClick={() => previousPage()} 
                    disabled={!canPreviousPage}
                    className='border-y border-l border-blue-500 px-2 pt-0.5 disabled:text-gray-400'
                >
                    Previous
                </button>
                <span>
                    <input
                    type="number"
                    min="1" 
                    max={pageCount-1}
                    defaultValue={pageIndex + 1}
                    className='border bg-blue-500 border-blue-500 text-white px-2 pt-0.5 outline-none w-16 text-center'
                    onChange={(e) => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        gotoPage(page);
                    }}
                    />
                </span>
                <button 
                    onClick={() => nextPage()} 
                    // disabled={pageIndex === page.length - 1}
                    disabled={!canNextPage}
                    className='border-y border-r border-blue-500 px-2 pt-0.5 disabled:text-gray-400'
                >
                    Next
                </button>
                <button 
                    onClick={() => gotoPage(pageCount-1)}
                    disabled={!canNextPage}
                    className='border-y border-r border-blue-500 px-2 pt-0.5 disabled:text-gray-400'
                >
                    End
                </button>
            </div>
        </div>
        <pre>
            <code>
                {JSON.stringify(
                    {
                        selectedID: selectedFlatRows.map(row=>row.original.id),
                    },
                    null,
                    2
                )}
            </code>
        </pre>
    </div>
    )
}
