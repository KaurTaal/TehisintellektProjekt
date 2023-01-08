import ErinevadLauaSeisud from "../erinevadLauaSeisud";
import kasLõpp from "@/scripts/kasMängLäbi";

describe("Mängu lõpu kontroll", () => {

  it("Kas tagastab 'false' kui võitjat pole veel", () => {
    expect(kasLõpp("must", ErinevadLauaSeisud().tavaSöömisedKeerulineValge)).toEqual(false);
  });

  it("Kas tagastab 'true' kui võitja on valge", () => {
    expect(kasLõpp("must", ErinevadLauaSeisud().tavaNupuTavaKäigudValge)).toEqual(true);
  });

  it("Kas tagastab 'true' kui võitja on must", () => {
    expect(kasLõpp("valge", ErinevadLauaSeisud().tavaNupuTavaKäigudMust)).toEqual(true);
  })

  it("Kas tagastab 'true' kui võitja on valge", () => {
    expect(kasLõpp("must", ErinevadLauaSeisud().isGameOverSpecial)).toEqual(true);
  });
});




