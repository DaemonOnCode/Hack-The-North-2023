const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
const Web3 = require("web3");



const provider = new Web3.providers.HttpProvider("http://localhost:9545");
const contractArtifact = require("./build/contracts/Test.json");

const contract = require("@truffle/contract");

const Test = contract(contractArtifact);
Test.setProvider(provider);
Test.defaults({ from: "0x2be6d7deb1963b2c4c55e2a225ea3672ac6143f3" }); // ! To be changed -> "npx truffle develop" to start server and get address -> replace with public key(ex:0x2be6d7deb1963b2c4c55e2a225ea3672ac6143f3)

const contractAddress = '0x6E3330F9d5dfdaD8B4e4d52fA963CAdd33a15E28'; // ! To be changed -> "npx truffle develop" to start server and then type "migrate" to get contract address -> replace with address(ex:0x6E3330F9d5dfdaD8B4e4d52fA963CAdd33a15E28)
let instance = null


const app = express();
app.use(cors());
const port = process.env.PORT || 7000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (_, res) => {
    res.json({ message: "Works" });
});

app.post(
    "/get-candidate-data-by-company",
    async (req, res) => {
        const { candidateAddress, companyAddress } = req.body;
        try {
            const response = await instance.getCandidateDataByCompany(candidateAddress, companyAddress);
            const newResponse = response["0"].map((item) => {
                let newReviews = []
                if (item.reviews.length !== 0)
                    newReviews = item.reviews.map((review) => {
                        return {
                            score: response["1"][+review].points,
                            datetime: response["1"][+review].time
                        }
                    })
                return {
                    "hired": item.hired ?? "",
                    "reviews": newReviews ?? [],
                    "fired": item.fired ?? "",
                };
            })
            res.json({ response: newResponse });
        } catch (error) {
            res.json({ error });
        }

    }
);

app.post("/get-candidate-data", async (req, res) => {
    const { candidateAddress, companyAddress } = req.body;

    const response = await instance.getCandidateData(candidateAddress, companyAddress);
    res.json({ transaction_id: response.receipt.transactionHash, gas_fee: response.receipt.gasUsed });
});

app.post(
    "/add-candidate-data-by-company",
    async (req, res) => {
        const {
            candidate_wallet_id: candidateAddress,
            company_wallet_id: companyAddress,
            transaction_type,
            transaction_data,
        } = req.body;

        let response = null;

        try {
            switch (transaction_type) {
                case "employee_hired":
                    response = await instance.addCandidateData(
                        candidateAddress,
                        companyAddress,
                        transaction_data.datetime
                    );
                    break;
                case "employee_discharged":
                    response = await instance.addCandidateFire(
                        candidateAddress,
                        companyAddress,
                        transaction_data.datetime
                    );
                    break;
                case "employee_reviewed":
                    response = await instance.addCandidateReview(
                        candidateAddress,
                        companyAddress,
                        transaction_data.datetime,
                        String(transaction_data.score)
                    );
                    break;
                default:
                    break;
            }
            res.status(201).json({ transaction_id: response.receipt.transactionHash, gas_fee: response.receipt.gasUsed });
        } catch (error) {
            res.json({ error });
        }
    }
);

app.listen(port, async () => {
    instance = await Test.at(contractAddress);
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
