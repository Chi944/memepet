pragma solidity ^0.8.24;

/// @title PetRegistry
/// @notice Wallet-linked non-transferable pet registry. Not an NFT or token.
contract PetRegistry {
    uint32 public constant APPROVED_COMMUNITY_ID = 1;
    uint64 internal constant SECONDS_PER_UTC_DAY = 1 days;

    error InvalidCommunity();
    error AlreadyAdopted();
    error NoPet();
    error AlreadyCaredToday();

    struct Pet {
        uint32 communityId;
        uint32 careCount;
        uint64 lastCareDay;
        bool exists;
    }

    mapping(address wallet => Pet pet) private pets;
    mapping(uint32 communityId => uint64 totalCareActions) private communityCareTotals;

    event Adopted(address indexed owner, uint32 indexed communityId);
    event Cared(
        address indexed owner,
        uint32 indexed communityId,
        uint32 careCount,
        uint64 utcDay
    );

    function adopt(uint32 communityId) external {
        if (communityId != APPROVED_COMMUNITY_ID) {
            revert InvalidCommunity();
        }

        if (pets[msg.sender].exists) {
            revert AlreadyAdopted();
        }

        pets[msg.sender] = Pet({
            communityId: communityId,
            careCount: 0,
            lastCareDay: 0,
            exists: true
        });

        emit Adopted(msg.sender, communityId);
    }

    function care() external {
        Pet storage pet = pets[msg.sender];

        if (!pet.exists) {
            revert NoPet();
        }

        uint64 utcDay = uint64(block.timestamp / SECONDS_PER_UTC_DAY);

        if (pet.lastCareDay != 0 && pet.lastCareDay == utcDay) {
            revert AlreadyCaredToday();
        }

        unchecked {
            pet.careCount += 1;
            communityCareTotals[pet.communityId] += 1;
        }

        pet.lastCareDay = utcDay;

        emit Cared(msg.sender, pet.communityId, pet.careCount, utcDay);
    }

    function petOf(
        address wallet
    )
        external
        view
        returns (
            bool exists,
            uint32 communityId,
            uint32 careCount,
            uint64 lastCareDay
        )
    {
        Pet storage pet = pets[wallet];
        return (pet.exists, pet.communityId, pet.careCount, pet.lastCareDay);
    }

    function communityStats(
        uint32 communityId
    ) external view returns (uint64 totalCareActions) {
        if (communityId != APPROVED_COMMUNITY_ID) {
            revert InvalidCommunity();
        }

        return communityCareTotals[communityId];
    }
}
