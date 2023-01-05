const express = require('express');
const { addEnvelope, getEnvelopeById, updateEnvelope, deleteEnvelope, swapEnvelopes, addMoney } = require('./helpers.js');
const { envelopes } = require('./db.js');

const envelopesRouter = express.Router();


envelopesRouter.get('/', (req, res, next) => {
  if(envelopes.length > 0) {
    res.status(200).send(envelopes);
  } else {
    res.status(404).send('No envelopes is available');
  }
});

envelopesRouter.post('/', (req, res, next) => {
  const type = req.body.type;
  const budget = req.body.budget;
  const envelope = addEnvelope(type, budget);

  if(envelope) {
    res.status(201).send(envelope);
  } else {
    res.status(400).send('Sorry wrong type or budget input');
  }
});

envelopesRouter.get('/:id/', (req, res, next) => {
    const foundEnvelope = getEnvelopeById(req.params.id);
    if (foundEnvelope) {
      res.status(200).send(foundEnvelope);
    } else {
      res.status(404).send('Can not find the envelope');
    }
});

envelopesRouter.put('/:id/', (req, res, next) => {
  const foundEnvelope = getEnvelopeById(req.params.id);
  let type = req.query.type;
  const budget = req.query.budget;

  if (typeof type === 'undefined') {
    type = foundEnvelope.type;
  }

  if (foundEnvelope) {  
    updateEnvelope(foundEnvelope.id, type, budget);
    res.status(201).send(updatedEnvelope);
  } else {
    res.status(404).send('Can not find the envelope');
  }
});

envelopesRouter.delete('/:id/', (req, res, next) => {
  const foundEnvelope = getEnvelopeById(req.params.id);
  if(foundEnvelope) {
    deleteEnvelope(foundEnvelope.id);
    res.status(201).send(foundEnvelope)
  } else {
    res.status(500).send('Can not delete the envelope');
  }
});

envelopesRouter.post('/transfer/:from/:to', (req, res, next) => {
  const foundFirstEnvelope = getEnvelopeById(req.params.from);
  const foundSecondEnvelope = getEnvelopeById(req.params.to);
  if(foundFirstEnvelope && foundSecondEnvelope) {
    swapEnvelopes(foundFirstEnvelope.id, foundSecondEnvelope.id);
    res.status(201).send([envelopes[foundFirstEnvelope.id-1], envelopes[foundSecondEnvelope.id-1]])
  } else {
    res.status(400).send('Can not swap the envelope');
  }
});

envelopesRouter.post('/distribute/', (req, res, next) => {
  const amount = req.query.amount;
  if (amount > 0) {
    addMoney(amount);
    res.status(201).send(envelopes);
  } else {
    res.status(400).send('Sorry, amount need to be more than zero');
  }
  
});

module.exports.envelopesRouter = envelopesRouter;