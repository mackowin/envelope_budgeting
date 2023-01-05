if (typeof window !== "undefined") {
  const fetchAllButton = document.getElementById('fetch-envelopes');
  const postEnvelopeButton = document.getElementById('post-envelope');
  const getEnvelopeByIdButton = document.getElementById('get-id-envelope');
  const updateEnvelopeButton = document.getElementById('update-envelope');
  const deleteEnvelopeButton = document.getElementById('delete-envelope');
  const swapEnvelopeButton = document.getElementById('swap-envelope');
  const distributeAmountButton = document.getElementById('distribute-envelope');

  const containerGetAll = document.getElementById('get-envelopes-container');
  const containerPostEnvelope = document.getElementById('post-envelope-container');
  const containerGetEnvelopeById = document.getElementById('get-id-envelope-container');
  const containerUpdateEnvelope = document.getElementById('update-envelope-container');
  const containerDeleteEnvelope = document.getElementById('delete-envelope-container');
  const containerSwapEnvelope = document.getElementById('swap-envelope-container');
  const containerDistributeAmount = document.getElementById('distribute-envelope-container');



// GET ALL ENVELOPES
const renderErrorGetAll = response => {
  containerGetAll.innerHTML = 
      `<p>Response: ${response.status}, ${response.statusText}</p>`
};

const resetEnvelopes = () => {
  containerGetAll.innerHTML = '';
};

const renderSuccessGetAll = (arr) => {
    if (arr.length >= 1) {
        arr.forEach(element => {
            const newElement = document.createElement('div');
            newElement.innerHTML = 
                `<div style="font-weight: bold;">${element.type}</div>
                <div>${element.budget}</div>`;
                containerGetAll.appendChild(newElement);
        });
    } else {
      containerGetAll.innerHTML = `<p>Your request returned no envelopes.</p>`;
    };
};

fetchAllButton.addEventListener("click", fetchAllEnvelopes);

async function fetchAllEnvelopes(){
  resetEnvelopes();
  try {
    const response = await fetch('/envelopes');
    if (response.ok) {
      const jsonResponse = await response.json();
      renderSuccessGetAll(jsonResponse);
    } else {
      renderErrorGetAll(response);
    };
  } catch (error) {
    console.error('error.message');
  };
};


//POST NEW ENVELOPE
const renderErrorPost = response => {
  containerPostEnvelope.innerHTML = 
      `<p>Response: ${response.status}, ${response.statusText}</p>`
};

const resetPost = () => {
  containerPostEnvelope.innerHTML = '';
};

const renderSuccessPost = (element) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = 
        `<div style="font-weight: bold;">Succesfully created new envelope</div>
        <div style="font-weight: bold;">Type: ${element.type}</div>
        <div>Budget: ${element.budget}</div>`;
        containerPostEnvelope.appendChild(newElement);
};

postEnvelopeButton.addEventListener("click", postEnvelope);

async function postEnvelope(){
  resetPost();
  const typeInput = document.getElementById('type').value;
  const budgetInput = document.getElementById('budget').value;
  try {
    const response = await fetch('/envelopes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: "",
        type: typeInput,
        budget: budgetInput
      })
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      renderSuccessPost(jsonResponse);
    } else {
      renderErrorPost(response);
    };
  } catch (error) {
    console.error('error.message');
  };
};


// GET ENVELOPE BY ID
const renderErrorGetEnvelopeById = response => {
  containerGetEnvelopeById.innerHTML = 
      `<p>Response: ${response.status}, ${response.statusText}</p>`
};

const resetEnvelopeById = () => {
  containerGetEnvelopeById.innerHTML = '';
};

const renderSuccessEnvelopeById = (element) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = 
      `<div style="font-weight: bold;">Here is requested envelope</div>
      <div style="font-weight: bold;">Type: ${element.type}</div>
      <div>Budget: ${element.budget}</div>`;
      containerGetEnvelopeById.appendChild(newElement);
};

getEnvelopeByIdButton.addEventListener("click", fetchEnvelopeById);

async function fetchEnvelopeById(){
  resetEnvelopeById();
  const idInput = document.getElementById('id').value;
  try {
    const response = await fetch(`/envelopes/${idInput}`);
    if (response.ok) {
      const jsonResponse = await response.json();
      renderSuccessEnvelopeById(jsonResponse);
    } else {
      renderErrorGetEnvelopeById(response);
    };
  } catch (error) {
    console.error('error.message');
  };
};


// UPDATE ENVELOPE
const renderErrorUpdateEnvelope = response => {
  containerUpdateEnvelope.innerHTML = 
      `<p>Response: ${response.status}, ${response.statusText}</p>`
};

const resetUpdatedEnvelope = () => {
  containerUpdateEnvelope.innerHTML = '';
};

