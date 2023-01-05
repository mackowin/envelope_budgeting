const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { envelopesRouter } = require('./envelopes.js');
app.use('/envelopes', envelopesRouter);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

module.exports.app = app;