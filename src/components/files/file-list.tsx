import React, { useEffect } from 'react';
import { FileText, Download, Trash2 } from 'lucide-react';
import { useFileStore } from '../../store/files';
import { useAuthStore } from '../../store/auth';
import { Button } from '../ui/button';
import { formatFileSize } from '../../lib/utils';
import { getFiles, deleteFile, getFileUrl } from '../../lib/api';

export function FileList() {
  const { files, setFiles, removeFile } = useFileStore();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      getFiles(user.id)
        .then(setFiles)
        .catch(console.error);
    }
  }, [user, setFiles]);

  const handleDelete = async (fileId: string) => {
    if (!user) return;
    
    try {
      await deleteFile(fileId, user.id);
      removeFile(fileId);
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const handleDownload = (fileId: string) => {
    window.open(getFileUrl(fileId), '_blank');
  };

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border"
        >
          <div className="flex items-center space-x-4">
            <FileText className="h-8 w-8 text-blue-500" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">{file.name}</h4>
              <p className="text-sm text-gray-500">
                {formatFileSize(file.size)} • Uploaded on{' '}
                {new Date(file.uploadedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => handleDownload(file.id)}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(file.id)}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      ))}

      {files.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No files uploaded yet</p>
        </div>
      )}
    </div>
  );
}