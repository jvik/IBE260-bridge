const players = []; // dummy database

function generatePlayerId() {
  const playerId = players.length + 1;
  return playerId;
};

function createPlayer(direction, name) {
  const playerId = generatePlayerId();
  const player = {id: playerId, direction, name};
  players.push(player);

  return player;
}

export { generatePlayerId, createPlayer, players }
