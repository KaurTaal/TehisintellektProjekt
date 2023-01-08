import annaKõikKäigud from "@/scripts/annaKõikKäigud";

const annaRumalAiKäik = (mängija, mängulaud) => {
  const käigud = annaKõikKäigud(mängija, mängulaud);
  const pikkus = käigud.length;
  const käik = suvalineNumber(pikkus);
  return käigud[käik];
}

const suvalineNumber = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

export default annaRumalAiKäik;