import styles from "./styles.module.scss";
import { InputSearch } from "@/components/inputSearch";
import { BooksList } from "@/components/booksList";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <section className={styles.search}>
        <InputSearch />
      </section>
      <section className={styles.books}>
        <BooksList />
      </section>
    </div>
  );
}
