import styles from "./styles.module.scss";
import { InputSearch } from "@/components/inputSearch";
import { BookList } from "@/components/bookList";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <section className={styles.search}>
        <InputSearch />
      </section>
      <section className={styles.books}>
        <BookList />
      </section>
    </div>
  );
}
