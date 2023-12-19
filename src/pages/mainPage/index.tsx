import styles from "./styles.module.scss";
import { InputSearch } from "@/components/inputSearch";
import { BooksList } from "@/components/booksList";
import { Filters } from "@/components/filters";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <section className={styles.filters}>
        <Filters />
      </section>
      <section className={styles.search}>
        <InputSearch />
      </section>
      <section className={styles.books}>
        <BooksList />
      </section>
    </div>
  );
}
