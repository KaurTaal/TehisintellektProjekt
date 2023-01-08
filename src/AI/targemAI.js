import annaKõikKäigud from "@/scripts/annaKõikKäigud";
import {sooritaKäik} from "@/scripts/sooritaKäik";
import hinda from "@/scripts/hinda";

const winscore = 100000;
const losescore = -100000;

const annaAiKäik = (mängija, mängulaud, sügavus, teekond, esialgneMängija) => {

  if (sügavus === 0) {
    return {hinne: hinda(esialgneMängija, mängulaud), tee: teekond};
  }

  let käigud = annaKõikKäigud(mängija, mängulaud);
  käigud = shuffleArray(käigud);
  if (käigud.length === 0) {
    if (mängija === esialgneMängija)
      return {hinne: losescore, tee: teekond};
    else
      return {hinne: winscore, tee: teekond};
  }

  const harud = [];

  for (let i = 0; i < käigud.length; i++) {
    const käik = käigud[i];
    let asukoht = käik[0];
    let koopia = JSON.parse(JSON.stringify(mängulaud));
    for (let j = 0; j < käik[1].length; j++) {
      koopia = sooritaKäik([asukoht, käik[1][j]], koopia);
      asukoht = käik[1][j];
    }
    const tee = JSON.parse(JSON.stringify(teekond));
    tee.push(käik)
    harud.push(annaAiKäik(mängija === "valge" ? "must" : "valge", koopia, sügavus - 1, tee, esialgneMängija));
  }

  let maxHaru = {hinne: losescore, tee : []};
  for (let i = 0; i < harud.length; i++) {
    if (harud[i].hinne >= maxHaru.hinne) {
      maxHaru = harud[i];
    }
  }

  return maxHaru;

}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default annaAiKäik;