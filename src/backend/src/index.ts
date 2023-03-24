import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';

dotenv.config();
const port = process.env.PORT;
var corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app: Express = express();
app.use(cors(corsOptions))
app.use(bodyParser.json())

const votes = new Map<string, number>()

app.get('/votes/:breed', (req: Request, res: Response) => {
  const count = votes.get(req.params.breed) ?? 0
  res.json({ breed: req.params.breed, count });
});

app.post('/votes/:breed', (req: Request, res: Response) => {
  const breed = req.params.breed
  console.log(req.body)
  const delta = req.body.like ? 1 : -1
  const count = (votes.get(breed) ?? 0) + delta
  votes.set(breed, count)
  res.json({ breed: breed, count });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});