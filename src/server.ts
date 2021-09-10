/* eslint-disable no-console */
import axios from 'axios';
import express, { Application, Request, Response } from 'express';
import config from './config';
import router from './routes';
import { dirHandler, writeFile } from './utils';

class Server {
  port: string | number | undefined;

  app: Application;

  constructor(port?: number) {
    this.port = port || process.env.PORT || 5000;
    this.app = express();
    this.loadRoutes();
    this.getData();
  }

  // eslint-disable-next-line class-methods-use-this
  async getData() {
    const dental = await axios.get(config.dentalClinicsUrl);
    const dentalJson = dental.data;
    const vet = await axios.get(config.vetClinicsUrl);
    const vetJson = await vet.data;

    // handle file system to store received data
    dirHandler();
    writeFile(JSON.stringify(dentalJson, null, 2), 'dentalClinics.json', () => console.log('Dental  clinics data was loaded'));
    writeFile(JSON.stringify(vetJson, null, 2), 'vetClinics.json', () => console.log('Vet  clinics data was loaded'));
  }

  loadRoutes() {
    this.app.use('/api/v1/', router);
  }

  serve() {
    this.app.listen(this.port, () => console.log(`Server is running on port ${this.port}`));
    this.app.get('/', (_req: Request, res: Response) => {
      res.send('Hello World!');
    });
  }
}

export default Server;
