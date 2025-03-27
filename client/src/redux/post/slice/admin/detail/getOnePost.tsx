import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SerializedError } from "@reduxjs/toolkit";
import { getOnePostThunk } from "src/redux/post/thunk/admin/detail/getOnePost";
import { Post } from "src/services/post/admin/types/getOnePost";

interface PostState {
   post: Post | null;
   status: "idle" | "loading" | "succeeded" | "failed";
   error: SerializedError | null;
}

const initialState: PostState = {
   post: null,
   status: "idle",
   error: null,
};

const getOnePostSlice = createSlice({
   name: "post/getone",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getOnePostThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
         })
         .addCase(getOnePostThunk.fulfilled, (state, action: PayloadAction<Post>) => {
            state.status = "succeeded";
            state.post = action.payload;
         })
         .addCase(
            getOnePostThunk.rejected,
            (state, action: PayloadAction<unknown, string, never, SerializedError>) => {
               state.status = "failed";
               state.error = action.error;
            }
         );
   },
});

export default getOnePostSlice.reducer;
