'use strict';

import * as utils from './utils';

const config = {
    api: '../data/',
    playerstats: 'player-stats.json'
};

export function getPlayerStats() {
    const url = `${config.api}${config.playerstats}`;
    const rawData = utils.request(url);

    return rawData.then(data => {
        const list = {};

        const { players } = data;
        for (let { player, stats } of players) {
            const slug = `${player.name.first}-${player.name
                .last}`.toLowerCase();

            var statsCollection = {};
            stats.map(item => {
                statsCollection[item.name] = item.value;
                return statsCollection;
            });

            list[slug] = {
                name: `${player.name.first} ${player.name.last}`,
                slug: slug,
                id: player.id,
                position: player.info.positionInfo.split(' ').pop(),
                stats: statsCollection,
                teamSlug: `${player.currentTeam.name}`
                    .toLowerCase()
                    .replace(' ', '-')
            };
        }

        return list;
    });
}
