const dataControl = {
  inventory : require('../database/inventoryDB.json'),
  setInventory: function(data){ return this.inventory = data }
}

// console.log(dataControl.inventory);

const express = require('express');
const fsPromise = require('fs').promises;
const router = express.Router();
const upload = require('../multer');

router.get('/', (req, res) => {
  res.json({data: dataControl.inventory})
})

router.get('/:id', (req, res) => {
  const reqId = req.params.id

  const foundedItem = dataControl.inventory.find((item) => item.id === parseInt(reqId));

  res.json(foundedItem);
})

router.post('/', upload.single("file"), async (req, res) => {
  const newItem = {...req.body, image: req.file.originalname};

  dataControl.setInventory([...dataControl.inventory, newItem])

  await fsPromise.writeFile(
    '../server/database/inventoryDB.json', 
    JSON.stringify(dataControl.inventory)
  )

  res.sendStatus(200)
})

router.put('/:id', async (req, res) => {
  const redId = parseInt(req.params.id);
  const updatedItem = req.body;

  const index = dataControl.inventory.findIndex((item) => item.id === redId);

  if(index !== -1){
    dataControl.inventory[index] = {
      ...dataControl.inventory[index], 
      ...updatedItem
    };

    await fsPromise.writeFile(
      '../server/database/inventoryDB.json', 
      JSON.stringify(dataControl.inventory)
    )  

    res.sendStatus(200);
  }
})

router.delete('/:id', (req, res) => {

})

module.exports = router;


