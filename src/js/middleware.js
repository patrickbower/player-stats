'use strict';

import * as utils from './utils';

const config = {
  playerstats: 'player-stats.json'
}

export function getPlayerstats(callback) {
  const rawData =  utils.request(config.playerstats, callback);
  return rawData.then(data => {
    data.players.push({
      'tester': 'this is a test'
    })
    return data.players;
  })
}
