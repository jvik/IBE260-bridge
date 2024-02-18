import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import { NextFunction, Request, Response } from "express";
import bidRouter from "./bids/bidsRouter.js";
import cardsRouter from "./cards/cardsRouter.js";
import playersRouter from "./players/playersRouter.js";
import rulesRouter from "./rules/rulesRouter.js";
import Table from "./table/table.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

app.use("/players", playersRouter);
app.use("/bids", bidRouter);
app.use("/rules", rulesRouter);
app.use("/cards", cardsRouter);

if (process.env.populate === "true") {
  Table.getInstance().populate();
}

// Routes
app.get("/", (_req, res) => {
  res.send("Welcome");
});

// Error handler. This will return the error message in the response.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
