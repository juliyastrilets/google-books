import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type Book = {
  id: string;
  title: string;
  imageSrc: string;
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (searchString: string) => {
    const key = "AIzaSyAoB54OXtNnm5h-oZyus7Un1ipP7CXBsn4";
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchString}&key=${key}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  }
);

interface BooksState {
  list: Book[];
  error: string;
  isLoading: boolean;
}

const initialState: BooksState = {
  list: [],
  error: "",
  isLoading: false,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.rejected, (state) => {
        state.isLoading = false;
        state.error = "Ошибка запроса на сервер";
      })
      .addCase(fetchBooks.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<any>) => {
        if (action.payload.items?.length) {
          const books = action.payload.items?.map((book: any) => ({
            id: book.id,
            title: book.volumeInfo.title,
            imageSrc: book.volumeInfo.imageLinks?.thumbnail || "",
          }));
          state.list = books;
        } else {
          state.list = [];
          state.error = "По вашему запросу ничего не найдено";
        }
        state.isLoading = false;
      });
  },
});

export default booksSlice.reducer;
