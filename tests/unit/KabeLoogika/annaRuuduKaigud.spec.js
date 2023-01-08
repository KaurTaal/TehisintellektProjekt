import ErinevadLauaSeisud from "../erinevadLauaSeisud";
import {annaRuuduKäigud} from "@/scripts/annaRuuduKäigud";


////////////////////////////////////////////   TAVA NUPU TESTID
describe("Testid võimalike käikude saamiseks tava nupuga", () => {
  it("Tava nupu tava käigud valge", () => {
    expect(annaRuuduKäigud([7, 0], ErinevadLauaSeisud().tavaNupuTavaKäigudValge).length).toEqual(0);
    expect(annaRuuduKäigud([0, 1], ErinevadLauaSeisud().tavaNupuTavaKäigudValge).length).toEqual(0);
    expect(annaRuuduKäigud([2, 7], ErinevadLauaSeisud().tavaNupuTavaKäigudValge)).toEqual([[[1, 6]]]);
    expect(annaRuuduKäigud([5, 6], ErinevadLauaSeisud().tavaNupuTavaKäigudValge)).toEqual([[[4, 5]], [[4, 7]]]);
    expect(annaRuuduKäigud([6, 1], ErinevadLauaSeisud().tavaNupuTavaKäigudValge)).toEqual([[[5, 0]], [[5, 2]]]);
    expect(annaRuuduKäigud([7, 2], ErinevadLauaSeisud().tavaNupuTavaKäigudValge)).toEqual([[[6, 3]]]);
    expect(annaRuuduKäigud([6, 5], ErinevadLauaSeisud().tavaNupuTavaKäigudValge)).toEqual([[[5, 4]]]);
    expect(annaRuuduKäigud([6, 7], ErinevadLauaSeisud().tavaNupuTavaKäigudValge).length).toEqual(0);
  });

  it("Tava nupu tava käigud must", () => {
    expect(annaRuuduKäigud([1, 6], ErinevadLauaSeisud().tavaNupuTavaKäigudMust).length).toEqual(0);
    expect(annaRuuduKäigud([2, 1], ErinevadLauaSeisud().tavaNupuTavaKäigudMust).length).toEqual(0);
    expect(annaRuuduKäigud([2, 5], ErinevadLauaSeisud().tavaNupuTavaKäigudMust)).toEqual([[[3, 6]], [[3, 4]]]);
    expect(annaRuuduKäigud([2, 7], ErinevadLauaSeisud().tavaNupuTavaKäigudMust)).toEqual([[[3, 6]]]);
    expect(annaRuuduKäigud([3, 0], ErinevadLauaSeisud().tavaNupuTavaKäigudMust)).toEqual([[[4, 1]]]);
    expect(annaRuuduKäigud([3, 2], ErinevadLauaSeisud().tavaNupuTavaKäigudMust)).toEqual([[[4, 3]], [[4, 1]]]);
    expect(annaRuuduKäigud([5, 0], ErinevadLauaSeisud().tavaNupuTavaKäigudMust)).toEqual([[[6, 1]]]);
    expect(annaRuuduKäigud([6, 7], ErinevadLauaSeisud().tavaNupuTavaKäigudMust)).toEqual([[[7, 6]]]);
  });

  it("Tava nupu ühe sammulised söömised seinad valge", () => {
    expect(annaRuuduKäigud([1, 0], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedValgeSeinad).length).toEqual(0);
    expect(annaRuuduKäigud([1, 2], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedValgeSeinad).length).toEqual(0);
    expect(annaRuuduKäigud([1, 6], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedValgeSeinad)).toEqual([[[0, 5]]]); //Sest saab vasakule käija
    expect(annaRuuduKäigud([5, 6], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedValgeSeinad)).toEqual([[[4, 5]]]);
    expect(annaRuuduKäigud([6, 1], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedValgeSeinad)).toEqual([[[5, 2]]]);
  });

  it("Tava nupu ühe sammulised söömised seinad must", () => {
    expect(annaRuuduKäigud([0, 1], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedMustSeinad)).toEqual([[[1, 2]]]);
    expect(annaRuuduKäigud([2, 7], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedMustSeinad)).toEqual([[[4, 5]]]);
    expect(annaRuuduKäigud([6, 1], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedMustSeinad)).toEqual([[[7, 2]]]);
    expect(annaRuuduKäigud([6, 5], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedMustSeinad).length).toEqual(0);
    expect(annaRuuduKäigud([6, 7], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedMustSeinad).length).toEqual(0);
  });

  it("Tava nupu ühe sammulised söömised valge, kui nupud on blokitud", () => {
    expect(annaRuuduKäigud([3, 4], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedValgeBlokitud).length).toEqual(0);
  });

  it("Tava nupu ühe sammulised söömised must, kui nupud on blokitud", () => {
    expect(annaRuuduKäigud([3, 4], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedMustBlokitud).length).toEqual(0);
  });

  it("Tava nupu ühe sammulised söömised valge", () => {
    const käigud = annaRuuduKäigud([3, 4], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedValge);
    expect(käigud.length).toEqual(2);
    expect(käigud[1]).toEqual([[1, 2]]);
    expect(käigud[0]).toEqual([[1, 6]]);
  });

  it("Tava nupu ühe sammulised söömised must", () => {
    const käigud = annaRuuduKäigud([3, 4], ErinevadLauaSeisud().tavaNupuÜheSammulisedSöömisedMust);
    expect(käigud.length).toEqual(2);
    expect(käigud[1]).toEqual([[5, 6]]);
    expect(käigud[0]).toEqual([[5, 2]]);
  });

  it("Tavanupu söömised rasked valge", () => {
    const käigud = annaRuuduKäigud([7, 0], ErinevadLauaSeisud().tavaSöömisedKeerulineValge);
    expect(käigud.length).toEqual(3);
    expect(käigud[0]).toEqual([[5, 2], [3, 4], [1, 6]]);
    expect(käigud[1]).toEqual([[5, 2], [3, 4], [1, 2]]);
    expect(käigud[2]).toEqual([[5, 2], [3, 0], [1, 2]]);
  });

  it("Tavanupu söömised rasked must", () => {
    const käigud = annaRuuduKäigud([0, 7], ErinevadLauaSeisud().tavaSöömisedKeerulineMust);
    expect(käigud.length).toEqual(3);
    expect(käigud[0]).toEqual([[2, 5], [4, 3], [6, 1]]);
    expect(käigud[1]).toEqual([[2, 5], [4, 3], [6, 5]]);
    expect(käigud[2]).toEqual([[2, 5], [4, 7], [6, 5]]);
  });
});


