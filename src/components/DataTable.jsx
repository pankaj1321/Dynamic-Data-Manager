import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, setDeleteRow } from '../store/TableSlice';

function DataTable() {
  const dispatch = useDispatch();
  const { columns, rows, searchQuery } = useSelector((state) => state.table);

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [visibleColumns, setVisibleColumns] = useState(columns);

  // Persist visible columns to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('visibleColumns');
    if (saved) {
      const savedIds = JSON.parse(saved);
      const updated = columns.map(col => ({
        ...col,
        visible: savedIds.includes(col.id)
      }));
      setVisibleColumns(updated);
    } else {
      setVisibleColumns(columns);
    }
  }, [columns]);

  useEffect(() => {
    const activeIds = columns.filter(col => col.visible).map(col => col.id);
    localStorage.setItem('visibleColumns', JSON.stringify(activeIds));
  }, [columns]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSort = (columnId) => {
    const isAsc = sortColumn === columnId && sortDirection === 'asc';
    setSortColumn(columnId);
    setSortDirection(isAsc ? 'desc' : 'asc');
  };

  const filteredRows = rows.filter((row) =>
    visibleColumns.some((col) =>
      col.visible &&
      row[col.id]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn]?.toString().toLowerCase() || '';
    const bVal = b[sortColumn]?.toString().toLowerCase() || '';
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Search"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.filter(col => col.visible).map((col) => (
                <TableCell key={col.id}>
                  <TableSortLabel
                    active={sortColumn === col.id}
                    direction={sortColumn === col.id ? sortDirection : 'asc'}
                    onClick={() => handleSort(col.id)}
                    hideSortIcon={false}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                {visibleColumns.filter(col => col.visible).map((col) => (
                  <TableCell key={col.id}>{row[col.id]}</TableCell>
                ))}
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => dispatch(setDeleteRow(row.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </TableContainer>
    </>
  );
}

export default DataTable;

