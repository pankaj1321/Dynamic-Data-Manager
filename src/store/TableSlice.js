import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    columns: [
        { id: 'name', label: 'Name', visible: true },
        { id: 'email', label: 'Email', visible: true },
        { id: 'age', label: 'Age', visible: true },
        { id: 'role', label: 'Role', visible: true },
    ],
    rows: [
        { id: 1, name: 'Pankaj', email: 'pankaj@gmail.com', age: 25, role: 'Admin' },
        { id: 2, name: 'Ravi', email: 'ravi@yahoo.com', age: 30, role: 'User' },
        { id: 3, name: 'Anita', email: 'anita@gmail.com', age: 22, role: 'Editor' },
    ],
    searchQuery: "",

}
const TableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },

        setRows: (state, action) => {
            state.rows.push(action.payload);
        },

        setDeleteRow: (state, action) => {
            state.rows = state.rows.filter((row) => row.id !== action.payload);
        },

        ToogleColumn: (state, action) => {
            const columnbox = state.columns.find((column) => column.id === action.payload);
            if (columnbox) {
                columnbox.visible = !columnbox.visible
            }
        },
        addColumn(state, action) {
            const newId = action.payload.trim().toLowerCase().replace(/\s+/g, '_');
            const label = action.payload.trim();
            if (!newId) return;

      const exists = state.columns.find(col => col.id === newId);
      if (exists) return; 

      
      state.columns.push({ id: newId, label, visible: true });
      state.rows = state.rows.map(row => ({
        ...row,
        [newId]: ''
      }));
    },
    }
});
export const { setSearchQuery, setRows, setDeleteRow, ToogleColumn, addColumn } = TableSlice.actions;
export default TableSlice.reducer;