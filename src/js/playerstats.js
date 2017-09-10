'use strict';

import * as middleware from './middleware';

class PlayerStats {
  constructor(PlayerStats) {
    const stats = middleware.getPlayerStats();
    stats.then(response => {
      this.init(response);
    })

    this.config = {
      playerTemplate: '.js-player-template',
      selectTemplate: '.js-select-template',
      player: '.js-player',
      card: '.js-card',
      select: '.js-select',
    }

    this.activePlayer = 'toby-alderweireld';
  }

  init(response) {
    this.statsData = response;
    this.getPlayerTemplate();
    this.getSelectTemplate();
    this.renderPlayers();
    this.renderSelect();
    this.bind();
    this.start();
  }

  getPlayerTemplate() {
    this.playerTemplate = document.querySelector(this.config.playerTemplate).innerHTML;
  }

  getSelectTemplate() {
    this.selectTemplate = document.querySelector(this.config.selectTemplate).innerHTML;
  }

  renderPlayers() {
    let playersHTML = '';
    const data = this.statsData

    for (var player in data) {
      playersHTML += this.playerTemplate
        .replace(/{name}/g, data[player]['name'])
        .replace(/{position}/g, data[player]['position'])
        .replace(/{appearances}/g, data[player].stats['appearances'])
        .replace(/{goals}/g, data[player].stats['goals'])
        .replace(/{assists}/g, data[player].stats['goal_assist'] || 0)
        .replace(/{gpm}/g, (data[player].stats['goals'] / data[player].stats['appearances']).toFixed(1) )
        .replace(/{ppm}/g, (data[player].stats['mins_played'] / (data[player].stats['backward_pass'] + data[player].stats['fwd_pass'])).toFixed(1))
        .replace(/{id}/g, data[player]['id'])
        .replace(/{team-slug}/g, data[player]['teamSlug'])
        .replace(/{player-slug}/g, data[player]['slug'])
    }

    const card = document.querySelector(this.config.card);
    card.insertAdjacentHTML('afterbegin', playersHTML);
  }

  renderSelect() {
    let selectHTML = '';
    const data = this.statsData

    for (var player in data) {
      selectHTML += this.selectTemplate
        .replace(/{value}/g, data[player]['slug'])
        .replace(/{name}/g, data[player]['name'])
    }

    const select = document.querySelector(this.config.select);
    select.insertAdjacentHTML('beforeend', selectHTML);
  }

  bind() {
    const instance = this;

    const select = document.querySelector(this.config.select);
    select.addEventListener('change', function(event) {
      event.preventDefault();
      var selectedOption = this[this.selectedIndex];
      instance.changePlayer(selectedOption.value);
    });
  }

  changePlayer(option) {

    document.querySelector(`#${this.activePlayer}`).classList.remove('active');

    const player = document.querySelector(`#${option}`);
    player.classList.add('active');

    this.activePlayer = option;
  }

  start() {
    document.querySelector(`#${this.activePlayer}`).classList.add('active');
  }

}

export default PlayerStats;
