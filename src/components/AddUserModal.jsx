import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setRows } from '../store/TableSlice';

function AddUserModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const { columns, rows } = useSelector((state) => state.table);

  const initialForm = columns.reduce((acc, col) => {
    acc[col.id] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newRow = {
      id: rows.length ? rows[rows.length - 1].id + 1 : 1,
      ...formData,
    };
    dispatch(setRows(newRow));
    handleClose();
    setFormData(initialForm);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {columns.map((col) => (
            <TextField
              key={col.id}
              label={col.label}
              name={col.id}
              value={formData[col.id] || ''}
              onChange={handleChange}
              fullWidth
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserModal;