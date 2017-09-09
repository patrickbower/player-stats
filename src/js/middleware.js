'use strict';

import * as utils from './utils';

const config = {
  api: '../data/',
  playerstats: 'player-stats.json'
}

export function getPlayerstats() {

  const url = `${config.api}${config.playerstats}`;
  const rawData =  utils.request(url);

  return rawData.then(data => {

    const list = {};

    const { players } = data;
    for (let { player, stats } of players) {

      const slug = `${player.name.first}-${player.name.last}`.toLowerCase();

      list[slug] = {
        name: `${player.name.first} ${player.name.last}`,
        position: player.info.positionInfo.split(' ').pop()
      };

      for (let stat of stats) {
        if (stat.name === 'appearances') {
          list[slug].appearances = stat.value
        }
        if (stat.name === 'goals') {
          list[slug].goals = stat.value
        }
      }

    }

    console.log(list);

    return data.players;
  })
}
