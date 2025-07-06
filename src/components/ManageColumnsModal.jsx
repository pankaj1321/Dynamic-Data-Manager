import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { ToogleColumn , addColumn } from '../store/TableSlice';

function ManageColumnsModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.table);
  const [newColumn, setNewColumn] = useState('');

  const handleToggle = (id) => {
    dispatch(ToogleColumn(id));
  };

  const handleAddColumn = () => {
    if (newColumn.trim()) {
      dispatch(addColumn(newColumn));
      setNewColumn('');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <FormGroup>
          {columns.map((col) => (
            <FormControlLabel
              key={col.id}
              control={
                <Checkbox
                  checked={col.visible}
                  onChange={() => handleToggle(col.id)}
                />
              }
              label={col.label}
            />
          ))}
        </FormGroup>
        <TextField
          fullWidth
          label="Add New Column"
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button variant="contained" onClick={handleAddColumn}>
          Add Column
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ManageColumnsModal;


