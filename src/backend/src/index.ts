import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const votes = new Map<string, number>()

app.get('/votes/:breed', (req: Request, res: Response) => {
  const count = votes.get(req.params.breed) ?? 0
  res.json({ breed: req.params.breed, count });
});

app.post('/votes/:breed', (req: Request, res: Response) => {
  const breed = req.params.breed
  const count = (votes.get(breed) ?? 0) + 1
  votes.set(breed, count)
  res.json({ breed: breed, count });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});