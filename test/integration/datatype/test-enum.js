'use strict';

const base = require('../../base.js');
const { assert } = require('chai');

describe('enum', () => {
  it('enum type verification', done => {
    shareConn.query(
      'CREATE TEMPORARY TABLE fruits (\n' +
        '  id INT NOT NULL auto_increment PRIMARY KEY,\n' +
        "  fruit ENUM('apple','orange','pear'),\n" +
        '  bushels INT)'
    );
    shareConn.query('INSERT INTO fruits (fruit,bushels) VALUES (?, ?)', ['pear', 20]);
    shareConn.query('INSERT INTO fruits (fruit,bushels) VALUES (?, ?)', ['apple', 100]);
    shareConn.query('INSERT INTO fruits (fruit,bushels) VALUES (?, ?)', [2, 110]);
    shareConn.query('INSERT INTO fruits (fruit,bushels) VALUES (?, ?)', [null, 120]);
    shareConn
      .query('SELECT * FROM fruits')
      .then(rows => {
        assert.deepEqual(rows, [
          { id: 1, fruit: 'pear', bushels: 20 },
          { id: 2, fruit: 'apple', bushels: 100 },
          { id: 3, fruit: 'orange', bushels: 110 },
          { id: 4, fruit: null, bushels: 120 }
        ]);
        done();
      })
      .catch(done);
  });
});
