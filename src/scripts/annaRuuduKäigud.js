import {sooritaKäik} from "@/scripts/sooritaKäik";


export const annaRuuduKäigud = (ruut, mänguväljak) => {
  const kasOnTamm = mänguväljak[ruut[0]][ruut[1]].powerful;
  const söömised = annaSöömised(ruut, mänguväljak);

  if (söömised.length !== 0)
    return söömised;

  return kasOnTamm ? tammiNupuKäigud(ruut, mänguväljak) : tavanupuKäigud(ruut, mänguväljak);

}//RuuduKäigud


export const annaSöömised = (ruut, mänguväljak) => {
  const kasOnTamm = mänguväljak[ruut[0]][ruut[1]].powerful;
  const vastus = [];
  const stack = [];

  const söömised = kasOnTamm ? tammiSöömised(ruut, mänguväljak) : tavaNupuSöömised(ruut, mänguväljak);
  if (söömised.length === 0)
    return [];

  for (let i = 0; i < söömised.length; i++) {
    stack.push({
      field: sooritaKäik([ruut, söömised[i][0]], mänguväljak),
      tee: [söömised[i][0]]
    });
  }

  while (stack.length !== 0) {
    const seis = stack.pop()
    const kasOnTamm = seis.field[seis.tee[seis.tee.length - 1][0]][seis.tee[seis.tee.length - 1][1]].powerful;
    const söömised = kasOnTamm ? tammiSöömised(seis.tee[[seis.tee.length - 1]], seis.field) : tavaNupuSöömised(seis.tee[[seis.tee.length - 1]], seis.field);
    if (söömised.length === 0)
      vastus.push(seis.tee)
    else {
      for (let i = 0; i < söömised.length; i++) {
        const uusSeis = sooritaKäik([seis.tee[seis.tee.length - 1], söömised[i][0]], seis.field)
        stack.push({
          field: uusSeis,
          tee: [...seis.tee, söömised[i][0]]
        });
      }//for
    }//else
  }//While
  return vastus;
};


const tavaNupuSöömised = (ruut, mänguväljak) => {
  const tavaNupp = [];
  if (kasSaabKäia(ruut, mänguväljak)) {
    if (kasSaabVasakule(ruut, mänguväljak))
      tavaNupp.push(tavaVasakuleSöömised(ruut, mänguväljak));

    if (kasSaabParemale(ruut, mänguväljak))
      tavaNupp.push(tavaParemaleSöömised(ruut, mänguväljak));
  }
  return tavaNupp;
}


const tammiSöömised = (ruut, mänguväljak) => {
  let võimalikudKäigudEtte = [];
  let võimalikudKäigudTaha = [];
  let tammiSöömisKäigud = [];

  //Vaatame tavanupu käigud üle
  if (kasSaabParemale(ruut, mänguväljak)) {
    võimalikudKäigudEtte.push(tavaParemaleSöömised(ruut, mänguväljak));
  }
  if (kasSaabVasakule(ruut, mänguväljak)) {
    võimalikudKäigudEtte.push(tavaVasakuleSöömised(ruut, mänguväljak));
  }
  //Ette söömised

  //Taha söömised
  if (kasSaabTahaParemale(ruut, mänguväljak)) {
    if (paremaleSöömisedTaha(ruut, mänguväljak)) {
      võimalikudKäigudTaha.push(paremaleSöömisedTaha(ruut, mänguväljak));
    }
  }

  if (kasSaabTahaVasakule(ruut, mänguväljak)) {
    if (vasakuleSöömisedTaha(ruut, mänguväljak)) {
      võimalikudKäigudTaha.push(vasakuleSöömisedTaha(ruut, mänguväljak));
    }
  }

  tammiSöömisKäigud = [...võimalikudKäigudEtte, ...võimalikudKäigudTaha];
  return tammiSöömisKäigud;

}//TammisSöömisKäigud


