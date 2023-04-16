import Web3 from 'web3';
import { Transaction } from 'ethereumjs-tx';
import axios from 'axios';

const API_KEY = 'T9ANBZX1RERMK2NK8PE7EM7MTYPYGP3KVD';
const API_URL = `https://api.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&apikey=${API_KEY}`;

// const Web3 = require('web3')
const web3 = new Web3('HTTP://127.0.0.1:7545');

const privateKey = Buffer.from('0x4fd488472150becbfd8fb5d3c093bfa9e26042b45e73d5eecbaa7841c1bd33d1', 'base64');

// const privateKey = '0x4fd488472150becbfd8fb5d3c093bfa9e26042b45e73d5eecbaa7841c1bd33d1';
const fromAddress = '0x6a11218656A434e2649753d4c51771982fD4BB88';

const toAddress = '0x65c030671203e6fC7250c3720E071636e9217c38';
const value = '10';

export const getBalance = async () => {
  const wei = await web3.eth.getBalance(fromAddress);
  const ethBalance = web3.utils.fromWei(wei, 'ether');
  return ethBalance;
}

const sendTransaction = async (toAddress, value) => {
  // console.log(`Sending ETH from ${fromAddress} to ${toAddress}`)

  const txCount = await web3.eth.getTransactionCount(fromAddress);
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: toAddress,
    value: web3.utils.toHex(web3.utils.toWei(value, 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
  }

  const tx = new Transaction(txObject, { 'chain': 'ropsten' });
  tx.sign(Buffer.from(privateKey, 'hex'));

  const serializedTx = tx.serialize();
  const rawTx = '0x' + serializedTx.toString('hex');

  const response = await axios.post(API_URL, { data: rawTx });
  const txHash = response.data.result;

  return txHash;
}

sendTransaction()