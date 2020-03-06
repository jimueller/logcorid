const path = require("path");
const express = require("express");
const rTracer = require("cls-rtracer");
const logger = require("./logger.js");

const app = express();

const dao = require("./dao");

const LOG_CLASS = path.basename(__filename);

app.use(
  rTracer.expressMiddleware({
    useHeader: false,
    headerName: "X-CORRELATION-ID"
  })
);

app.get("/cats", async (req, res, next) => {
  const cats = await dao.getAllCats();
  res.send(cats);
});

app.get("/cats/:name", async (req, res, next) => {
  logger.info(`asked for cat name: ${req.params.name}`);

  try {
    const cat = await dao.getCatByName(req.params.name);
    res.send({ correlationId: rTracer.id(), cat });
  } catch (err) {
    logger.error(err);
    res
      .status(404)
      .send({ correlationId: rTracer.id(), message: "Cat not found" });
  }
});

app.listen(3000, () => logger.info("Listening on 3000"));