const tammiNupuKäigud = (ruut, mänguväljak) => {
  const nupp = mänguväljak[ruut[0]][ruut[1]].player;
  const võimalikudKäigud = [];
  võimalikudKäigud.push(...tavanupuKäigud(ruut, mänguväljak));

  if (nupp === "must") {
    const tulbaIndeks1 = ruut[1] + 1;
    const tulbaIndeks2 = ruut[1] - 1;
    const reaIndeks2 = ruut[0] - 1;

    if (mänguväljak[reaIndeks2]) {
      if (mänguväljak[reaIndeks2][tulbaIndeks1] === null)
        võimalikudKäigud.push([[reaIndeks2, tulbaIndeks1]])

      if (mänguväljak[reaIndeks2][tulbaIndeks2] === null)
        võimalikudKäigud.push([[reaIndeks2, tulbaIndeks2]])
    }
  }

  if (nupp === "valge") {
    const tulbaIndeks1 = ruut[1] - 1;
    const tulbaIndeks2 = ruut[1] + 1;
    const reaIndeks2 = ruut[0] + 1;

    if (mänguväljak[reaIndeks2]) {
      if (mänguväljak[reaIndeks2][tulbaIndeks2] === null)
        võimalikudKäigud.push([[reaIndeks2, tulbaIndeks2]])

      if (mänguväljak[reaIndeks2][tulbaIndeks1] === null)
        võimalikudKäigud.push([[reaIndeks2, tulbaIndeks1]])
    }
  }
  return võimalikudKäigud;
}

const kasSaabVasakule = (ruut, mänguväljak) => {
  const nupp = mänguväljak[ruut[0]][ruut[1]].player;

  if (nupp === "valge") {
    const reaIndeks = ruut[0] - 1;
    const tulbaIndeks = ruut[1] - 1;
    const järgmineRida = ruut[0] - 2;
    const järgmineTulp = ruut[1] - 2;

    if (!mänguväljak[järgmineRida])
      return false

    if (mänguväljak[reaIndeks][tulbaIndeks] && mänguväljak[reaIndeks][tulbaIndeks].player === "must") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        return true;
      } else return false;
    } else
      return false;
  }

  if (nupp === "must") {

    const reaIndeks = ruut[0] + 1;
    const tulbaIndeks = ruut[1] + 1; //Peegelpilt
    const järgmineRida = ruut[0] + 2;
    const järgmineTulp = ruut[1] + 2; //Peegelpilt

    if (!mänguväljak[järgmineRida])
      return false

    if (mänguväljak[reaIndeks][tulbaIndeks] && mänguväljak[reaIndeks][tulbaIndeks].player === "valge") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        return true;
      } else
        return false;
    } else
      return false;
  }
}

const kasSaabParemale = (ruut, mänguväljak) => {
  const nupp = mänguväljak[ruut[0]][ruut[1]].player;

  if (nupp === "valge") {
    const reaIndeks = ruut[0] - 1;
    const tulbaIndeks = ruut[1] + 1;
    const järgmineRida = ruut[0] - 2;
    const järgmineTulp = ruut[1] + 2;

    if (!mänguväljak[järgmineRida])
      return false

    if (mänguväljak[reaIndeks][tulbaIndeks] && mänguväljak[reaIndeks][tulbaIndeks].player === "must") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        return true;
      } else
        return false;
    } else
      return false;
  }


  if (nupp === "must") {
    const reaIndeks = ruut[0] + 1;
    const tulbaIndeks = ruut[1] - 1;
    const järgmineRida = ruut[0] + 2;
    const järgmineTulp = ruut[1] - 2;

    if (!mänguväljak[järgmineRida])
      return false;


    if (mänguväljak[reaIndeks][tulbaIndeks] && mänguväljak[reaIndeks][tulbaIndeks].player === "valge") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        return true;
      } else
        return false;
    } else
      return false;
  }
}


