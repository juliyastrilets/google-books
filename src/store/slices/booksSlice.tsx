import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export type Book = {
  id: string;
  title: string;
  imageSrc: string;
  authors: string[];
  categories: string[];
};

export type BooksOrder = "relevance" | "newest";
export type BooksFilter =
  | "all"
  | "partial"
  | "full"
  | "free-ebooks"
  | "paid-ebooks"
  | "ebooks";

interface BooksState {
  list: Book[];
  totalItems: number;
  message: string;
  isCanGetMore: boolean;
  isLoading: boolean;
  searchString: string;
  orderBy: BooksOrder;
  filter: BooksFilter;
}

const initialState: BooksState = {
  list: [],
  totalItems: 0,
  message: "",
  isCanGetMore: false,
  isLoading: false,
  searchString: "",
  orderBy: "relevance",
  filter: "all",
};

const getBooksDataByResponse = (items: any) => {
  return items?.map((book: any) => ({
    id: book.id,
    title: book.volumeInfo.title,
    imageSrc: book.volumeInfo.imageLinks?.thumbnail || "",
    authors: book.volumeInfo.authors,
    categories: book.volumeInfo.categories,
  }));
};

const fetchBooksFromGoogleApi = async (
  booksState: BooksState,
  refresh: boolean
) => {
  const apiUrl = "https://www.googleapis.com/books/v1/volumes";
  const searchString = `q=${booksState.searchString.toLocaleLowerCase()}`;
  const orderByString = `&orderBy=${booksState.orderBy}`;
  const startIndexString = `&startIndex=${
    refresh ? 0 : booksState.list.length
  }`;
  const maxResultsString = "&maxResults=30";
  const filterString =
    booksState.filter === "all" ? "" : `&filter=${booksState.filter}`;
  const keyString = "&key=AIzaSyAoB54OXtNnm5h-oZyus7Un1ipP7CXBsn4";

  const queryUrl = `${apiUrl}?${searchString}${orderByString}${filterString}${startIndexString}${maxResultsString}${keyString}`;
  const response = await fetch(queryUrl, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { getState }) => {
    const state = getState() as { books: BooksState };
    const data = await fetchBooksFromGoogleApi(state.books, true);
    return data;
  }
);

export const fetchBooksMore = createAsyncThunk(
  "books/fetchBooksMore",
  async (_, { getState }) => {
    const state = getState() as { books: BooksState };
    const data = await fetchBooksFromGoogleApi(state.books, false);
    return data;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSearchString(state, action) {
      state.searchString = action.payload;
    },
    setOrderBy(state, action) {
      state.orderBy = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.rejected, (state) => {
        state.isLoading = false;
        state.message = "Ошибка запроса на сервер";
      })
      .addCase(fetchBooks.pending, (state) => {
        state.message = "";
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<any>) => {
        if (action.payload.items?.length) {
          const books = getBooksDataByResponse(action.payload.items);
          state.list = books;
        } else {
          state.list = [];
          state.message = "По вашему запросу ничего не найдено";
        }
        state.totalItems = action.payload.totalItems;
        console.log(typeof state.totalItems);
        if (state.list.length < state.totalItems) {
          state.isCanGetMore = true;
        } else {
          state.isCanGetMore = false;
        }
        state.isLoading = false;
      })
      .addCase(fetchBooksMore.pending, (state) => {
        state.message = "";
        state.isLoading = true;
      })
      .addCase(
        fetchBooksMore.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload.items?.length) {
            const books = getBooksDataByResponse(action.payload.items);
            state.list.push(...books);
          } else {
            state.isCanGetMore = false;
          }
          state.isLoading = false;
        }
      );
  },
});

export const { setSearchString, setOrderBy, setFilter } = booksSlice.actions;
export default booksSlice.reducer;
