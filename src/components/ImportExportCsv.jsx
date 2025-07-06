import React, { useRef } from 'react';
import { Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { setRows } from '../store/TableSlice';

function ImportExportControls() {
  const dispatch = useDispatch();
  const { rows } = useSelector((state) => state.table);
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'table-data.csv');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      alert('❌ Please upload a valid .csv file');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          alert('❌ The CSV file is empty or invalid.');
          return;
        }

        const valid = Object.keys(results.data[0]).length > 0;
        if (!valid) {
          alert('❌ Invalid CSV structure. Missing headers.');
          return;
        }

        results.data.forEach((row, index) => {
          dispatch(setRows({ id: Date.now() + index, ...row }));
        });
      },
      error: (err) => {
        alert('❌ Failed to parse CSV file: ' + err.message);
      },
    });
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <Button variant="outlined" onClick={handleExport}>
        Export CSV
      </Button>
      <Button variant="contained" onClick={() => fileInputRef.current.click()}>
        Import CSV
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        style={{ display: 'none' }}
        onChange={handleImport}
      />
    </Stack>
  );
}

export default ImportExportControls;

