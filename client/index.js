const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';


async function main() {
  
  const merkleTree = new MerkleTree(niceList);
  
  console.log("#1 Valid case")

  let name = 'Leandro Palazzolo';
  let index = niceList.findIndex(n => n === name);
  let proof = merkleTree.getProof(index);

  await verify(name, proof)

  console.log("#2 Invalid case: invalid name with proof of another name")

  name = 'Leonardo Palazzolo';
  proof = merkleTree.getProof(index);

  await verify(name, proof)

  console.log("#3 Invalid case: valid name with proof of another name")

  name = 'Leandro Palazzolo';
  index = niceList.findIndex(n => n === "Shelly Toy");
  proof = merkleTree.getProof(index);
  
  await verify(name, proof)

  console.log("#4 Invalid case: Valid name but invalid proof")

  name = 'Leandro Palazzolo';
  index = niceList.findIndex(n => n === name);
  proof = merkleTree.getProof(index);
  proof[0].left = !proof[0].left

  await verify(name, proof)

}

async function verify(name, proof){
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name
  });

  console.log({ gift });
}
main();