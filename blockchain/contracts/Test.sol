pragma solidity >=0.5.0;
// SPDX-License-Identifier: UNLICENSED
pragma experimental ABIEncoderV2;


contract Test {

    struct Review {
        string time;
        string points;
    }

    struct CompanyDetails {
        string hired;
        uint[] reviews;
        uint reviewLength;
        string fired;
    }

    mapping(uint => Review) public reviews;
    uint public totalReviews;

    struct CandidateData {
        CompanyDetails[] companyDetails;
        uint companyLength;
    }

    struct CandidateFullData {
        mapping(address=>CandidateData) candidateData;
        uint length;
    }

    address public owner;

    mapping(address => CandidateFullData) public candidates;
    
    constructor() public {
        owner = msg.sender;
    }

    // check if the caller is the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function getCurrentIdx(address candidateAddress, address companyAddress) private view returns (uint) {
        return candidates[candidateAddress].candidateData[companyAddress].companyLength-1;
    }

    function checkAddresses(address candidateAddress, address companyAddress) private pure {
        require(candidateAddress!=companyAddress, "Addresses should not be equal");
    }

    function addCandidateData(address candidateAddress, address companyAddress, string calldata hired) external {
        checkAddresses(candidateAddress, companyAddress);
        candidates[candidateAddress].length++;
        candidates[candidateAddress].candidateData[companyAddress].companyDetails.push(CompanyDetails(hired, new uint[](0), 0, ""));
        candidates[candidateAddress].candidateData[companyAddress].companyLength++;
    }

    function addCandidateReview(address candidateAddress, address companyAddress, string calldata time, string calldata points) external {
        checkAddresses(candidateAddress, companyAddress);
        reviews[totalReviews] = Review(time, points);
        uint currentIdx = getCurrentIdx(candidateAddress, companyAddress);
        candidates[candidateAddress].candidateData[companyAddress].companyDetails[currentIdx].reviews.push(totalReviews);
        candidates[candidateAddress].candidateData[companyAddress].companyDetails[currentIdx].reviewLength++;
        totalReviews++;
    }

    function addCandidateFire(address candidateAddress, address companyAddress, string calldata fired) external {
        checkAddresses(candidateAddress, companyAddress);
        uint currentIdx = getCurrentIdx(candidateAddress, companyAddress);
        candidates[candidateAddress].candidateData[companyAddress].companyDetails[currentIdx].fired = fired;
    }

    // function getCandidateData(address candidateAddress) external view returns (CompanyDetails[][] memory, Review[] memory) {
    //     CompanyDetails[][] memory candidateData = new CompanyDetails[][](candidates[candidateAddress].length);
    //     for(uint i=0; i<candidates[candidateAddress].length; i++) {
    //         candidateData[i] = candidates[candidateAddress].candidateData[].companyDetails;
    //     }
    //     Review[] memory candidateReviews = new Review[](totalReviews);
    //     for(uint i=0; i<totalReviews; i++) {
    //         candidateReviews[i] = reviews[i];
    //     }
    //     return (candidateData, candidateReviews);
    // }

    function getCandidateDataByCompany(address candidateAddress, address companyAddress) external view returns (CompanyDetails[] memory, Review[] memory) {
        checkAddresses(candidateAddress, companyAddress);
        Review[] memory candidateReviews = new Review[](totalReviews);
        for(uint i=0; i<totalReviews; i++) {
            candidateReviews[i] = reviews[i];
        }
        return (candidates[candidateAddress].candidateData[companyAddress].companyDetails, candidateReviews);
    }
}