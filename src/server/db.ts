import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database(join(process.cwd(), 'files.db'));

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS files (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    size INTEGER NOT NULL,
    type TEXT NOT NULL,
    uploadedAt DATETIME NOT NULL,
    userId TEXT NOT NULL,
    data BLOB NOT NULL
  );
`);

export { db };