const kasSaabTahaVasakule = (ruut, mänguväljak) => {
  const nupp = mänguväljak[ruut[0]][ruut[1]].player;

  if (nupp === "must") {
    const reaIndeks = ruut[0] - 1;
    const tulbaIndeks = ruut[1] + 1;
    const järgmineRida = ruut[0] - 2;
    const järgmineTulp = ruut[1] + 2;

    if (!mänguväljak[järgmineRida])
      return false;

    if (mänguväljak[reaIndeks][tulbaIndeks] && mänguväljak[reaIndeks][tulbaIndeks].player === "valge") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        return true;
      } else
        return false;
    } else
      return false;
  }//MUST


  if (nupp === "valge") {
    const reaIndeks = ruut[0] + 1;
    const tulbaIndeks = ruut[1] - 1;
    const järgmineRida = ruut[0] + 2;
    const järgmineTulp = ruut[1] - 2;

    if (!mänguväljak[järgmineRida])
      return false;

    if (mänguväljak[reaIndeks][tulbaIndeks] && mänguväljak[reaIndeks][tulbaIndeks].player === "must") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        return true;
      } else
        return false;
    } else
      return false;
  }//VALGE

}

const kasSaabTahaParemale = (ruut, mänguväljak) => {
  const nupp = mänguväljak[ruut[0]][ruut[1]].player;

  if (nupp === "must") {
    const reaIndeks = ruut[0] - 1;
    const tulbaIndeks = ruut[1] - 1;
    const järgmineRida = ruut[0] - 2;
    const järgmineTulp = ruut[1] - 2;

    if (!mänguväljak[järgmineRida])
      return false;

    if (mänguväljak[reaIndeks][tulbaIndeks] && mänguväljak[reaIndeks][tulbaIndeks].player === "valge") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        return true;
      } else
        return false;
    } else
      return false;
  }//MUST


  if (nupp === "valge") {
    const reaIndeks = ruut[0] + 1;
    const tulbaIndeks = ruut[1] + 1;
    const järgmineRida = ruut[0] + 2;
    const järgmineTulp = ruut[1] + 2;

    if (!mänguväljak[järgmineRida])
      return false;

    if (mänguväljak[reaIndeks][tulbaIndeks] && mänguväljak[reaIndeks][tulbaIndeks].player === "must") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        return true;
      } else
        return false;
    } else
      return false;
  }//VALGE
}

export const kasSaabTahaKäia = (ruut, mänguväljak) => {
  const nupp = mänguväljak[ruut[0]][ruut[1]].player;

  if (nupp === "must") {
    const rida = ruut[0] - 1;
    const tulpP = ruut[1] + 1;
    const tulpV = ruut[1] - 1;

    if (!mänguväljak[rida])
      return false

    if (mänguväljak[rida][tulpP] === null || kasSaabTahaParemale(ruut, mänguväljak) || kasSaabTahaVasakule(ruut, mänguväljak)) {
      return true;
    } else if (mänguväljak[rida][tulpV] === null || kasSaabTahaParemale(ruut, mänguväljak) || kasSaabTahaVasakule(ruut, mänguväljak))
      return true;
    else
      return false;
  }//Must

  if (nupp === "valge") {
    const rida = ruut[0] + 1;
    const tulpP = ruut[1] + 1;
    const tulpV = ruut[1] - 1;

    if (!mänguväljak[rida])
      return false

    if (mänguväljak[rida][tulpP] === null || kasSaabTahaParemale(ruut, mänguväljak) || kasSaabTahaVasakule(ruut, mänguväljak)) {
      return true;
    } else if (mänguväljak[rida][tulpV] === null || kasSaabTahaParemale(ruut, mänguväljak) || kasSaabTahaVasakule(ruut, mänguväljak))
      return true;
    else
      return false;
  }//Valge

}


