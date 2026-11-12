import axios from "axios";

const noteApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

import type { Note, NoteTag } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export const fetchNotes = async ({
  page,
  perPage,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await noteApi.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
    },
  });

  return response.data;
};

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response = await noteApi.post<Note>("/notes", noteData);

  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await noteApi.delete<Note>(`/notes/${noteId}`);

  return response.data;
};
