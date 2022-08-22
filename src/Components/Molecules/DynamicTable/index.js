import React from 'react'
import { useTable } from 'react-table'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const setColumnWidth = (column) => {
    if (column === "control") {
        return "5%";
    } else if (column === "file") {
        return "20%";
    } else if (column === "line") {
        return "10%";
    } else {
        return "65%";
    }
};

function DynamicTable({ columns, data, updateData, deleteData, addData, selectOptions }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
        updateData,
        deleteData,
        addData,
        selectOptions
    })

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" {...getTableProps()}>
                <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableCell sx={{ width: setColumnWidth(column.id) }} {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                        ))}
                    </TableRow>
                ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <TableRow {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <TableCell sx={{ width: setColumnWidth(cell.column.id) }} {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                            })}
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DynamicTable;