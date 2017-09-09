'use strict';

import * as middleware from './middleware';

class PlayerStats {
  constructor(PlayerStats) {
    const stats = middleware.getPlayerstats();
    stats.then(response => {
      this.init(response);
    })
  }

  init(response) {
    console.log('init', response);
  }
}

export default PlayerStats;
