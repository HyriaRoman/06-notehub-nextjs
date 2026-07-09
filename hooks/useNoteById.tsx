import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api";
import type { Note, NoteId } from "@/types/note";

interface NoteById {
  note: Note | null;
  isLoading: boolean;
  isError: boolean;
}

export default function useNoteById(id: NoteId): NoteById {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      return await fetchNoteById(id);
    },
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
  });

  return {
    note: data || null,
    isLoading,
    isError,
  };
}
