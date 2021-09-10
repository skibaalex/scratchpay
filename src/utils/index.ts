/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/extensions
import { DATA_PATH } from '../config';

/**
 * Check if a directory data exists if not creates one
 * this method is used to make sure that the write method won't fail
 * @param dir base directory
 */
export const dirHandler = () => {
  if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH, { recursive: true });
  }
};

/**
 * Function that saves string into a file in the ./data directory
 * @param data any data in a string format
 * @param fileName files name
 * @param cb callback function
 */
export const writeFile = (data:string, fileName:string, cb:Function) => {
  const PATH = path.join(DATA_PATH, fileName);
  try {
    fs.writeFileSync(PATH, data);
    cb();
  } catch {
    console.error(`error writing to ${fileName}`);
  }
};
