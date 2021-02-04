const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const Busboy = require('busboy');
const url = require('url');
const { Writable } = require('stream');
const { upload } = require('../database/typeorm/storage');

function storeProfileService(req, res) {
  let worker = {};
  const busboy = new Busboy({ headers: req.headers });

  function abort() {
    req.unpipe(busboy);
    if (!req.aborted) {
      res.statusCode = 413;
      res.end();
    }
  }
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    upload(worker, fieldname, file, mimetype, abort)
  });
  busboy.on('field', (fieldname, val) => {
    worker[fieldname] = val;
  });
  busboy.on('finish', async () => {
    await setWorker(worker);
    await setValueToDb();
    res.write('data berhasil di tambahkan');
    res.end();
  });

  req.on('aborted', abort);
  busboy.on('error', abort);

  req.pipe(busboy);
}

async function getValueByNameService(req, res) {
  const uri = url.parse(req.url, true);
  const filename = uri.pathname.replace('/find/', '');
  if (!filename) {
    res.statusCode = 400;
    res.write('request tidak sesuai');
    res.end();
  }
  const value = await getValueByName(filename);
  res.setHeader('Content-Type', 'application/json');
  const data = JSON.stringify(value);
  res.statusCode = 200;
  res.write(data);
  res.end();
}

async function getValueService(req, res) {
  const value = await getValue();
  res.setHeader('Content-Type', 'application/json');
  const data = JSON.stringify(value.worker);
  res.statusCode = 200;
  res.write(data);
  res.end();
}
async function delValueService(req, res) {
  const uri = url.parse(req.url, true);
  const filename = uri.pathname.replace('/del/', '');
  if (!filename) {
    res.statusCode = 400;
    res.write('request tidak sesuai');
    res.end();
  }
  const value = await delValueWorker(filename);
  await setValueToDb();
  if (!value) {
    res.statusCode = 404;
    res.write('data tidak ditemukan');
    res.end();
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.write(value);
  res.end();
}

module.exports = {
  storeProfileService,
  getValueService,
  delValueService,
  getValueByNameService,
};
