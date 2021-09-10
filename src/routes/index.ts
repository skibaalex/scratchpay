import { Request, Response, Router } from 'express';

const router = Router();

router.get('/search', (_req: Request, res: Response) => {
  res.send('search all');
});

router.get('/search/dentists', (_req: Request, res: Response) => {
  res.send('search dentists');
});

router.get('/search/vets', (_req: Request, res: Response) => {
  res.send('search vets');
});

export default router;
