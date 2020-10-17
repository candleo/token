const path = require("path");
const fs = require("fs");
const solc = require("solc");

const helloPath = path.resolve(__dirname, "contracts", "token.sol");
const source = fs.readFileSync(helloPath, "UTF-8");

var input = {
  language: "Solidity",
  sources: {
    "token.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": { "*": ["*"], "": ["*"] },
      def: {
        "*": ["*"],
      },
    },
  },
};

module.exports = solc.compile(JSON.stringify(input));
