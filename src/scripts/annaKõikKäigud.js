import {annaRuuduKäigud} from "@/scripts/annaRuuduKäigud";


const annaKõikKäigud = (mängija, mängulaud) => {
  let koopia = JSON.parse(JSON.stringify(mängulaud));
  koopia = removeDestinations(koopia);
  const söömised = [];
  const käigud = [];
  let kõikLiikumised;
  let käik;

  for (let i = 0; i < koopia.length; i++) {
    for (let j = 0; j < koopia[0].length; j++) {
      if (koopia[i][j] !== null && koopia[i][j].player === mängija) {
        kõikLiikumised = annaRuuduKäigud([i, j], koopia);

        for (let k = 0; k < kõikLiikumised.length; k++) {
          käik = [[i, j]];
          käik.push(kõikLiikumised[k]);
          if (kasToimusSöömine(käik))
            söömised.push(käik);
          else
            käigud.push(käik);
        }

      }
    }
  }
  if (söömised.length !== 0)
    return söömised;
  return käigud;
}

const kasToimusSöömine = (käik) => {
  const algusRida = käik[0][0];
  const lõpuRida = käik[1][0][0];

  if (Math.abs(algusRida - lõpuRida) === 2)
    return true;
  else
    return false;
}

const removeDestinations = (gameField) =>{
  if (gameField.length > 0) {
    for (let i = 0; i < gameField.length; i++) {
      for (let j = 0; j < gameField[0].length; j++) {
        if (gameField[i][j] !== null && gameField[i][j].tüüp === "sihtkoht")
          gameField[i][j] = null;
      }
    }
  }
  return gameField;
}


export default annaKõikKäigud;