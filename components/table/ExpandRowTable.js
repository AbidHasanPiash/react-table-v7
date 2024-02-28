'use client'
import MOCK_DATA from '@/data/MOCK_DATA.json'
import MOCK_DATA_N from '@/data/MOCK_DATA_N.json'
import React, { useMemo, useState } from 'react'
import { COLUMN, GROUPED_COLUMN } from './Columns'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect, useExpanded } from 'react-table'
import GlobalFilter from './GlobalFilter'
import ColumnFilter from './ColumnFilter'
import Checkbox from './Checkbox'
import ColumnHideCheckbox from './ColumnHideCheckbox'

export default function ExpandRowTable() {
    const columns = useMemo(() => {
        const defaultColumns = COLUMN;
        const expandedColumn = {
            Header: () => null, // Hide header for expand button column
            id: 'expander', // Give it an id
            Cell: ({ row }) => (
                // Use row.isExpanded state to determine the button icon
                <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? '👇' : '👉'}</span>
            ),
        };
        return [
            expandedColumn,
            ...defaultColumns,
        ]; // Add the expanded column to the beginning of the array
    }, []);
    const data = useMemo(() => MOCK_DATA_N, []);

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
        selectedFlatRows,
        allColumns,
        getToggleHideAllColumnsProps,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                globalFilter: '',
                sortBy: [],
                pageIndex: 0,
                pageSize: 10,
                selectedRowIds: {}, // Initialize selectedRowIds in the state
            },
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        useExpanded, // Use useExpanded hook
        usePagination,
        useRowSelect, // Add useRowSelect hook
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => <Checkbox {...getToggleAllRowsSelectedProps()} />,
                        Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
                    },
                    ...columns,
                ];
            });
        }
    );
    
    const RenderRow = ({ row }) => {
        prepareRow(row);
        return (
            <>
                <tr {...row.getRowProps()} className="border-t border-gray-200 hover:bg-gray-100 even:bg-gray-50">
                    {row.cells.map((cell, index) => (
                        <td {...cell.getCellProps()} className="px-4 py-2">
                            {cell.render('Cell')}
                        </td>
                    ))}
                </tr>
                {/* Conditionally render expanded row */}
                {row.isExpanded && row.original.children.map((child, index) => (
                    <tr key={child.id} className="border border-gray-200 hover:bg-gray-100 even:bg-gray-50">
                        <td>{child.first_name}</td>
                        <td>{child.last_name}</td>
                        <td>{child.email}</td>
                        <td>{child.gender}</td>
                    </tr>
                ))}
            </>
        );
    };

    return (
        <div>
            <div className="flex items-center justify-between p-4">
                <ColumnHideCheckbox allColumns={allColumns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} />
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="w-fit py-2 pl-2 px-10 rounded-lg outline-none focus:bg-gray-100 ring-1 ring-gray-300 focus:ring-primary"
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <table {...getTableProps()} className="table-auto border-collapse w-full">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-300">
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-4 py-2 text-left">
                                    <div className="flex">
                                        <p className="flex items-center justify-start space-x-4">
                                            <span>{column.render('Header')}</span>
                                            <span>{column.isSorted ? (column.isSortedDesc ? '⬇️' : '⬆️') : ''}</span>
                                        </p>
                                        <div>{column.canFilter ? <ColumnFilter column={column} /> : null}</div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return <RenderRow key={row.id} row={row} />;
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map((footerGroup) => (
                        <tr {...footerGroup.getFooterGroupProps()} className="bg-gray-300 font-bold">
                            {footerGroup.headers.map((column) => (
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
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="border-y border-l border-blue-500 px-2 pt-0.5 disabled:text-gray-400">
                        Start
                    </button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="border-y border-l border-blue-500 px-2 pt-0.5 disabled:text-gray-400">
                        Previous
                    </button>
                    <span>
                        <input
                            type="number"
                            min="1"
                            max={pageCount - 1}
                            defaultValue={pageIndex + 1}
                            className="border bg-blue-500 border-blue-500 text-white px-2 pt-0.5 outline-none w-16 text-center"
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                            }}
                        />
                    </span>
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="border-y border-r border-blue-500 px-2 pt-0.5 disabled:text-gray-400">
                        Next
                    </button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="border-y border-r border-blue-500 px-2 pt-0.5 disabled:text-gray-400">
                        End
                    </button>
                </div>
            </div>
            {/* Code for display selected rows  */}
            <pre>
                <code>{JSON.stringify({ selectedID: selectedFlatRows.map((row) => row.original.id) }, null, 2)}</code>
            </pre>
        </div>
    );
}