const paremaleSöömisedTaha = (ruut, mänguväljak) => {
  const nupp = mänguväljak[ruut[0]][ruut[1]].player;
  const võimalikudSöömised = [];

  if (nupp === "must") {
    const rida = ruut[0] - 1;
    const tulp = ruut[1] - 1;
    const järgmineRida = ruut[0] - 2;
    const järgmineTulp = ruut[1] - 2;


    if (mänguväljak[rida][tulp] && mänguväljak[rida][tulp].player === "valge") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        võimalikudSöömised.push([järgmineRida, järgmineTulp]);
      } else {
        return [];
      }
    } else
      return [];

    return võimalikudSöömised;
  }//Must

  if (nupp === "valge") {
    const rida = ruut[0] + 1;
    const tulp = ruut[1] + 1;
    const järgmineRida = ruut[0] + 2;
    const järgmineTulp = ruut[1] + 2;

    if (mänguväljak[rida][tulp] && mänguväljak[rida][tulp].player === "must") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        võimalikudSöömised.push([järgmineRida, järgmineTulp]);
      } else {
        return [];
      }
    } else
      return [];

    return võimalikudSöömised;
  }//Valge


}

const vasakuleSöömisedTaha = (ruut, mänguväljak) => {
  const nupp = mänguväljak[ruut[0]][ruut[1]].player;
  const võimalikudSöömised = [];

  if (nupp === "must") {
    const rida = ruut[0] - 1;
    const tulp = ruut[1] + 1;
    const järgmineRida = ruut[0] - 2;
    const järgmineTulp = ruut[1] + 2;

    if (mänguväljak[rida][tulp] && mänguväljak[rida][tulp].player === "valge") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        võimalikudSöömised.push([järgmineRida, järgmineTulp]);
      } else {
        return [];
      }
    } else
      return [];

    return võimalikudSöömised;
  }//Must

  if (nupp === "valge") {
    const rida = ruut[0] + 1;
    const tulp = ruut[1] - 1;
    const järgmineRida = ruut[0] + 2;
    const järgmineTulp = ruut[1] - 2;

    if (mänguväljak[rida][tulp] && mänguväljak[rida][tulp].player === "must") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        võimalikudSöömised.push([järgmineRida, järgmineTulp]);
      } else {
        return [];
      }
    } else
      return [];

    return võimalikudSöömised;
  }//Valge

}


const tavanupuKäigud = (ruut, mänguväljak) => {
  const nupp = mänguväljak[ruut[0]][ruut[1]].player;
  const võimalikudKäigud = [];

  if (nupp === "must") {
    const reaIndeks = ruut[0] + 1;
    const tulbaIndeks1 = ruut[1] + 1;
    const tulbaIndeks2 = ruut[1] - 1;

    if (mänguväljak[reaIndeks]) {
      if (mänguväljak[reaIndeks][tulbaIndeks1] === null)
        võimalikudKäigud.push([[reaIndeks, tulbaIndeks1]])


      if (mänguväljak[reaIndeks][tulbaIndeks2] === null)
        võimalikudKäigud.push([[reaIndeks, tulbaIndeks2]]);
    }
  }

  if (nupp === "valge") {
    const reaIndeks = ruut[0] - 1;
    const tulbaIndeks1 = ruut[1] - 1;
    const tulbaIndeks2 = ruut[1] + 1;

    if (mänguväljak[reaIndeks]) {
      if (mänguväljak[reaIndeks][tulbaIndeks1] === null)
        võimalikudKäigud.push([[reaIndeks, tulbaIndeks1]]);

      if (mänguväljak[reaIndeks][tulbaIndeks2] === null)
        võimalikudKäigud.push([[reaIndeks, tulbaIndeks2]]);
    }
  }

  return võimalikudKäigud;
}

