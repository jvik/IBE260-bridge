import bidRouter from "@/bids/bidsRouter.js";
import cardsRouter from "@/cards/cardsRouter.js";
import playersRouter from "@/players/playersRouter.js";
import rulesRouter from "@/table/rulesRouter.js";
import Table from "@/table/table.js";
import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";

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

app.listen(port, () => {
  // biome-ignore lint/suspicious/noConsoleLog: Makes sense to log the port
  console.log(`Server is running at http://localhost:${port}`);
});
