import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRouter from './routes/post.js';
import userRouter from './routes/user.js';

import 'dotenv/config';
import colors from 'colors';

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.CONNECTION_URL);
mongoose.connection.once('open', () => {
  console.log(
    'Connection to database has been established successfully'.bgGrey
  );
});

app.use(express.json({ limit: '32MB' }));
app.use(bodyParser.urlencoded({ limit: '32mb', extended: true }));
app.use(cors());

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}... `.cyan);
});
