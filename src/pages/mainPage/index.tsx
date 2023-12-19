"use client";
import styles from "./styles.module.scss";
import { Button } from "@/shared/button";
import { InputSearch } from "@/components/inputSearch";
import { BookList } from "@/components/bookList";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchBooksMore } from "@/store/slices/booksSlice";

export default function MainPage() {
  const dispatch = useAppDispatch();
  const isCanGetMore = useAppSelector((state) => state.books.isCanGetMore);

  const handleMoreBooksButtonClick = () => {
    dispatch(fetchBooksMore());
  };

  return (
    <div className={styles.container}>
      <section className={styles.search}>
        <InputSearch />
      </section>
      <section>
        <div className={styles.books}>
          <BookList />
        </div>
        {isCanGetMore && (
          <div className={styles.moreButton}>
            <Button onClick={handleMoreBooksButtonClick}>Load more</Button>
          </div>
        )}
      </section>
    </div>
  );
}
