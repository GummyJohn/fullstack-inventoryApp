const dataControl = {
  inventory : require('../database/inventoryDB.json'),
  setInventory: function(data){ return this.inventory = data }
}

const express = require('express');
const fsPromise = require('fs').promises;
const router = express.Router();
const upload = require('../multer');

router.get('/', (req, res) => {
  res.json({data: dataControl.inventory})
})

router.post('/post', upload.single("file"), async (req, res) => {
  const newItem = {...req.body, image: req.file.originalname};

  dataControl.setInventory([...dataControl.inventory, newItem])

  await fsPromise.writeFile(
    '../server/database/inventoryDB.json', 
    JSON.stringify(dataControl.inventory)
  )

  res.sendStatus(200)
})

router.put('/', (req, res) => {
  res.send('put request')
})

router.delete('/', (req, res) => {
  res.send('delete request')
})

module.exports = router;


