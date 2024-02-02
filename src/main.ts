import express from 'express';
import bodyParser from 'body-parser';
import playersRouter from '@/players/playersRouter.js';
import bidRouter from '@/bids/bidsRouter.js';
import 'dotenv/config';
import Table from '@/table/table.js';
import rulesRouter from '@/table/rulesRouter.js'
import cardsRouter from '@/cards/cardsRouter.js'

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

app.use('/players', playersRouter);
app.use('/bids', bidRouter);
app.use('/rules', rulesRouter);
app.use('/cards', cardsRouter);

if (process.env.populate === 'true') {
  Table.getInstance().populate();
}

// Routes
app.get('/', (_req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
