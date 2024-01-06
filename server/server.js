const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use('/inventory', require('./routes/inventoryRoute'))

app.listen(port, () => console.log(`Listening on port:${port}`))