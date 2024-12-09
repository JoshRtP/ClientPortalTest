export async function uploadFile(file: File, userId: string): Promise<{ id: string; name: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:3001/api/files', {
    method: 'POST',
    headers: {
      'x-user-id': userId,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  return response.json();
}

export async function getFiles(userId: string) {
  const response = await fetch('http://localhost:3001/api/files', {
    headers: {
      'x-user-id': userId,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch files');
  }

  return response.json();
}

export async function deleteFile(fileId: string, userId: string) {
  const response = await fetch(`http://localhost:3001/api/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      'x-user-id': userId,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete file');
  }

  return response.json();
}

export function getFileUrl(fileId: string) {
  return `http://localhost:3001/api/files/${fileId}`;
}