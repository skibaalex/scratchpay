/* eslint-disable no-console */
import express, { Application, Request, Response } from 'express';

class Server {
  port: string | number | undefined;

  app: Application;

  constructor(port?: number) {
    this.port = port || process.env.PORT || 5000;
    this.app = express();
  }

  serve() {
    this.app.listen(this.port, () => console.log(`Server is running on port ${this.port}`));
    this.app.get('/', (_req: Request, res: Response) => {
      res.send('Hello World!');
    });
  }
}

export default Server;
