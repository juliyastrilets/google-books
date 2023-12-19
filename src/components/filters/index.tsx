"use client";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchBooks, setOrderBy, setFilter } from "@/store/slices/booksSlice";
import { Select } from "@/shared/select";
import { OrderFilters, TypeFilters } from "./model";

export const Filters = () => {
  const dispatch = useAppDispatch();
  const orderBy = useAppSelector((state) => state.books.orderBy);
  const filter = useAppSelector((state) => state.books.filter);
  const searchString = useAppSelector((state) => state.books.searchString);

  const dispatchFetchBooks = () => {
    if (searchString) {
      dispatch(fetchBooks());
    }
  };

  const handleOrderSelectChange = (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    dispatch(setOrderBy(event.currentTarget.value));
    dispatchFetchBooks();
  };
  const handleFilterSelectChange = (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    dispatch(setFilter(event.currentTarget.value));
    dispatchFetchBooks();
  };

  return (
    <div className={styles.filters}>
      <Select value={orderBy} onChange={handleOrderSelectChange}>
        {OrderFilters.map((filter, idx) => (
          <option key={idx} value={filter}>
            {filter}
          </option>
        ))}
      </Select>
      <Select value={filter} onChange={handleFilterSelectChange}>
        {TypeFilters.map((filter, idx) => (
          <option key={idx} value={filter}>
            {filter}
          </option>
        ))}
      </Select>
    </div>
  );
};
