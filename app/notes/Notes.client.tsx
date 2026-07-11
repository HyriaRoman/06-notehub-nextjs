"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

import css from "./Notes.module.css";

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export default function Notes() {
  const [query, setQuery] = useState<string>("");
  const [page, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ["notes", query, page],
    queryFn: async () => {
      return await fetchNotes(query, page);
    },
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
  });

  const handleQueryUpdate = useDebouncedCallback(
    (newQuery: string) => {
      setQuery(newQuery);
      setCurrentPage(1);
    },
    250,
  );

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={query} onQueryUpdate={handleQueryUpdate} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage>Something went wrong</ErrorMessage>}
      {data && data.notes?.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm
            onCancel={() => setModalOpen(false)}
            onSuccess={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
