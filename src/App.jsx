import { Container, Typography, Button, Stack } from '@mui/material';
import DataTable from './components/DataTable';
import ManageColumnsModal from './components/ManageColumnsModal';
import AddUserModal from './components/AddUserModal';
import { useState } from 'react';
import ImportExportCsv from './components/ImportExportCsv';

function App() {
  const [openColumns, setOpenColumns] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Dynamic Data Table Manager
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setOpenAddUser(true)}>
          Add User
        </Button>
        <Button variant="outlined" onClick={() => setOpenColumns(true)}>
          Manage Columns
        </Button>
      </Stack>
      <DataTable />
        <ImportExportCsv />
      <ManageColumnsModal open={openColumns} handleClose={() => setOpenColumns(false)} />
      <AddUserModal open={openAddUser} handleClose={() => setOpenAddUser(false)} />
    </Container>
  );
}

export default App;

