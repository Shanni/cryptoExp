pragma solidity ^0.8.0;

contract InsuranceContract {
    address public insurer;

    enum PolicyStatus { Active, Expired, Claimed }

    struct Policy {
        uint256 id;
        address holder;
        uint256 premiumAmount;
        uint256 coverageAmount;
        uint256 expirationDate;
        PolicyStatus status;
    }

    Policy[] public policies;
    mapping(uint256 => uint256) public claimAmounts;

    constructor() {
        insurer = msg.sender;
    }

    modifier onlyInsurer() {
        require(msg.sender == insurer, "Only the insurer can call this function");
        _;
    }

    function purchasePolicy(
        address holder,
        uint256 premium,
        uint256 coverage,
        uint256 duration
    ) external payable {
        require(msg.value == premium, "Incorrect premium amount");

        policies.push(Policy({
            id: policies.length,
            holder: holder,
            premiumAmount: premium,
            coverageAmount: coverage,
            expirationDate: block.timestamp + duration,
            status: PolicyStatus.Active
        }));
    }

    function fileClaim(uint256 policyId) external {
        Policy storage policy = policies[policyId];
        require(policy.holder == msg.sender, "Not the policy holder");
        require(policy.status == PolicyStatus.Active, "Policy not active");
        require(block.timestamp <= policy.expirationDate, "Policy expired");
        require(claimAmounts[policyId] == 0, "Claim already filed");

        claimAmounts[policyId] = policy.coverageAmount;
        policy.status = PolicyStatus.Claimed;
    }

    function processClaim(uint256 policyId, uint256 payoutAmount) external onlyInsurer {
        require(claimAmounts[policyId] > 0, "No pending claims");

        Policy storage policy = policies[policyId];
        uint256 policyHolderBalance = address(policy.holder).balance;
        require(policyHolderBalance >= payoutAmount, "Insufficient funds in contract");

        claimAmounts[policyId] = 0;
        payable(policy.holder).transfer(payoutAmount);
    }

    function cancelPolicy(uint256 policyId) external {
        Policy storage policy = policies[policyId];
        require(policy.holder == msg.sender, "Not the policy holder");
        require(policy.status == PolicyStatus.Active, "Policy not active");
        require(block.timestamp > policy.expirationDate, "Policy not expired");

        policy.status = PolicyStatus.Expired;
        claimAmounts[policyId] = 0;
    }
}
