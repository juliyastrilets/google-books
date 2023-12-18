"use client";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { fetchBooks } from "@/store/slices/booksSlice";

export const InputSearch = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(fetchBooks(inputValue));
  };

  useEffect(() => {
    setIsButtonDisabled(!inputValue);
  }, [inputValue]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="search"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        className={styles.button}
        type="submit"
        disabled={isButtonDisabled}
      >
        Search
      </button>
    </form>
  );
};
