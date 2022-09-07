import sqlite3 from 'sqlite3';

export default async function handler(req, res) {
  const fetchAll = (db, query) => {
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  };

  const db = new sqlite3.Database('../api/tests/test.sqlite3');

  const messages = await fetchAll(db, 'select * from message');
  db.close();
  res.status(200).json({'text': 'Hello'});
}
