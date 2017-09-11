'use strict';

export function request(url, callback) {
    const statsPromise = fetch(`../data/${url}`);

    return statsPromise
        .then(data => data.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error(err);
        });
}
