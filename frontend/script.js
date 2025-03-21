// Ensure you have Web3.js included in your project
// You can include it in your HTML file or install it via npm if using a build tool

// Connect to Ethereum network
if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: 'eth_requestAccounts' });
}

const contractAddress = '0x6db212D911CC071d01811326f0f1BFfd1e736D3e'; // Replace with your contract address
const contractABI = [ [
	{
		"inputs": [],
		"name": "beforeAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkWinninProposalWithReturnValue",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkWinningProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
] ]; // Replace with your contract ABI

const contract = new web3.eth.Contract(contractABI, contractAddress);

document.getElementById('requestRideBtn').onclick = async () => {
    const fare = document.getElementById('fare').value;
    const accounts = await web3.eth.getAccounts();
    
    try {
        await contract.methods.requestRide(fare).send({ from: accounts[0] });
        document.getElementById('message').innerText = 'Ride requested successfully!';
    } catch (error) {
        document.getElementById('message').innerText = 'Error requesting ride: ' + error.message;
    }
};

document.getElementById('acceptRideBtn').onclick = async () => {
    const rideId = document.getElementById('rideId').value;
    const accounts = await web3.eth.getAccounts();
    
    try {
        await contract.methods.acceptRide(rideId).send({ from: accounts[0] });
        document.getElementById('message').innerText = 'Ride accepted
