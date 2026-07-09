"use client";

import css from "./Notes.module.css";

interface ErrorPageProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return <div className={css.app}>
  <p>Could not fetch the list of notes. {error.message}</p>
  </div>;
}
