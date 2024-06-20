// @/src/services/querycompiler.ts
import fs from 'fs';
import path from 'path';

export const QueryCompiler = (tableName: string, folder?: string) => {
  let filePath = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', 'queries', `${tableName}.sql`);
  if (folder) {
    filePath = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', 'queries', folder, `${tableName}.sql`);
  }
  try {
    const sqlCommand = fs.readFileSync(filePath, 'utf-8');
    return sqlCommand;
  } catch (err) {
    console.error(`Error reading SQL file for ${tableName}:`, err?.toString().split('\n')[0]);
    throw err;
  }
};