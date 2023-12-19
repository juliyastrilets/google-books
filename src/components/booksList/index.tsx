"use client";
import styles from "./styles.module.scss";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { fetchBooksMore } from "@/store/slices/booksSlice";
import { BookListItem } from "./bookListItem";
import { Button } from "@/shared/button";
import { Loader } from "@/shared/loader";

export const BooksList = () => {
  const books = useAppSelector((state) => state.books.list);
  const isLoadingBooks = useAppSelector((state) => state.books.isLoading);
  const fetchBooksMessage = useAppSelector((state) => state.books.message);

  const dispatch = useAppDispatch();
  const isCanGetMore = useAppSelector((state) => state.books.isCanGetMore);

  const handleMoreBooksButtonClick = () => {
    dispatch(fetchBooksMore());
  };
  return (
    <>
      {fetchBooksMessage && (
        <h2 className={styles.message}>{fetchBooksMessage}</h2>
      )}
      <ul className={styles.list}>
        {books.map((book, idx) => (
          <BookListItem key={idx} book={book} />
        ))}
      </ul>
      {isCanGetMore && (
        <div className={styles.moreButton}>
          <Button onClick={handleMoreBooksButtonClick}>Load more</Button>
        </div>
      )}
      {isLoadingBooks && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
    </>
  );
};
