import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { useFileStore } from '../../store/files';
import { useAuthStore } from '../../store/auth';
import { Button } from '../ui/button';
import { uploadFile } from '../../lib/api';

export function FileUpload() {
  const { isUploading, uploadError, setUploading, setUploadError, addFile } = useFileStore();
  const user = useAuthStore((state) => state.user);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    setUploadError(null);

    try {
      const result = await uploadFile(file, user.id);
      
      const newFile = {
        id: result.id,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        uploadedBy: user,
        url: `/api/files/${result.id}`,
      };

      addFile(newFile);
    } catch (error) {
      setUploadError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [addFile, setUploading, setUploadError, user]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 10MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            disabled={isUploading}
          />
        </label>
      </div>

      {isUploading && (
        <div className="text-center">
          <p className="text-sm text-gray-600">Uploading file...</p>
        </div>
      )}

      {uploadError && (
        <div className="flex items-center gap-2 text-red-500 bg-red-50 p-2 rounded">
          <X className="h-4 w-4" />
          <p className="text-sm">{uploadError}</p>
        </div>
      )}
    </div>
  );
}