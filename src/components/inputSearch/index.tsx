"use client";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchBooks, setSearchString } from "@/store/slices/booksSlice";
import { Button } from "@/shared/button";
import { Input } from "@/shared/input";

export const InputSearch = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useAppDispatch();
  const totalSearchItems = useAppSelector((state) => state.books.totalItems);
  const searchString = useAppSelector((state) => state.books.searchString);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(setSearchString(event.currentTarget.value));
  };
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(fetchBooks());
  };

  useEffect(() => {
    setIsButtonDisabled(!searchString);
  }, [searchString]);

  return (
    <>
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
      <p>Books found: {totalSearchItems}</p>
    </>
  );
};
