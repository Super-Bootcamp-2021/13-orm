const { Client, Pool } = require('pg');

const client = new Client({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'sanbercode1',
});

const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'sanbercode1',
});

// async
function csp(callback) {
  client.connect();
  client.query('select * from todo', (err, res) => {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }
    console.log(`number of rows ${res.rowCount}`);
    for (const row of res.rows) {
      console.log(row);
    }
    client.end();
    callback(null, res);
  });
}

// async
async function withPool() {
  const client2 = await pool.connect();
  try {
    const res = await client2.query('select * from todo');
    console.log(`number of rows ${res.rowCount}`);
    for (const row of res.rows) {
      console.log(row);
    }
  } catch (err) {
    console.error(err);
  }
  client2.release();
}

async function transaction() {
  const client2 = await pool.connect();
  try {
    await client2.query('begin');
    for (let i = 0; i < 10; i++) {
      await client2.query('insert into todo (job) values ($1)', [
        'perkerjaan' + i,
      ]);
    }
    await client2.query('commit');
  } catch (err) {
    await client2.query('rollback');
  }
  client2.release();
}

module.exports = {
  csp,
  withPool,
  transaction,
};
