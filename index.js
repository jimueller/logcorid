const express = require('express');
const rTracer = require('cls-rtracer');
const logger = require('./logger.js');

const app = express();

app.use(rTracer.expressMiddleware({
  useHeader: true,
  headerName: 'X--CORRELATION-ID'
}));

app.get('/api/v1/cats/:id', (req, res, next) => {
  logger.info(`asked for cat id: ${req.params.id}`);
  res.json({
    correlationId: rTracer.id(),
    catId: req.params.id
  });
});

app.listen(3000, () => logger.info('Listening on 3000'));
