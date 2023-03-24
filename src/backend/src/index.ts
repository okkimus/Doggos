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


app.get('/votes/:breed', async (req: Request, res: Response) => {
  const vote = await prisma.vote.findUnique({
    where: { breed: req.params.breed }
  })

  res.json({ breed: req.params.breed, count: (vote?.upVotes! - vote?.downVotes!) });
});

app.post('/votes/:breed', async (req: Request, res: Response) => {
  const breed = req.params.breed
  const liked = req.body.like
  // const existingVotes = await prisma.vote.findFirst({ where: { breed }})

  const vote = await prisma.vote.upsert({
    where: { breed },
    update: {
      upVotes: { increment: liked ? 1 : 0 },
      downVotes: { increment: liked ? 0 : 1 }, },
    create: { breed, upVotes: liked ? 1 : 0, downVotes: liked ? 0 : 1 },
  })
  await prisma.$disconnect()

  res.json({ breed: breed, count: vote.upVotes - vote.downVotes });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});