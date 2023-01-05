const { envelopes } = require('./db.js');

module.exports = {
  addEnvelope (type, budget) {
    type = String(type);
    budget = Number(budget);
    
    if(type.length > 0 && budget >= 0) {
      const newId = envelopes[envelopes.length-1].id + 1;
      addedEnvelope = {
        id: newId,
        type: type,
        budget: budget,
      };
      envelopes.push(addedEnvelope);
      return addedEnvelope;
    } else {
      return false;
    }
  },

  getEnvelopeById (id) {
    return envelopes.find((element) => {
      return element.id === Number(id);
    });
  },

  updateEnvelope (id, type, budget) {
    let index = Number(id) - 1;
    if (index > -1 && index < envelopes.length) {
      updatedEnvelope = {
        id: Number(id),
        type: String(type),
        budget: envelopes[index].budget + Number(budget),
      };
      envelopes.splice(index, 1, updatedEnvelope);
      return updatedEnvelope;
    } else {
      return false;
    }
  },

  deleteEnvelope (id) {
    let index = Number(id) - 1;
    if (index > -1 && index < envelopes.length) {
      envelopes.splice(index, 1);
    } else {
      return false;
    }
  },

  swapEnvelopes(firstId, secondId) {
    let firstIndex = Number(firstId) - 1;
    let secondIndex = Number(secondId) - 1;
    const ratio = 0.1;
    if (firstIndex > -1 && firstIndex < envelopes.length && secondIndex > -1 && secondIndex < envelopes.length) {
      updatedFirstEnvelope = {
        id: firstId,
        type: envelopes[firstIndex].type,
        budget: envelopes[firstIndex].budget - ratio * envelopes[secondIndex].budget,
      };
      updatedSecondEnvelope = {
        id: secondId,
        type: envelopes[secondIndex].type,
        budget: envelopes[secondIndex].budget + ratio * envelopes[secondIndex].budget,
      };
      envelopes.splice(firstIndex, 1, updatedFirstEnvelope);
      envelopes.splice(secondIndex, 1, updatedSecondEnvelope);
    } else {
      return false;
    }
  },

  addMoney(amount) {
    const gasRatio = 0.3;
    const childrenRatio = 0.25;
    const healthRatio = 0.15;
    const otherRatio = 1 - gasRatio - childrenRatio - healthRatio;
    const contributionGas = amount * gasRatio;
    const contributionChildren = amount * childrenRatio;
    const contributionHealth = amount * healthRatio;
    const contributionOther = amount * (otherRatio) / (envelopes.length - 3);

    envelopes.map((obj) => { 
      if(obj.type == 'gas') {
        obj.budget = obj.budget + contributionGas;
      } else if(obj.type == 'children') {
        obj.budget = obj.budget + contributionChildren;
      }else if(obj.type == 'health') {
        obj.budget = obj.budget + contributionHealth;
      } else {
        obj.budget = obj.budget + contributionOther;
      }
    });
  },
}