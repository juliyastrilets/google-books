/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./styles.module.scss";
import { useAppSelector } from "@/store/hook";

export const BookList = () => {
  const books = useAppSelector((state) => state.books.list);
  const isLoadingBooks = useAppSelector((state) => state.books.isLoading);
  const fetchBooksError = useAppSelector((state) => state.books.error);

  return (
    <>
      {isLoadingBooks && <h2>Загрузка</h2>}
      {fetchBooksError && <h2>{fetchBooksError}</h2>}
      <ul className={styles.list}>
        {books.map((book) => (
          <li className={styles.item} key={book.id}>
            <img
              className={styles.image}
              src={book.imageSrc}
              alt="book thumbnail"
            />
            <div className={styles.data}>
              <h3 className={styles.title} title={book.title}>
                {book.title}
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
