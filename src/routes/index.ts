import { Request, Response, Router } from 'express';
import { Query } from '../types';
import { loadData, searchArray } from '../utils';

const router = Router();

router.get('/search', (req: Request, res: Response) => {
  const rawData = loadData();
  const data = [...rawData.dental, ...rawData.vet];
  const sorted = searchArray(data, req.query as unknown as Query);
  res.send(sorted);
});

router.get('/search/dentists', (req: Request, res: Response) => {
  const rawData = loadData();
  const sorted = searchArray(rawData.dental, req.query as unknown as Query);
  res.send(sorted);
});

router.get('/search/vets', (req: Request, res: Response) => {
  const rawData = loadData();
  const sorted = searchArray(rawData.vet, req.query as unknown as Query);
  res.send(sorted);
});

export default router;
