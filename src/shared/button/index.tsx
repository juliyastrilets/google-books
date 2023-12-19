import styles from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...extendProps }: ButtonProps) => {
  return (
    <button {...extendProps} className={styles.button}>
      {children}
    </button>
  );
};
