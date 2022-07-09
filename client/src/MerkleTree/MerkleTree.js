import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

let whitelistedAddresses = [
  '0xbC486d04D7009d26159Bf57646A247f0925aC239',
  '0xdeEE2CD20f146FECAB853667a56C69efc6Fe9CCF',
  '0x366258e7b21900ca65d6bACD83D6393E04d8D03D',
];

let addr = '0x366258e7b21900ca65d6bACD83D6393E04d8D03D';

let leafNode = whitelistedAddresses.map((x) => keccak256(x));
const tree = new MerkleTree(leafNode, keccak256, { sortPairs: true });
const rootHash = tree.getHexRoot();

console.log(rootHash, 'roothash');

let leaf = keccak256(addr);
const proof = tree.getHexProof(leaf);
console.log(proof, 'hexproof');
