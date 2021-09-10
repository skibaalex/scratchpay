import path from 'path';

const config = {
  dentalClinicsUrl: 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json',
  vetClinicsUrl: 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json',
};

export const DATA_PATH = path.join(__dirname, 'data');

export default config;
