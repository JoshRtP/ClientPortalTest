import { create } from 'zustand';
import type { File } from '../types/file';

interface FileState {
  files: File[];
  isUploading: boolean;
  uploadError: string | null;
  addFile: (file: File) => void;
  removeFile: (fileId: string) => void;
  setFiles: (files: File[]) => void;
  setUploading: (isUploading: boolean) => void;
  setUploadError: (error: string | null) => void;
}

export const useFileStore = create<FileState>((set) => ({
  files: [],
  isUploading: false,
  uploadError: null,
  addFile: (file) => set((state) => ({ files: [file, ...state.files] })),
  removeFile: (fileId) => set((state) => ({
    files: state.files.filter((file) => file.id !== fileId)
  })),
  setFiles: (files) => set({ files }),
  setUploading: (isUploading) => set({ isUploading }),
  setUploadError: (error) => set({ uploadError: error }),
}));