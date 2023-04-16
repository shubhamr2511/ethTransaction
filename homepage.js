import Web3 from 'web3';
import { ethers } from 'ethers';

// Replace with your own Etherscan API key and private key
const ETHERSCAN_API_KEY = 'T9ANBZX1RERMK2NK8PE7EM7MTYPYGP3KVD';
const PRIVATE_KEY = '0x405Bae3133Bc58B6805CD5dA990876F62C5b3ad5';

// Set the gas price in Wei
const GAS_PRICE = '20000000000';

// Initialize a Web3 provider using the Infura endpoint and your API key
const provider = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY');

// Get the current account address
const account = provider.eth.accounts.privateKeyToAccount(PRIVATE_KEY).address;

const Homepage = ({ navigation }) => {
  const [transactionValue, setTransactionValue] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');

  const handleTransactionValueChange = (text) => {
    setTransactionValue(text);
  };

  const handleToAddressChange = (text) => {
    setToAddress(text);
  };

  const handleSubmit = async () => {
    try {
      // Check if transaction value and to address are valid
      if (!transactionValue || !toAddress) {
        throw new Error('Transaction value and to address are required');
      }

      // Convert transaction value to Wei
      const valueInWei = ethers.utils.parseEther(transactionValue);

      // Create a new transaction object
      const transaction = {
        to: toAddress,
        value: valueInWei,
        gasPrice: GAS_PRICE,
      };

      // Sign the transaction using your private key
      const signedTransaction = await provider.eth.accounts.signTransaction(
        transaction,
        PRIVATE_KEY
      );

      // Submit the signed transaction to the Ethereum network
      const tx = await provider.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );

      // Set the transaction status to pending
      setTransactionStatus('Pending');

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      // Set the transaction status to completed
      setTransactionStatus('Completed');
    } catch (error) {
      console.error(error);
      setTransactionStatus('Error');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <View style={styles.backgroundCircle1} />
          <View style={styles.backgroundCircle2} />
          <View style={styles.backgroundCircle3} />
          <View style={styles.backgroundCircle4} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Transaction Value"
            keyboardType="numeric"
            value={transactionValue}
            onChangeText={handleTransactionValueChange}
          />
          <TextInput
            style={styles.input}
            placeholder="To Address"
            value={toAddress}
            onChangeText={handleToAddressChange}
          />
          <Button title="Submit" onPress={handleSubmit} />
          <Text>{transactionStatus}</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Homepage;
