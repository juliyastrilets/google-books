/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";
import { Book } from "@/store/slices/booksSlice";

interface BookListItemProps {
  book: Book;
}

export const BookListItem = ({ book }: BookListItemProps) => {
  const computedCardImage = (imgSrc: string): string => {
    return imgSrc ? imgSrc : "image-not-found.jpg";
  };
  const computedAuthorsString = book.authors?.join(", ");
  const [computedCategory] = book.categories ? book.categories : [];

  return (
    <li className={styles.item} key={book.id}>
      <img
        className={styles.image}
        src={computedCardImage(book.imageSrc)}
        alt="book thumbnail"
      />
      <div className={styles.data}>
        <h3 className={styles.title} title={book.title}>
          {book.title}
        </h3>
        <p>{computedAuthorsString}</p>
        <p>{computedCategory}</p>
      </div>
    </li>
  );
};
