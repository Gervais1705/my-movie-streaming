import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseApi } from "../../Commons/baseApi"
import { RootState } from "../store";

export const gettingShows = createAsyncThunk('/shows/gettingShows', async () => {
    const response = await baseApi.get('/movies', {
        headers: {
            Authorization: "Api-Key q3MNxtfep8Gt",
        },
    })
    return response.data;
});
export const gettingShowDetails = createAsyncThunk('/shows/getttingShowDetails', async (id: string) => {
    const response = await baseApi.get(`/movies/${id}`, {
        headers: {
            Authorization: "Api-Key q3MNxtfep8Gt",
        },
    })
    return response.data;
});

const initialState: { shows: [], showDetails: {} } = {
    shows: [],
    showDetails: {},
}

export const showSlice = createSlice({
    name: "shows",
    initialState,
    reducers: {
        removeDetails: (state) => {
            state.showDetails = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(gettingShows.pending, () => {
                console.log("show fetchingis pending");
            })
            .addCase(gettingShows.fulfilled, (state, { payload }) => {
                console.log("shows fetched successfully");
                return { ...state, shows: payload }
            })
            .addCase(gettingShows.rejected, () => {
                console.log("Data fetching failed");
            })
            .addCase(gettingShowDetails.fulfilled, (state, { payload }) => {
                console.log("shows fetched successfully");
                return { ...state, showDetails: payload }
            })
    }
});
export const { removeDetails } = showSlice.actions;
export const getAllShows = (state: RootState) => state.shows.shows;
export const getAllShowDetails = (state: RootState) => state.shows.showDetails;
export default showSlice.reducer;