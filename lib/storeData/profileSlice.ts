/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

const initialState = {
  name: "",
  title: "",
  tagline: "",
  profileImage: "",
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const getProfileData = createAsyncThunk(
  "profile/getProfileData",
  async (_, thunkAPI) => {
    try {
      return await profileService.profileGet();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to fetch profile data"
      );
    }
  }
);

export const updateProfileData = createAsyncThunk(
  "profile/updateProfileData",
  async (
    data: {
      name: string;
      title: string;
      tagline: string;
      profileImage: string;
    },
    thunkAPI
  ) => {
    console.log("Data in updateProfileData", data);
    try {
      return await profileService.profileUpdate(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to update profile data"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      const { name, title, tagline, profileImage } = action.payload;
      state.name = name;
      state.title = title;
      state.tagline = tagline;
      state.profileImage = profileImage;
    },
    resetProfileData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        const { name, title, tagline, profileImage } = action.payload;
        state.name = name;
        state.title = title;
        state.tagline = tagline;
        state.profileImage = profileImage;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      })
      // POST
      .addCase(updateProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        const { name, title, tagline, profileImage } = action.payload;
        state.name = name;
        state.title = title;
        state.tagline = tagline;
        state.profileImage = profileImage;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { setProfileData, resetProfileData } = profileSlice.actions;
export default profileSlice.reducer;
