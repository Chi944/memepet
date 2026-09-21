import { getAddress } from "viem";
import { describe, expect, it } from "vitest";
import {
  parsePublicWalletAddress,
  publicPetPath,
  toPublicPetSnapshot,
} from "./public-pet";

const OWNER = getAddress("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");

describe("parsePublicWalletAddress", () => {
  it("accepts a lowercase address and returns the checksum form", () => {
    expect(
      parsePublicWalletAddress("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"),
    ).toBe(OWNER);
  });

  it("accepts an already-checksummed address", () => {
    expect(parsePublicWalletAddress(OWNER)).toBe(OWNER);
  });

  it("rejects values that are not 20-byte hex addresses", () => {
    expect(parsePublicWalletAddress("")).toBeNull();
    expect(parsePublicWalletAddress("not-a-wallet")).toBeNull();
    expect(parsePublicWalletAddress("vitalik.eth")).toBeNull();
    expect(parsePublicWalletAddress("0x1234")).toBeNull();
    expect(parsePublicWalletAddress(`0x${"zz".repeat(20)}`)).toBeNull();
    expect(parsePublicWalletAddress(`${OWNER}extra`)).toBeNull();
  });
});

describe("toPublicPetSnapshot", () => {
  it("maps exists=false to an empty state with no pet", () => {
    const snapshot = toPublicPetSnapshot(OWNER, {
      ok: true,
      result: {
        exists: false,
        communityId: 0,
        careCount: 99,
        lastCareDay: BigInt(1),
      },
    });

    expect(snapshot.kind).toBe("no-pet");
    expect(snapshot).not.toHaveProperty("pet");
    expect(snapshot.owner).toBe(OWNER);
  });

  it("maps a failed RPC read to an error and does not invent a pet", () => {
    const snapshot = toPublicPetSnapshot(OWNER, { ok: false });

    expect(snapshot).toMatchObject({
      kind: "error",
      owner: OWNER,
    });
    expect(snapshot).not.toHaveProperty("pet");
    if (snapshot.kind === "error") {
      expect(snapshot.message.toLowerCase()).toContain("could not be read");
    }
  });

  it("maps an existing pet as live chain data", () => {
    const snapshot = toPublicPetSnapshot(OWNER, {
      ok: true,
      result: {
        exists: true,
        communityId: 1,
        careCount: 2,
        lastCareDay: BigInt(20_000),
      },
    });

    expect(snapshot.kind).toBe("pet");
    if (snapshot.kind !== "pet") {
      return;
    }

    expect(snapshot.pet.dataMode).toBe("live");
    expect(snapshot.pet.growthPoints).toBe(20);
    expect(snapshot.pet.stage).toBe("buddy");
    expect(publicPetPath(snapshot.owner)).toBe(`/pet/${OWNER}`);
  });
});
