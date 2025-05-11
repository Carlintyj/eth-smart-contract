// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Import Chainlink Aggregator Interface
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract EthPriceStorage {
    AggregatorV3Interface internal priceFeed;
    int256 public storedPrice;

    // Chainlink ETH/USD price feed address on testnet
    constructor() {
        priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    }

    // Fetch latest ETH/USD price from Chainlink oracle and store it
    function updatePrice() public {
        (
            , 
            int price,
            ,
            ,
            
        ) = priceFeed.latestRoundData();
        storedPrice = price;
    }

    // Read stored price
    function getPrice() public view returns (int256) {
        return storedPrice;
    }
}
