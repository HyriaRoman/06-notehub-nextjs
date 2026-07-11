import css from "./SearchBox.module.css";

interface SearchBoxProps {
  query: string;
  onQueryUpdate: (query: string) => void;
}

export default function SearchBox({ query, onQueryUpdate }: SearchBoxProps) {
  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const data: string = ev.target.value;
    onQueryUpdate(data);
  }

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={query}
      onChange={handleChange}
    />
  );
}
