'use strict';

import * as middleware from './middleware';

class PlayerStats {
  constructor(PlayerStats) {
    const stats = middleware.getPlayerStats();
    stats.then(response => {
      this.init(response);
    })

    this.config = {
      template: '.js-player-template',
      player: '.js-player',
      card: '.js-card'
    }
  }

  init(response) {
    this.statsData = response;
    this.getTemplate();
    // this.setTemplate();
    this.render();
  }

  getTemplate() {
    this.template = document.querySelector(this.config.template).innerHTML;
  }

  // setTemplate() {
  //   const card = document.querySelector(this.config.card);
  //   card.insertAdjacentHTML('afterbegin', this.template);
  // }

  render() {
    // const data = this.statsData
    // for (let player in data) {
    //   console.log(player);
    //   console.log(data[player]);
    // }

    var listHtml = '';

    const data = this.statsData

    for (var player in data) {
      console.log(data[player]);
      listHtml += this.template
        .replace(/{name}/g, data[player]['name'])
        .replace(/{position}/g, data[player]['position'])
        .replace(/{appearances}/g, data[player].stats['appearances'])
        .replace(/{goals}/g, data[player].stats['goals'])
        .replace(/{assists}/g, data[player].stats['goal_assist'] || 0)
        .replace(/{gpm}/g, Math.floor(data[player].stats['goals'] / data[player].stats['appearances']))
        .replace(/{ppm}/g, Math.floor(data[player].stats['backward_pass'] + data[player].stats['fwd_pass'] / data[player].stats['mins_played']))
        .replace(/{id}/g, data[player]['id'])
        .replace(/{teamSlug}/g, data[player]['teamSlug'])
    }

    const card = document.querySelector(this.config.card);
    card.insertAdjacentHTML('afterbegin', listHtml);

  }
}

export default PlayerStats;
