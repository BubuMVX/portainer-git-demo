import express from 'express';
import { env } from './env';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(/.*/, (_req, res) => {
    res.type('text').send(env.MESSAGE);
});

export default app;
