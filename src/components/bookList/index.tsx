/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./styles.module.scss";
import { useAppSelector } from "@/store/hook";
import { BookListItem } from "./bookListItem";

export const BookList = () => {
  const books = useAppSelector((state) => state.books.list);
  const isLoadingBooks = useAppSelector((state) => state.books.isLoading);
  const fetchBooksMessage = useAppSelector((state) => state.books.message);

  return (
    <>
      {isLoadingBooks && <h2>Загрузка</h2>}
      {fetchBooksMessage && <h2>{fetchBooksMessage}</h2>}
      <ul className={styles.list}>
        {books.map((book, idx) => (
          <BookListItem key={idx} book={book} />
        ))}
      </ul>
    </>
  );
};
