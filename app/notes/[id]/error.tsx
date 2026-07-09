"use client";

import css from "./NoteDetails.module.css";

interface ErrorPageProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <p>Could not fetch note details. {error.message}</p>
      </div>
    </main>
  );
}
