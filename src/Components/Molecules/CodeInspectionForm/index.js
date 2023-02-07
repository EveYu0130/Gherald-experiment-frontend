import React, { useState, useEffect, useMemo } from 'react';
import {AppBar, Box, TextField, Toolbar, Typography, MenuItem, Select, IconButton, TableCell, Button} from '@mui/material';
import DynamicTable from "../DynamicTable";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useTranslation } from 'react-i18next';


const AddButton = props => {
    // console.log("AddButton", props);
    const { addData } = props;
    return (
        <IconButton aria-label="delete" size="small" onClick={addData}>
            <AddCircleOutlineIcon />
        </IconButton>
    );
};

const DeleteButton = props => {
    // console.log("DeleteButton", props);
    const { row, deleteData } = props;
    const onDelete = e => {
        e.preventDefault();
        deleteData(row.index)
    }
    return (
        <IconButton aria-label="delete" size="small" onClick={onDelete}>
            <RemoveCircleOutlineIcon />
        </IconButton>
    );
};

const TableSelectInput = props => {
    // console.log("TableInput", props);
    const { column, row, cell, updateData, selectOptions } = props;
    const onChange = e => updateData(row.index, column.id, e.target.value);
    return (<Select
        labelId="simple-select-label"
        id="simple-select"
        value={cell.value || ""}
        label="File"
        onChange={onChange}
        fullWidth
        sx={{ fontSize: 12 }}
    >
        {selectOptions.map((file, index) => (
            <MenuItem key={'file-' + index} value={file}>{file}</MenuItem>
        ))}
    </Select>);
};

const TableInputLine = props => {
    // console.log("TableInput", props);
    const { column, row, cell, updateData } = props;
    const onChange = e => updateData(row.index, column.id, e.target.value);
    return <TextField variant="outlined"
                      type="number"
                      value={cell.value || ""}
                      onChange={onChange}
                      fullWidth
                      multiline
                      InputProps={{ style: { fontSize: 12 } }}
                      error={!!cell.value && !parseInt(cell.value)}
                      helperText={!!cell.value && !parseInt(cell.value) ? "Must be a number" : ""}/>;
};

const TableInputComment = props => {
    // console.log("TableInput", props);
    const { column, row, cell, updateData } = props;
    const onChange = e => updateData(row.index, column.id, e.target.value);
    return <TextField variant="outlined" value={cell.value || ""} onChange={onChange} fullWidth multiline InputProps={{ style: { fontSize: 12 } }} />;
    // return <input type="number" value={cell.value} onChange={onChange} />;
};

function CodeInspectionForm({ data, updateData, deleteData, addData, selectOptions }) {
    const { t } = useTranslation();

    const columns = useMemo(
        () => [
            {
                Header: AddButton,
                accessor: "control",
                Cell: DeleteButton
            },
            {
                Header: "File",
                accessor: "file",
                Cell: TableSelectInput
            },
            {
                Header: "Line",
                accessor: "line",
                Cell: TableInputLine
            },
            {
                Header: "Comment",
                accessor: "comment",
                Cell: TableInputComment
            }
        ],
        []
    );

    return (
        <Box sx={{ width: '100%', px: '1%', py: '4%'}}>
            <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                <AppBar position="static" color='transparent' sx={{ bgcolor: 'secondary.main' }}>
                    <Toolbar>
                        <Typography component="div" sx={{ width: '100%', flexShrink: 0, fontWeight: 'Medium' }}>
                            {t('code_inspection_form')}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <DynamicTable columns={columns} data={data} updateData={updateData} deleteData={deleteData} addData={addData} selectOptions={selectOptions}/>
        </Box>
    )


}
export default CodeInspectionForm;
