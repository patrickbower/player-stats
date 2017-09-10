'use strict';

import * as middleware from './middleware';

class PlayerStats {
  constructor(PlayerStats) {
    const stats = middleware.getPlayerStats();
    stats.then(response => {
      this.init(response);
    })
  }

  init(response) {
    this.statsData = response;
    this.render();
  }

  render() {
    console.log('render', this.statsData);
  }
}

export default PlayerStats;
