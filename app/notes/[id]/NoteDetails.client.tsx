"use client";

import { useParams } from "next/navigation";

import useNoteById from "@/hooks/useNoteById";
import type { Note } from "@/types/note";

import css from "./NoteDetails.module.css";

function parseDate(note: Note): string {
  if (note.updatedAt) {
    const date = new Date(note.updatedAt);
    return `Updated at ${date.toLocaleString()}`;
  } else {
    const date = new Date(note.createdAt);
    return `Created at ${date.toLocaleString()}`;
  }
}

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const { note, isLoading, isError } = useNoteById(id);

  return (
    <main className={css.main}>
      <div className={css.container}>
        {isLoading && <p>Loading, please wait...</p>}
        {isError && <p>Error! Try reloading...</p>}
        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{parseDate(note)}</p>
          </div>
        )}
      </div>
    </main>
  );
}