const renderSuccessUpdateEnvelope = (element) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = 
      `<div style="font-weight: bold;">Here is updated envelope</div>
      <div style="font-weight: bold;">Id: ${element.id}</div>
      <div style="font-weight: bold;">Type: ${element.type}</div>
      <div>Budget: ${element.budget}</div>`;
      containerUpdateEnvelope.appendChild(newElement);
};

updateEnvelopeButton.addEventListener("click", fetchUpdatedEnvelope);

async function fetchUpdatedEnvelope(){
  resetUpdatedEnvelope();
  const idUpdateInput = document.getElementById('idUpdate').value;
  const typeUpdateInput = document.getElementById('typeUpdate').value;
  const budgetUpdateInput = document.getElementById('budgetUpdate').value;

  try {
    const params = new URLSearchParams({
      type: typeUpdateInput,
      budget: budgetUpdateInput
    });
    const response = await fetch(`/envelopes/${idUpdateInput}?${params.toString()}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      renderSuccessUpdateEnvelope(jsonResponse);
    } else {
      renderErrorUpdateEnvelope(response);
    };
  } catch (error) {
    console.error('error.message');
  };
};


// DELETE ENVELOPE
const renderErrorDelete = response => {
  containerDeleteEnvelope.innerHTML = 
      `<p>Response: ${response.status}, ${response.statusText}</p>`
};

const resetDeleteEnvelope = () => {
  containerDeleteEnvelope.innerHTML = '';
};

const renderSuccessDelete = (element) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = 
      `<div style="font-weight: bold;">Below envelope was deleted</div>
       <div style="font-weight: bold;">Type: ${element.type}</div>
       <div>Budget: ${element.budget}</div>`;
      containerDeleteEnvelope.appendChild(newElement);
};

deleteEnvelopeButton.addEventListener("click", fetchDeleteEnvelope);

async function fetchDeleteEnvelope(){
  resetDeleteEnvelope();
  const idDeleteInput = document.getElementById('idDelete').value;
  try {
    const response = await fetch(`/envelopes/${idDeleteInput}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      renderSuccessDelete(jsonResponse);
    } else {
      renderErrorDelete(response);
    };
  } catch (error) {
    console.error(`error.message`);
  };
};


// SWAP ENVELOPES
const renderErrorSwap = response => {
  containerSwapEnvelope.innerHTML = 
      `<p>Response: ${response.status}, ${response.statusText}</p>`
};

const resetSwap = () => {
  containerSwapEnvelope.innerHTML = '';
};

const renderSuccessSwap = (arr) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = 
    `<div style="font-weight: bold; text-decoration: underline;">Envelope after transfering money</div>
    <div style="font-weight: bold;">Type: ${arr[0].type}</div>
    <div>Budget: ${arr[0].budget}</div>
    <div style="font-weight: bold; text-decoration: underline;">Envelope which received money</div>
    <div style="font-weight: bold;">Type: ${arr[1].type}</div>
    <div>Budget: ${arr[1].budget}</div>`;
  containerSwapEnvelope.appendChild(newElement);
};

swapEnvelopeButton.addEventListener("click", swapEnvelope);

async function swapEnvelope(){
  resetSwap();
  const idFirstInput = document.getElementById('idFirst').value;
  const idSecondInput = document.getElementById('idSecond').value;
  try {
    const response = await fetch(`/envelopes/transfer/${idFirstInput}/${idSecondInput}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      renderSuccessSwap(jsonResponse);
    } else {
      renderErrorSwap(response);
    };
  } catch (error) {
    console.error('error.message');
  };
};

// DISTRIBUTE AMOUNT
const renderErrorDistribute = response => {
  containerDistributeAmount.innerHTML = 
      `<p>Response: ${response.status}, ${response.statusText}</p>`
};

const resetDistribute = () => {
  containerDistributeAmount.innerHTML = '';
};

const renderSuccessDistribute = (arr) => {
  if (arr.length >= 1) {
    arr.forEach(element => {
        const newElement = document.createElement('div');
        newElement.innerHTML = 
            `<div style="font-weight: bold;">${element.type}</div>
            <div>${element.budget}</div>`;
            containerDistributeAmount.appendChild(newElement);
    });
  } else {
    containerDistributeAmount.innerHTML = `<p>Your request returned no envelopes.</p>`;
  };
};

distributeAmountButton.addEventListener("click", distributeEnvelope);

async function distributeEnvelope(){
  resetDistribute();
  const amountInput = document.getElementById('amount').value;
  try {
    const response = await fetch(`/envelopes/distribute?amount=${amountInput}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      renderSuccessDistribute(jsonResponse);
    } else {
      renderErrorDistribute(response);
    };
  } catch (error) {
    console.error('error.message');
  };
};

};