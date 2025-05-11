const contractAddress = "0xF4DfF06F9C6cA07F1EeCC741b2d4A43f41dDdF59";
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "updatePrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPrice",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "storedPrice",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

let provider;
let signer;
let contract;

const connectWalletButton = document.getElementById("connectWallet");
const updatePriceButton = document.getElementById("updatePrice");
const priceDisplay = document.getElementById("price");

async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);
      updatePriceButton.disabled = false;
      connectWalletButton.textContent = "Wallet Connected";
      fetchStoredPrice();
    } catch (error) {
      alert("Wallet connection failed: " + error.message);
    }
  } else {
    alert("Please install MetaMask!");
  }
}

async function fetchStoredPrice() {
  try {
    const price = await contract.getPrice();
    if (price.toString() === "0") {
      priceDisplay.textContent = "No price stored yet";
    } else {
      priceDisplay.textContent = (price / 1e8).toString(); // Chainlink price has 8 decimals
    }
  } catch (error) {
    priceDisplay.textContent = "Error fetching price";
  }
}

async function updatePrice() {
  try {
    const tx = await contract.updatePrice();
    await tx.wait();
    fetchStoredPrice();
  } catch (error) {
    alert("Transaction failed: " + error.message);
  }
}

connectWalletButton.onclick = connectWallet;
updatePriceButton.onclick = updatePrice;
