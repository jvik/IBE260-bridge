const players = []; // dummy database

// Functions
function generatePlayerId() {
  const playerId = players.length + 1;
  return playerId;
};

function createPlayer(direction, name) {
  // 1. Generate ID
  const playerId = generatePlayerId();
  // 2. Make player object
  const player = {id: playerId, direction, name};
  // 3. Push to players "database"
  players.push(player);
  // 4. Return player object simultaneously
  return player;
}

export { generatePlayerId, createPlayer, players }
