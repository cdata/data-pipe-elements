'use strict';

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(':memory:');

const readiesDb = Symbol('readiesDb');

class WordArtResource {
  constructor() {
    this[readiesDb] = new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS word_art(
            id INTEGER PRIMARY KEY ASC,
            foreground TEXT,
            background TEXT,
            text TEXT);`, (error) => error ? reject(error) : resolve());
      });
    });
  }

  read(id) {
    console.log(`READ WORD ART ${id}`);

    if (id == null || id === '') {
      return Promise.reject(new Error('Invalid or missing ID.'));
    }

    return this[readiesDb].then(() => {
      return new Promise((resolve, reject) => {
        db.serialize(() => {
          db.get("SELECT * FROM word_art WHERE id = ?;", [id], (error, row) => {
            if (error) {
              reject(error);
            } else {
              resolve(row);
            }
          });
        });
      });
    });
  }

  index(filter) {
    console.log(`INDEX WORD ART (${filter || 'NO FILTER'})`);

    return this[readiesDb].then(() => {
      return new Promise((resolve, reject) => {
        db.serialize(() => {
          db.all('SELECT * FROM word_art LIMIT 100;', (error, rows) => {
            if (error) {
              reject(error);
            } else {
              resolve(rows);
            }
          });
        });
      });
    });
  }

  create(data) {
    console.log(`CREATE WORD ART ${JSON.stringify(data)}`);

    if (!data.foreground || !data.background || !data.text) {
      return Promise.reject(new Error('Invalid field values.'));
    }

    return this[readiesDb].then(() => {
      return new Promise((resolve, reject) => {
        db.serialize(() => {
          db.run(`INSERT INTO word_art
              (foreground, background, text)
              VALUES (?, ?, ?)`,
              [data.foreground, data.background, data.text], function(error, row) {
                if (error) {
                  reject(error);
                } else {
                  resolve({
                    id: this.lastID
                  });
                }
              });
        });
      });
    });
  }

  update(id, data) {
    console.log(`UPDATE WORD ART ${id} => ${JSON.stringify(data)}`);

    if (id == null || id === '') {
      return Promise.reject(new Error('Invalid or missing ID.'));
    }

    if (!data.foreground || !data.background || !data.text) {
      return Promise.reject(new Error('Invalid field values.'));
    }

    return this[readiesDb].then(() => {
      return new Promise((resolve, reject) => {
        db.serialize(() => {
          db.run(`UPDATE word_art
              SET foreground = ?, background = ?, text = ?
              WHERE id = ?;`,
              [data.foreground, data.background, data.text, id], (error) => {
                if (error) {
                  reject(error);
                } else {
                  resolve();
                }
              });
        });
      });
    });
  }
}

module.exports = WordArtResource;
