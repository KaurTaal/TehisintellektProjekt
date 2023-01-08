const fields = () => {
  return {
    whiteMoveFields: [
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, {player: "must", powerful: false}, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, {player: "valge", powerful: false}],
        [null, null, null, null, null, null, null, null]
      ]
    ],

    blackMoveFields: [
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [{player: "must", powerful: true}, null, {player: "valge", powerful: true}, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [{player: "valge", powerful: true}, null, null, null, null, null, null, null]
      ]
    ]
  }
};

export default fields;