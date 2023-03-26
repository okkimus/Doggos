import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

dotenv.config();
const port = process.env.PORT;
var corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app: Express = express();
app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', async (req: Request, res: Response) => {
  res.status(200)
  res.send("API running!");
});

app.get('/votes/:breed', async (req: Request, res: Response) => {
  const vote = await prisma.vote.findUnique({
    where: { breed: req.params.breed }
  })

  res.json({ breed: req.params.breed, upVotes: vote?.upVotes ?? 0, downVotes: vote?.downVotes ?? 0 });
});

app.post('/votes/:breed', async (req: Request, res: Response) => {
  const breed = req.params.breed
  const liked = req.body.like

  const vote = await prisma.vote.upsert({
    where: { breed },
    update: {
      upVotes: { increment: liked ? 1 : 0 },
      downVotes: { increment: liked ? 0 : 1 }, },
    create: { breed, upVotes: liked ? 1 : 0, downVotes: liked ? 0 : 1 },
  })
  await prisma.$disconnect()

  res.json({ breed: breed, upVotes: vote?.upVotes, downVotes: vote?.downVotes });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});