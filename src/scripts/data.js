
const getInitialGameField = ()=> {
  return [
    [null, {player:"must", powerful: false}, null, {player:"must", powerful: false}, null, {player:"must", powerful: false}, null, {player:"must", powerful: false}],
    [{player:"must", powerful: false}, null, {player:"must", powerful: false}, null, {player:"must", powerful: false}, null, {player:"must", powerful: false}, null],
    [null, {player:"must", powerful: false}, null, {player:"must", powerful: false}, null, {player:"must", powerful: false}, null, {player:"must", powerful: false}],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [{player:"valge", powerful: false}, null, {player:"valge", powerful: false}, null, {player:"valge", powerful: false}, null, {player:"valge", powerful: false}, null],
    [null, {player:"valge", powerful: false}, null, {player:"valge", powerful: false}, null, {player:"valge", powerful: false}, null, {player:"valge", powerful: false}],
    [{player:"valge", powerful: false}, null, {player:"valge", powerful: false}, null, {player:"valge", powerful: false}, null, {player:"valge", powerful: false}, null]
  ]
}

export default getInitialGameField;

