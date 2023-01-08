import ErinevadLauaSeisud from "../erinevadLauaSeisud";
import {sooritaKäik} from "@/scripts/sooritaKäik";


////////////////////////////////////////////   TAVA NUPU TESTID
describe("Testid söömiste jaoks", () => {
  it("Tava nupu söömise liikumine ja laua uuendamine (vahet pole, mis värv on) ", () => {
    expect(sooritaKäik([[3, 4], [1, 6]], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedValge)).toEqual(ErinevadLauaSeisud().tavaNupuSöömisteLiikumineÜlesseParemale)
    expect(sooritaKäik([[3, 4], [5, 6]], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedValge)).toEqual(ErinevadLauaSeisud().tavaNupuSöömisteLiikumineAllaParemale)
    expect(sooritaKäik([[3, 4], [5, 2]], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedValge)).toEqual(ErinevadLauaSeisud().tavaNupuSöömisteLiikumineAllaVasakule)
    expect(sooritaKäik([[3, 4], [1, 2]], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedValge)).toEqual(ErinevadLauaSeisud().tavaNupuSöömisteLiikumineÜlesseVasakule)
  });

  it("Tava nupu valge söömine tammiks", () => {
    expect(sooritaKäik([[2, 3], [0, 1]], ErinevadLauaSeisud().kasValgeLähebTammiksEnneSöömist)).toEqual(ErinevadLauaSeisud().kasValgeLähebTammiksPealeSöömist)
  });

  it("Tava nupu musta söömine tammiks", () => {
    expect(sooritaKäik([[5, 6], [7, 4]], ErinevadLauaSeisud().kasMustLähebTammiksEnneSöömist)).toEqual(ErinevadLauaSeisud().kasMustLähebTammiksPealeSöömist)
  });

  it("Tava nupu valge liikumine", () => {
    expect(sooritaKäik([[3, 0], [2, 1]], ErinevadLauaSeisud().tavaliseNupuLiikumineEnneValge)).toEqual(ErinevadLauaSeisud().tavaliseNupuLiikuminePärastValge)
  });

  it("Tava nupu musta liikumine", () => {
    expect(sooritaKäik([[2, 1], [3, 0]], ErinevadLauaSeisud().tavaliseNupuLiikumineEnneMust)).toEqual(ErinevadLauaSeisud().tavaliseNupuLiikuminePärastMust)
  });


});