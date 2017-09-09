'use strict';

import * as middleware from './middleware';

class PlayerStats {
  constructor(PlayerStats) {
    const stats = middleware.getPlayerstats();
    stats.then(res => {
      this.init(res);
    })
  }

  init(res) {
    console.log('init', res);
  }
}

export default PlayerStats;
