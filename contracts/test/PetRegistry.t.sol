pragma solidity ^0.8.24;

import {PetRegistry} from "../src/PetRegistry.sol";
import {Test} from "forge-std/Test.sol";

contract PetRegistryTest is Test {
    PetRegistry internal registry;
    address internal ownerA = address(0xA11CE);
    address internal ownerB = address(0xB0B);

    uint256 internal constant DAY = 1 days;
    // 2030-01-01T00:00:00Z
    uint256 internal constant MIDNIGHT = 1_893_456_000;

    function setUp() public {
        registry = new PetRegistry();
        vm.warp(MIDNIGHT + 12 hours);
    }

    function test_adopt_rejectsInvalidCommunity() public {
        vm.prank(ownerA);
        vm.expectRevert(PetRegistry.InvalidCommunity.selector);
        registry.adopt(2);
    }

    function test_adopt_recordsOnePetAndEmits() public {
        vm.prank(ownerA);
        vm.expectEmit(true, true, false, true);
        emit PetRegistry.Adopted(ownerA, 1);
        registry.adopt(1);

        (bool exists, uint32 communityId, uint32 careCount, uint64 lastCareDay) = registry
            .petOf(ownerA);

        assertTrue(exists);
        assertEq(communityId, 1);
        assertEq(careCount, 0);
        assertEq(lastCareDay, 0);
        assertEq(registry.communityStats(1), 0);
    }

    function test_adopt_rejectsDuplicateAdoption() public {
        vm.prank(ownerA);
        registry.adopt(1);

        vm.prank(ownerA);
        vm.expectRevert(PetRegistry.AlreadyAdopted.selector);
        registry.adopt(1);
    }

    function test_care_rejectsWhenNoPet() public {
        vm.prank(ownerA);
        vm.expectRevert(PetRegistry.NoPet.selector);
        registry.care();
    }

    function test_care_firstCareAfterAdoptionIncrementsOnce() public {
        vm.prank(ownerA);
        registry.adopt(1);

        vm.prank(ownerA);
        registry.care();

        (, , uint32 careCount, uint64 lastCareDay) = registry.petOf(ownerA);
        assertEq(careCount, 1);
        assertEq(lastCareDay, uint64((MIDNIGHT + 12 hours) / DAY));
        assertEq(registry.communityStats(1), 1);
    }

    function test_care_rejectsDuplicateSameUtcDay() public {
        vm.prank(ownerA);
        registry.adopt(1);
        vm.prank(ownerA);
        registry.care();

        vm.warp(MIDNIGHT + 23 hours + 59 minutes);
        vm.prank(ownerA);
        vm.expectRevert(PetRegistry.AlreadyCaredToday.selector);
        registry.care();

        (, , uint32 careCount, ) = registry.petOf(ownerA);
        assertEq(careCount, 1);
        assertEq(registry.communityStats(1), 1);
    }

    function test_care_allowsNextUtcDayAfterMidnightBoundary() public {
        vm.prank(ownerA);
        registry.adopt(1);
        vm.prank(ownerA);
        registry.care();

        vm.warp(MIDNIGHT + 1 days);
        vm.prank(ownerA);
        registry.care();

        (, , uint32 careCount, uint64 lastCareDay) = registry.petOf(ownerA);
        assertEq(careCount, 2);
        assertEq(lastCareDay, uint64((MIDNIGHT + 1 days) / DAY));
        assertEq(registry.communityStats(1), 2);
    }

    function test_wallets_areIndependent() public {
        vm.prank(ownerA);
        registry.adopt(1);
        vm.prank(ownerB);
        registry.adopt(1);

        vm.prank(ownerA);
        registry.care();

        (bool existsA, , uint32 careA, ) = registry.petOf(ownerA);
        (bool existsB, , uint32 careB, uint64 lastB) = registry.petOf(ownerB);

        assertTrue(existsA);
        assertTrue(existsB);
        assertEq(careA, 1);
        assertEq(careB, 0);
        assertEq(lastB, 0);
        assertEq(registry.communityStats(1), 1);
    }

    function test_communityStats_rejectsUnknownCommunity() public {
        vm.expectRevert(PetRegistry.InvalidCommunity.selector);
        registry.communityStats(99);
    }

    /// The daily guard keys off careCount, not off lastCareDay being non-zero.
    /// A pet that has never cared must be allowed to care at any timestamp,
    /// including the first second of a UTC day.
    function test_care_allowsFirstCareAtExactUtcMidnight() public {
        vm.warp(MIDNIGHT);

        vm.prank(ownerA);
        registry.adopt(1);
        vm.prank(ownerA);
        registry.care();

        (, , uint32 careCount, uint64 lastCareDay) = registry.petOf(ownerA);
        assertEq(careCount, 1);
        assertEq(lastCareDay, uint64(MIDNIGHT / DAY));
        assertEq(registry.communityStats(1), 1);
    }

    /// The last second of the same UTC day is still the same day.
    function test_care_rejectsDuplicateAtLastSecondOfSameDay() public {
        vm.warp(MIDNIGHT);

        vm.prank(ownerA);
        registry.adopt(1);
        vm.prank(ownerA);
        registry.care();

        vm.warp(MIDNIGHT + 1 days - 1);
        vm.prank(ownerA);
        vm.expectRevert(PetRegistry.AlreadyCaredToday.selector);
        registry.care();

        (, , uint32 careCount, ) = registry.petOf(ownerA);
        assertEq(careCount, 1);
        assertEq(registry.communityStats(1), 1);
    }

    /// One second later is a new UTC day and must be allowed.
    function test_care_allowsCareOneSecondIntoNextUtcDay() public {
        vm.warp(MIDNIGHT);

        vm.prank(ownerA);
        registry.adopt(1);
        vm.prank(ownerA);
        registry.care();

        vm.warp(MIDNIGHT + 1 days);
        vm.prank(ownerA);
        registry.care();

        (, , uint32 careCount, uint64 lastCareDay) = registry.petOf(ownerA);
        assertEq(careCount, 2);
        assertEq(lastCareDay, uint64((MIDNIGHT + 1 days) / DAY));
        assertEq(registry.communityStats(1), 2);
    }

    /// A missed day is not penalised and does not break the guard.
    function test_care_allowsCareAfterSkippingDays() public {
        vm.prank(ownerA);
        registry.adopt(1);
        vm.prank(ownerA);
        registry.care();

        vm.warp(MIDNIGHT + 30 days + 6 hours);
        vm.prank(ownerA);
        registry.care();

        (, , uint32 careCount, ) = registry.petOf(ownerA);
        assertEq(careCount, 2);
        assertEq(registry.communityStats(1), 2);
    }
}
