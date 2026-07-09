import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  children: React.ReactChild;
}

export default function ErrorMessage({children}:ErrorMessageProps) {
  return <p className={css.text}>{children}</p>;
}
