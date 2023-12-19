import styles from "./styles.module.scss";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = ({ ...extendProps }: SelectProps) => {
  return <select {...extendProps} className={styles.select} />;
};
