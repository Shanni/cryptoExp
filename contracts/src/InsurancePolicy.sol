pragma solidity ^0.8.0;

contract InsurancePolicy {
    address public insurer;
    address public holder;
    uint256 public insuredAmount;
    uint256 public premiumAmount;
    uint256 public coveragePeriod;
    bool public isActive;
    bool public hasClaim;

    constructor(
        address _insurer,
        address _holder,
        uint256 _insuredAmount,
        uint256 _premiumAmount,
        uint256 _coveragePeriod
    ) {
        insurer = _insurer;
        holder = _holder;
        insuredAmount = _insuredAmount;
        premiumAmount = _premiumAmount;
        coveragePeriod = _coveragePeriod;
        isActive = true;
        hasClaim = false;
    }

    modifier onlyInsurer() {
        require(msg.sender == insurer, "Only the insurer can call this function");
        _;
    }

    modifier onlyHolder() {
        require(msg.sender == holder, "Only the policy holder can call this function");
        _;
    }

    function fileClaim() external onlyHolder {
        require(isActive, "Policy is not active");
        require(!hasClaim, "Claim has already been filed");
        hasClaim = true;
    }

    function cancelPolicy() external onlyInsurer {
        isActive = false;
        hasClaim = false;
    }
}
