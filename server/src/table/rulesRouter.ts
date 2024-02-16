import Table from "../table/table.js";
import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  const ourTable = Table.getInstance();
  res.send(ourTable.getRules());
});

export default router;
