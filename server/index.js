const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());


const MERKLE_ROOT = "303b34a218b3862a96e98ba91b949cbd34c0efa0861f1f75ece9ebc8af494563"

app.post('/gift', (req, res) => {

  const body = req.body;

  const isInTheList = verifyProof(body.proof, body.name, MERKLE_ROOT);

  if(isInTheList) {
    res.send("You got a toy robot!, " + body.name);
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
