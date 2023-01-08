const hinda = (mängija, mängulaud) => {
  let valgeSkoor = 0;
  let mustaSkoor = 0;

  for (let i = 0; i < mängulaud.length; i++) {
    for (let j = 0; j < mängulaud[0].length; j++) {
      if (mängulaud[i][j] !== null) {
        if (mängulaud[i][j].player === "valge") {
          if (mängulaud[i][j].powerful)
            valgeSkoor += 2;
          else
            valgeSkoor++;
        } else {
          if (mängulaud[i][j].powerful)
            mustaSkoor += 2;
          else
            mustaSkoor++;
        }
      }
    }
  }
  if (mängija === "valge")
    return valgeSkoor-mustaSkoor;
  else
    return mustaSkoor-valgeSkoor;
}

export default hinda;