////////////////////////////////////////////   TAMMI TESTID
describe("Testid võimalike käikude saamiseks tammiga", () => {
  it("Tammi tava käigud valge", () => {
    expect(annaRuuduKäigud([0, 1], ErinevadLauaSeisud().tammiTavaKäigudValge)).toEqual([[[1, 2]]]);
    expect(annaRuuduKäigud([0, 7], ErinevadLauaSeisud().tammiTavaKäigudValge)).toEqual([[[1, 6]]]);
    expect(annaRuuduKäigud([1, 0], ErinevadLauaSeisud().tammiTavaKäigudValge)).toEqual([[[2, 1]]]);
    expect(annaRuuduKäigud([3, 6], ErinevadLauaSeisud().tammiTavaKäigudValge)).toEqual([[[2, 5]], [[2, 7]], [[4, 7]]]);
    expect(annaRuuduKäigud([4, 5], ErinevadLauaSeisud().tammiTavaKäigudValge)).toEqual([[[3, 4]], [[5, 6]], [[5, 4]]]);
    expect(annaRuuduKäigud([5, 2], ErinevadLauaSeisud().tammiTavaKäigudValge)).toEqual([[[4, 1]], [[4, 3]], [[6, 3]], [[6, 1]]]);
    expect(annaRuuduKäigud([7, 0], ErinevadLauaSeisud().tammiTavaKäigudValge)).toEqual([[[6, 1]]]);
    expect(annaRuuduKäigud([7, 6], ErinevadLauaSeisud().tammiTavaKäigudValge)).toEqual([[[6, 5]], [[6, 7]]]);
  });

  it("Tammi tava käigud must", () => {
    expect(annaRuuduKäigud([0, 1], ErinevadLauaSeisud().tammiTavaKäigudMust)).toEqual([[[1, 2]]]);
    expect(annaRuuduKäigud([0, 7], ErinevadLauaSeisud().tammiTavaKäigudMust)).toEqual([[[1, 6]]]);
    expect(annaRuuduKäigud([1, 0], ErinevadLauaSeisud().tammiTavaKäigudMust)).toEqual([[[2, 1]]]);
    expect(annaRuuduKäigud([3, 6], ErinevadLauaSeisud().tammiTavaKäigudMust)).toEqual([[[4, 7]], [[2, 7]], [[2, 5]]]);
    expect(annaRuuduKäigud([4, 5], ErinevadLauaSeisud().tammiTavaKäigudMust)).toEqual([[[5, 6]], [[5, 4]], [[3, 4]]]);
    expect(annaRuuduKäigud([5, 2], ErinevadLauaSeisud().tammiTavaKäigudMust)).toEqual([[[6, 3]], [[6, 1]], [[4, 3]], [[4, 1]]]);
    expect(annaRuuduKäigud([7, 0], ErinevadLauaSeisud().tammiTavaKäigudMust)).toEqual([[[6, 1]]]);
    expect(annaRuuduKäigud([7, 6], ErinevadLauaSeisud().tammiTavaKäigudMust)).toEqual([[[6, 7]], [[6, 5]]]);
  });

  it("Tammi ühe sammulised söömised seinad valge", () => {
    expect(annaRuuduKäigud([1, 6], ErinevadLauaSeisud().tammiÜheSammulisedSöömisedValgeSeinad)).toEqual([[[2, 5]]]);
    expect(annaRuuduKäigud([6, 1], ErinevadLauaSeisud().tammiÜheSammulisedSöömisedValgeSeinad)).toEqual([[[5, 2]]]);
  });

  it("Tammi ühe sammulised söömised seinad must", () => {
    expect(annaRuuduKäigud([1, 6], ErinevadLauaSeisud().tammiÜheSammulisedSöömisedMustSeinad)).toEqual([[[2, 5]]]);
    expect(annaRuuduKäigud([6, 1], ErinevadLauaSeisud().tammiÜheSammulisedSöömisedMustSeinad)).toEqual([[[5, 2]]]);
  });


  it("Tammi ühe sammulised söömised valge, kui nupud on blokitud", () => {
    expect(annaRuuduKäigud([3, 4], ErinevadLauaSeisud().tammiÜheSammulisedSöömisedValgeBlokitud).length).toEqual(0);
  });

  it("Tammi ühe sammulised söömised must, kui nupud on blokitud", () => {
    expect(annaRuuduKäigud([3, 4], ErinevadLauaSeisud().tammiÜheSammulisedSöömisedMustBlokitud).length).toEqual(0);
  });

  it("Tammi ühe sammulised söömised valge", () => {
    const käigud = annaRuuduKäigud([3, 4], ErinevadLauaSeisud().tammiÜheSammulisedSöömisedValge);
    expect(käigud.length).toEqual(4);
    expect(käigud[3]).toEqual([[1, 6]]);
    expect(käigud[2]).toEqual([[1, 2]]);
    expect(käigud[1]).toEqual([[5, 6]]);
    expect(käigud[0]).toEqual([[5, 2]]);
  });

  it("Tammi ühe sammulised söömised must", () => {
    const käigud = annaRuuduKäigud([3, 4], ErinevadLauaSeisud().tammiÜheSammulisedSöömisedMust);
    expect(käigud.length).toEqual(4);
    expect(käigud[3]).toEqual([[5, 2]]);
    expect(käigud[2]).toEqual([[5, 6]]);
    expect(käigud[1]).toEqual([[1, 2]]);
    expect(käigud[0]).toEqual([[1, 6]]);
  });

  it("Tammi söömised rasked valge", () => {
    const käigud = annaRuuduKäigud([2, 1], ErinevadLauaSeisud().tammiSöömisedKeerulineValge);
    expect(käigud.length).toEqual(6);
    expect(käigud[5]).toEqual([[0, 3]]);
    expect(käigud[0]).toEqual([[4, 3], [6, 1]]);
    expect(käigud[4]).toEqual([[4, 3], [2, 5], [0, 7]]);
    expect(käigud[3]).toEqual([[4, 3], [2, 5], [4, 7], [6, 5], [4, 3], [6, 1]]);
    expect(käigud[2]).toEqual([[4, 3], [6, 5], [4, 7], [2, 5], [0, 7]]);
    expect(käigud[1]).toEqual([[4, 3], [6, 5], [4, 7], [2, 5], [4, 3], [6, 1]]);
  });

  it("Tammi söömised rasked must", () => {
    const käigud = annaRuuduKäigud([2, 1], ErinevadLauaSeisud().tammiSöömisedKeerulineMust);
    expect(käigud.length).toEqual(6);
    expect(käigud[0]).toEqual([[0, 3]]);
    expect(käigud[5]).toEqual([[4, 3], [6, 1]]);
    expect(käigud[1]).toEqual([[4, 3], [2, 5], [0, 7]]);
    expect(käigud[2]).toEqual([[4, 3], [2, 5], [4, 7], [6, 5], [4, 3], [6, 1]]);
    expect(käigud[3]).toEqual([[4, 3], [6, 5], [4, 7], [2, 5], [0, 7]]);
    expect(käigud[4]).toEqual([[4, 3], [6, 5], [4, 7], [2, 5], [4, 3], [6, 1]]);
  });

});


