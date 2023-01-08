/**
 * These tests presume that there is at least one move for the player.
 * Tests check whether the AI gives always a valid move and does not throw an error.
 */
import miniMaxMove from "@/AI/miniMax";
import fields from "./fields";


const algorithms = [miniMaxMove];

describe("Test AI as white player", () => {
  it("Test no error and valid move", () => {
    algorithms.forEach(aiAlgorithm => {
      fields().whiteMoveFields.forEach(field => {
        expect(() => aiAlgorithm("valge", field, 3, [], "valge")).not.toThrow();
        expect(aiAlgorithm("valge", field, 3, [], "valge").tee.length).toBeGreaterThanOrEqual(1);
      })
    })
  });
});



describe("Test AI as black player", () => {
  it("Test no error and valid move", () => {
    algorithms.forEach(aiAlgorithm => {
      fields().blackMoveFields.forEach(field => {
        expect(() => aiAlgorithm("must", field, 3, [], "must")).not.toThrow();
        expect(aiAlgorithm("must", field, 3, [], "must").tee.length).toBeGreaterThanOrEqual(1);
      })
    })
  });
});