const tavaVasakuleSöömised = (ruut, mänguväljak) => {
  const nupp = mänguväljak[ruut[0]][ruut[1]].player;

  if (nupp === "valge") {
    const võimalikudSöömised = [];

    const reaIndeks = ruut[0] - 1;
    const tulbaIndeks = ruut[1] - 1;
    const järgmineRida = ruut[0] - 2;
    const järgmineTulp = ruut[1] - 2;


    if (mänguväljak[reaIndeks][tulbaIndeks] && mänguväljak[reaIndeks][tulbaIndeks].player === "must") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        võimalikudSöömised.push([järgmineRida, järgmineTulp]);
      } else {
        return [];
      }
    } else
      return [];

    return võimalikudSöömised;


  }

  if (nupp === "must") {
    const võimalikudSöömised = [];

    const reaIndeks = ruut[0] + 1;
    const tulbaIndeks = ruut[1] + 1; //Peegelpilt
    const järgmineRida = ruut[0] + 2;
    const järgmineTulp = ruut[1] + 2; //Peegelpilt

    if (mänguväljak[reaIndeks][tulbaIndeks] && mänguväljak[reaIndeks][tulbaIndeks].player === "valge") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        võimalikudSöömised.push([järgmineRida, järgmineTulp]);
      } else         //Ei tea, kas on vaja, aga better safe than sorry
        return [];
    } else
      return [];

    return võimalikudSöömised;
  }

}

const tavaParemaleSöömised = (ruut, mänguväljak) => {
  const nupp = mänguväljak[ruut[0]][ruut[1]].player;

  if (nupp === "valge") {
    const võimalikudSöömised = [];

    const reaIndeks = ruut[0] - 1;
    const tulbaIndeks = ruut[1] + 1;
    const järgmineRida = ruut[0] - 2;
    const järgmineTulp = ruut[1] + 2;

    if (mänguväljak[reaIndeks][tulbaIndeks] && mänguväljak[reaIndeks][tulbaIndeks].player === "must") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        võimalikudSöömised.push([järgmineRida, järgmineTulp]);
      } else         //Ei tea, kas on vaja, aga better safe than sorry
        return [];
    } else
      return [];

    return võimalikudSöömised;
  }

  if (nupp === "must") {
    const võimalikudSöömised = [];
    const reaIndeks = ruut[0] + 1;
    const tulbaIndeks = ruut[1] - 1; //Peegelpilt
    const järgmineRida = ruut[0] + 2;
    const järgmineTulp = ruut[1] - 2; //Peegelpilt

    if (mänguväljak[reaIndeks][tulbaIndeks] && mänguväljak[reaIndeks][tulbaIndeks].player === "valge") {
      if (mänguväljak[järgmineRida][järgmineTulp] === null) {
        võimalikudSöömised.push([järgmineRida, järgmineTulp]);
      } else
        return [];
    } else
      return [];

    return võimalikudSöömised;
  }
}

export const kasSaabKäia = (ruut, mänguväljak) => {
  const nupp = mänguväljak[ruut[0]][ruut[1]].player;

  if (nupp === "must") {
    const reaIndeks = ruut[0] + 1;
    const tulbaIndeks1 = ruut[1] + 1;
    const tulbaIndeks2 = ruut[1] - 1;

    if (!mänguväljak[reaIndeks])
      return false

    if (mänguväljak[reaIndeks][tulbaIndeks1] === null || kasSaabParemale(ruut, mänguväljak) || kasSaabVasakule(ruut, mänguväljak)) {
      return true;
    } else if (mänguväljak[reaIndeks][tulbaIndeks2] === null || kasSaabParemale(ruut, mänguväljak) || kasSaabVasakule(ruut, mänguväljak))
      return true;
    else
      return false;

  }
  //VAlGE

  if (nupp === "valge") {
    const reaIndeks = ruut[0] - 1;
    const tulbaIndeks1 = ruut[1] - 1;
    const tulbaIndeks2 = ruut[1] + 1;

    if (!mänguväljak[reaIndeks])
      return false

    if (mänguväljak[reaIndeks][tulbaIndeks1] === null || kasSaabParemale(ruut, mänguväljak) || kasSaabVasakule(ruut, mänguväljak))
      return true;
    else if (mänguväljak[reaIndeks][tulbaIndeks2] === null || kasSaabParemale(ruut, mänguväljak) || kasSaabVasakule(ruut, mänguväljak))
      return true;
    else
      return false;
  }
}

export default {annaRuuduKäigud, annaSöömised}

