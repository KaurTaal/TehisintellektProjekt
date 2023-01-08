export const sooritaKäik = (käik, mänguväljak) => {
  const koopia = JSON.parse(JSON.stringify(mänguväljak));

  const nupuVärv = koopia[käik[0][0]][käik[0][1]].player;
  const nupp = koopia[käik[0][0]][käik[0][1]];
  const algusRida = käik[0][0];
  const algusTulp = käik[0][1];
  const lõpuRida = käik[1][0];
  const lõpuTulp = käik[1][1];


  if (kasToimusSöömine(käik)) {
    //Sõi ülesse paremale
    if (lõpuRida - algusRida < 0 && lõpuTulp - algusTulp > 0) {
      const eemaldaRida = algusRida - 1;
      const eemaldaTulp = algusTulp + 1;
      koopia[algusRida][algusTulp] = null;
      koopia[eemaldaRida][eemaldaTulp] = null;
      koopia[lõpuRida][lõpuTulp] = nupp;
    }

    //Sõi ülesse vasakule
    if (lõpuRida - algusRida < 0 && lõpuTulp - algusTulp < 0) {
      const eemaldaRida = algusRida - 1;
      const eemaldaTulp = algusTulp - 1;
      koopia[algusRida][algusTulp] = null;
      koopia[eemaldaRida][eemaldaTulp] = null;
      koopia[lõpuRida][lõpuTulp] = nupp;
    }

    //Sõi alla vasakule
    if (lõpuRida - algusRida > 0 && lõpuTulp - algusTulp < 0) {
      const eemaldaRida = algusRida + 1;
      const eemaldaTulp = algusTulp - 1;
      koopia[algusRida][algusTulp] = null;
      koopia[eemaldaRida][eemaldaTulp] = null;
      koopia[lõpuRida][lõpuTulp] = nupp;
    }

    //Sõi alla paremale
    if (lõpuRida - algusRida > 0 && lõpuTulp - algusTulp > 0) {
      const eemaldaRida = algusRida + 1;
      const eemaldaTulp = algusTulp + 1;
      koopia[algusRida][algusTulp] = null;
      koopia[eemaldaRida][eemaldaTulp] = null;
      koopia[lõpuRida][lõpuTulp] = nupp;
    }

  } else {
    koopia[algusRida][algusTulp] = null;
    koopia[lõpuRida][lõpuTulp] = nupp;
  }

  if (kasMuutusTammiks(käik, nupuVärv)) {
    koopia[lõpuRida][lõpuTulp].powerful = true;
  }
  return koopia;
}


export const kasToimusSöömine = (käik) => {
  const rida = käik[0][0];
  const lõpuRida = käik[1][0];

  if (Math.abs(rida - lõpuRida) === 2)
    return true;
  else
    return false;
}

const kasMuutusTammiks = (käik, nupp) => {
  const lõpuRida = käik[1][0];
  if (nupp === "must" && lõpuRida === 7)
    return true;
  if (nupp === "valge" && lõpuRida === 0)
    return true;
  return false;
}


export default {sooritaKäik, kasToimusSöömine}