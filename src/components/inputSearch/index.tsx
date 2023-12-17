"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export const InputSearch = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    setIsButtonDisabled(!inputValue);
  }, [inputValue]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="text"
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
