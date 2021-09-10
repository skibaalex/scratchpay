import { find } from 'lodash';
import { usStates } from '../config';
import { Clinic, NormalizedClinic } from '../types';

/**
 * Normalizes the
 * @param clinic @type {Clinic}
 * @returns @type {NormalizedClinic}
 */
export function normalizeData(clinic: Clinic): NormalizedClinic {
  if (clinic.stateCode) {
    // eslint-disable-next-line no-param-reassign
    clinic.stateName = find(usStates, (state) => state.abbreviation === clinic.stateCode)?.name;
  } else {
    // eslint-disable-next-line no-param-reassign
    clinic.clinicName = find(usStates, (state) => state.name === clinic.clinicName)?.abbreviation;
  }
  const norm = {
    name: clinic.name ? clinic.name : clinic.clinicName,
    opening: clinic.opening ? clinic.opening : clinic.availability,
    ...clinic,
  };

  return norm as NormalizedClinic;
}

/**
   * Checks if the query exists in the name
   * @param clinic @type {NormalizedClinic}
   * @param query @type {string}
   * @returns Boolean
   */
export function filterName(clinic: NormalizedClinic, query:string): boolean {
  return clinic!.name.toUpperCase().includes(query.toUpperCase());
}

/**
   * checks if the query time is between the opening
   * and closing time of the clinic
   * @param clinic @type {NormalizedClinic}
   * @param query @type {string}
   * @returns Boolean
   */
export function filterOpening(clinic: NormalizedClinic, query: string): boolean {
  const { from, to } = clinic.opening!;
  const fromInt = Number(from.split(':')[0]);
  const toInt = Number(to.split(':')[0]);
  const queryInt = Number(query.split(':')[0]);
  return (fromInt <= queryInt && queryInt <= toInt);
}

/**
   * Filters to see if the state code or the state
   * name are including the query string
   * @param clinic @type {NormalizedClinic}
   * @param query @type {string}
   * @returns Boolean
   */
export function filterState(clinic: NormalizedClinic, query:string): boolean {
  const nameMatch = clinic.stateName.includes(query);
  const codeMatch = clinic.stateCode.includes(query);
  return (nameMatch || codeMatch);
}
