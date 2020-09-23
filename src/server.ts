import express, { json } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, resp) => {
  return resp.json({ message: 'Hello World' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server Started');
});
