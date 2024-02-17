import express from "express";
import Table from "../table/table.js";

const router = express.Router();

router.get("/", (_req, res) => {
  const ourTable = Table.getInstance();
  res.send(ourTable.getRules());
});

export default router;
