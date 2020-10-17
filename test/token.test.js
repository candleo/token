const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const contractPtoken = require("../compile");
const contracttoken = JSON.parse(contractPtoken).contracts["token.sol"][
  "CandleoToken"
];
const abitoken = contracttoken.abi;
const bytecodetoken = contracttoken.evm.bytecode.object;

let accounts;
let stakes;
let token;
let ac0balance;

describe("Token", () => {
  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    token = await new web3.eth.Contract(abitoken)
      .deploy({ data: bytecodetoken })
      .send({ from: accounts[0], gas: "2000000" });
  });
  it("show token name", async () => {
    console.log("name:", await token.methods.name().call());
  });
  it("Show token symbol", async () => {
    console.log("symbol:", await token.methods.symbol().call());
  });
  it("Show token supply", async () => {
    console.log("TotalSypply:", await token.methods.totalSupply().call());
  });

  it("Account[0] Balance", async () => {
    console.log(
      "Balance:",
      await token.methods.balanceOf(accounts[0]).call({ from: accounts[0] })
    );
  });
});
