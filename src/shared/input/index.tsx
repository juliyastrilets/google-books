import styles from "./styles.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...extendProps }: InputProps) => {
  return <input {...extendProps} className={styles.input} />;
};
