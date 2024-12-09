import React, { useState } from 'react';
import { FileText, MessageSquare, Upload, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuthStore } from '../../store/auth';
import { FileUpload } from '../files/file-upload';
import { FileList } from '../files/file-list';
import { ChatInterface } from '../chat/chat-interface';

export function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const [activeView, setActiveView] = useState<'files' | 'upload' | 'chat' | null>(null);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h2>
        <p className="mt-2 text-sm text-gray-600">
          Manage your files and access the AI chatbot from your personal dashboard.
        </p>
      </div>

      {!activeView && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <Upload className="h-8 w-8 text-blue-500" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Upload Files</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Securely upload and organize your documents
            </p>
            <Button className="mt-4" onClick={() => setActiveView('upload')}>
              Upload New File
            </Button>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">My Files</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Access and manage your uploaded files
            </p>
            <Button
              className="mt-4"
              variant="secondary"
              onClick={() => setActiveView('files')}
            >
              View Files
            </Button>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">AI Chat</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Chat with AI about your documents
            </p>
            <Button
              className="mt-4"
              variant="secondary"
              onClick={() => setActiveView('chat')}
            >
              Start Chat
            </Button>
          </div>
        </div>
      )}

      {activeView && (
        <div className="bg-white rounded-lg border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {activeView === 'upload' && 'Upload Files'}
              {activeView === 'files' && 'My Files'}
              {activeView === 'chat' && 'AI Chat'}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveView(null)}
              className="text-gray-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {activeView === 'upload' && <FileUpload />}
          {activeView === 'files' && <FileList />}
          {activeView === 'chat' && <ChatInterface />}
        </div>
      )}
    </div>
  );
}