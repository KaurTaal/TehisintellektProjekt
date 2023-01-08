import {kasSaabKäia} from "@/scripts/annaRuuduKäigud";
import annaKõikKäigud from "@/scripts/annaKõikKäigud";


const kasLõpp = (mängija, mänguLaud) => {
  const käigud = annaKõikKäigud(mängija, mänguLaud);

  return käigud.length === 0;
}

export default kasLõpp;