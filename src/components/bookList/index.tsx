/* eslint-disable @next/next/no-img-element */
"use client";
import { useAppSelector } from "@/store/hook";

export const BookList = () => {
  const books = useAppSelector((state) => state.books.list);
  const isLoadingBooks = useAppSelector((state) => state.books.isLoading);
  const fetchBooksError = useAppSelector((state) => state.books.error);
  return (
    <>
      {isLoadingBooks && <h2>Загрузка</h2>}
      {fetchBooksError && <h2>{fetchBooksError}</h2>}
      {books.map((book) => (
        <div key={book.id}>
          <h1>{book.title}</h1>
          <img src={book.imageSrc} alt="book thumbnail" />
        </div>
      ))}
    </>
  );
};
