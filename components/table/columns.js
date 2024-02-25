import ColumnFilter from "./ColumnFilter"

export const COLUMN = [
    {
        Header: 'ID',
        Footer: 'ID',
        Filter: ColumnFilter,
        accessor: 'id'
    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        Filter: ColumnFilter,
        accessor: 'first_name'
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        Filter: ColumnFilter,
        accessor: 'last_name'
    },
    {
        Header: 'Email',
        Footer: 'Email',
        Filter: ColumnFilter,
        accessor: 'email'
    },
    {
        Header: 'Gender',
        Footer: 'Gender',
        Filter: ColumnFilter,
        accessor: 'gender'
    },
]

export const GROUPED_COLUMN = [
    {
        Header: 'ID',
        Footer: 'ID',
        Filter: ColumnFilter,
        accessor: 'id'
    },
    {
        Header: 'Name',
        Footer: 'Name',
        columns: [
            {
                Header: 'First Name',
                Footer: 'First Name',
                Filter: ColumnFilter,
                accessor: 'first_name'
            },
            {
                Header: 'Last Name',
                Footer: 'Last Name',
                Filter: ColumnFilter,
                accessor: 'last_name'
            },
        ]
    },
    {
        Header: 'Info',
        Footer: 'Info',
        columns: [
            {
                Header: 'Email',
                Footer: 'Email',
                Filter: ColumnFilter,
                accessor: 'email'
            },
            {
                Header: 'Gender',
                Footer: 'Gender',
                Filter: ColumnFilter,
                accessor: 'gender'
            },
        ]
    }
]