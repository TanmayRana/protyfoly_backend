/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AboutService } from "./aboutService";

/* ---------- Types ---------- */
export interface Passion {
  _id?: string;
  title: string;
  description: string;
  icon: string;
}

interface AboutState {
  story: string;
  passions: Passion[];
  loading: boolean;
  error: string | null;
}

/* ---------- Initial State ---------- */
const initialState: AboutState = {
  story: "",
  passions: [],
  loading: false,
  error: null,
};

/* ---------- Async Thunks ---------- */
export const fetchAbout = createAsyncThunk(
  "about/fetchAbout",
  async (_, thunkAPI) => {
    try {
      const res = await AboutService.getAbout();
      return res.about?.story || "";
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch about");
    }
  }
);

export const updateAbout = createAsyncThunk(
  "about/updateAbout",
  async (story: string, thunkAPI) => {
    try {
      const res = await AboutService.updateAbout({ story });
      return res.updated?.story || story;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update about"
      );
    }
  }
);

export const fetchPassions = createAsyncThunk(
  "about/fetchPassions",
  async (_, thunkAPI) => {
    try {
      const res = await AboutService.getPassions();
      return res.passions || [];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch passions"
      );
    }
  }
);

export const createPassion = createAsyncThunk(
  "about/createPassion",
  async (data: Passion, thunkAPI) => {
    try {
      const res = await AboutService.createPassion(data);
      return res.newPassion;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to create passion"
      );
    }
  }
);

export const updatePassion = createAsyncThunk(
  "about/updatePassion",
  async ({ id, data }: { id: string; data: Passion }, thunkAPI) => {
    try {
      const res = await AboutService.updatePassion(id, data);
      return res.updatedPassion;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update passion"
      );
    }
  }
);

export const deletePassion = createAsyncThunk(
  "about/deletePassion",
  async (id: string, thunkAPI) => {
    try {
      await AboutService.deletePassion(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to delete passion"
      );
    }
  }
);

/* ---------- Slice ---------- */
const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setStory(state, action: PayloadAction<string>) {
      state.story = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch About
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.story = action.payload;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update About
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.story = action.payload;
      })

      // Fetch Passions
      .addCase(fetchPassions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPassions.fulfilled, (state, action) => {
        state.loading = false;
        state.passions = action.payload;
      })
      .addCase(fetchPassions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Passion
      .addCase(createPassion.fulfilled, (state, action) => {
        state.passions.push(action.payload);
      })

      // Update Passion
      .addCase(updatePassion.fulfilled, (state, action) => {
        const index = state.passions.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.passions[index] = action.payload;
        }
      })

      // Delete Passion
      .addCase(deletePassion.fulfilled, (state, action) => {
        state.passions = state.passions.filter((p) => p._id !== action.payload);
      });
  },
});

export const { setStory } = aboutSlice.actions;
export default aboutSlice.reducer;
