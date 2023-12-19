"use client";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  fetchBooks,
  setSearchString,
  setOrderBy,
  setFilter,
} from "@/store/slices/booksSlice";
import { Button } from "@/shared/button";
import { Input } from "@/shared/input";
import { BooksOrder, BooksFilter } from "@/store/slices/booksSlice";
import { Select } from "@/shared/select";

export const InputSearch = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useAppDispatch();
  const orderBy = useAppSelector((state) => state.books.orderBy);
  const filter = useAppSelector((state) => state.books.filter);
  const totalSearchItems = useAppSelector((state) => state.books.totalItems);
  const searchString = useAppSelector((state) => state.books.searchString);

  const dispatchFetchBooks = () => {
    if (searchString) {
      dispatch(fetchBooks());
    }
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(setSearchString(event.currentTarget.value));
  };
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(fetchBooks());
  };
  const handleOrderSelectChange = (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    dispatch(setOrderBy(event.currentTarget.value as BooksOrder));
    dispatchFetchBooks();
  };
  const handleFilterSelectChange = (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    dispatch(setFilter(event.currentTarget.value as BooksFilter));
    dispatchFetchBooks();
  };

  useEffect(() => {
    setIsButtonDisabled(!searchString);
  }, [searchString]);

  return (
    <>
      <div className={styles.filters}>
        <Select value={orderBy} onChange={handleOrderSelectChange}>
          <option value="relevance">relevance</option>
          <option value="newest">newest</option>
        </Select>
        <Select value={filter} onChange={handleFilterSelectChange}>
          <option value="all">all</option>
          <option value="partial">partial</option>
          <option value="full">full</option>
          <option value="free-ebooks">free-ebooks</option>
          <option value="paid-ebooks">paid-ebooks</option>
          <option value="ebooks">ebooks</option>
        </Select>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="search"
          value={searchString}
          onChange={handleInputChange}
        />
        <Button type="submit" disabled={isButtonDisabled}>
          Search
        </Button>
      </form>
      {Boolean(totalSearchItems) && (
        <p className={styles.caption}>Books found: {totalSearchItems}</p>
      )}
    </>
  );
};
