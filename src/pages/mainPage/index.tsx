import styles from "./styles.module.css";
import { InputSearch } from "@/components/inputSearch";
import { BookList } from "@/components/bookList";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <InputSearch />
      <BookList />
    </div>
  );
}
