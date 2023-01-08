import annaKõikKäigud from "@/scripts/annaKõikKäigud";
import ErinevadLauaSeisud from "../erinevadLauaSeisud";

describe("Testid kõikide ühe tüübi nuppude käikude saamiseks(tavalised nupud)", () => {
  it("Tava kõik käigud must", () => {
    const käigud = annaKõikKäigud("must", ErinevadLauaSeisud().tavaMustaKõikErinevadKäigud);
    expect(käigud).toEqual([[[2,5], [[4,3], [6,1]]], [[2,5], [[4,3], [6,5]]]]);
  });

  it("Tava kõik käigud valge", () => {
    const käigud = annaKõikKäigud("valge", ErinevadLauaSeisud().tavaValgeKõikErinevadKäigud);
    expect(käigud).toEqual([ [[4,5], [[2,3], [0,5]]], [[4,5], [[2,3], [0,1]]]  ]);
  });

  it("Tava kõik käigud ilma söömiseta must", () => {
    const käigud = annaKõikKäigud("must", ErinevadLauaSeisud().tavaNupuTavaKäigudMust);
    expect(käigud).toEqual([ [[2,5], [[3,6]]], [[2,5], [[3,4]]], [[2,7], [[3,6]]], [[3,0], [[4,1]]], [[3,2], [[4,3]]], [[3,2], [[4,1]]], [[5,0], [[6,1]]], [[6,7], [[7,6]]] ]);
  });

  it("Tava kõik käigud ilma söömiseta valge", () => {
    const käigud = annaKõikKäigud("valge", ErinevadLauaSeisud().tavaNupuTavaKäigudValge);
    expect(käigud).toEqual([ [[2,7], [[1,6]]], [[5,6], [[4,5]]], [[5,6], [[4,7]]], [[6,1], [[5,0]]], [[6,1], [[5,2]]], [[6,5], [[5,4]]], [[7,2], [[6,3]]]  ]);
  });
});

describe("Testid kõikide ühe tüübi nuppude käikude saamiseks(Tammid)", () => {
  it("Tammi kõik käigud must", () => {
    const käigud = annaKõikKäigud("must", ErinevadLauaSeisud().tammiKõikKäigudMust);
    expect(käigud).toEqual([ [[0,7], [[2,5], [4,3], [2,1]]], [[0,7], [[2,5], [4,3], [6,5]]] ]);
  });

  it("Tava kõik käigud valge", () => {
    const käigud = annaKõikKäigud("valge", ErinevadLauaSeisud().tammiKõikKäigudValge);
    expect(käigud).toEqual([ [[7,0], [[5,2], [3,4], [5,6]]], [[7,0], [[5,2], [3,4], [1,2]]] ]);
  });
});
