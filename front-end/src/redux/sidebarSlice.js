import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    isOpen: true,
};

// Sidebar slice
const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

// Export actions and reducer
export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
