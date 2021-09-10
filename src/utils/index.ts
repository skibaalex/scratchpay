/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { filter } from 'lodash';
import {
  Clinic, ClinicsData, NormalizedClinic, Query,
} from '../types';
import { DATA_PATH } from '../config';
import {
  filterName, filterOpening, filterState, normalizeData,
} from './filter';
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

/**
 * Read data from a file in the data directory
 * @returns @type {ClinicsData}
 */
export const loadData = (): ClinicsData => {
  // Assuming that data is not compromised
  const dental = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'dentalClinics.json'), 'utf-8'));
  const vet = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'vetClinics.json'), 'utf-8'));
  return {
    dental,
    vet,
  };
};

/**
 * Helper function to query an array of clinics
 * @param data @type {Array<Clinic>}
 * Array of the clinics you would like to query
 * @param query @type {Query}
 * @returns @type {Array<Clinic>}
 */
export const searchArray = (data: Clinic[], query: Query): Clinic[] => {
  const { name, opening, state } = query;
  const match:any = {};
  const sorted = filter(data, (clinic: Clinic) => {
    const normClinic: NormalizedClinic = normalizeData(clinic);
    if (name) {
      match.name = filterName(normClinic, name);
    }
    if (opening) {
      match.opening = filterOpening(normClinic, opening);
    }
    if (state) {
      match.state = filterState(normClinic, state);
    }
    return (match.name || match.opening || match.state);
  });
  return sorted as Clinic[];
};
