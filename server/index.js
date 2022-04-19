import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRouter from './routes/post.js';

import 'dotenv/config';
import colors from 'colors';

const app = express();
const PORT = 5000;

mongoose.connect(process.env.CONNECTION_URL);
mongoose.connection.once('open', () => {
  console.log(
    'Connection to database has been established successfully'.yellow
  );
});

app.use(express.json({ limit: '32MB' }));
app.use(bodyParser.urlencoded({ limit: '32mb', extended: true }));
app.use(cors());

app.use('/api/v1', postRouter);

app.get('/', (req, res) => {
  res.status(200).send('Hello from Server');
});

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}... `.cyan);
});
