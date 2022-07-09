import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

let whitelistedAddresses = [
  '0x0bdb32Da2Cce8FD473FcC5aC6248FCb4a3F11Fd0',
  '0xEca2B935c6892185BF99f7994Ec7d45AcE85F9C1',
  '0x9EC901767Fbb24f76b3725a2f1A1067991c5657a',
];

let addr = '0x9EC901767Fbb24f76b3725a2f1A1067991c5657a';

let leafNode = whitelistedAddresses.map((x) => keccak256(x));
const tree = new MerkleTree(leafNode, keccak256, { sortPairs: true });
const rootHash = tree.getHexRoot();

console.log(rootHash, 'roothash');

let leaf = keccak256(addr);
const proof = tree.getHexProof(leaf);
console.log(proof, 'hexproof');
