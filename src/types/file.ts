import { User } from './auth';

export interface File {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  uploadedBy: User;
  url: string;
}

export interface FileUploadResponse {
  id: string;
  url: string;
}