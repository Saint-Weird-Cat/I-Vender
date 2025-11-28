const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const stream = require('stream');

module.exports = function(pool) {
  const router = express.Router();
  const upload = multer({ storage: multer.memoryStorage() });

  const s3 = new AWS.S3({
    endpoint: process.env.MINIO_ENDPOINT || 'http://minio:9000',
    accessKeyId: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretAccessKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
  });

  router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'no file' });
    const bucket = process.env.MINIO_BUCKET || 'ivendor-docs';
    try {
      // ensure bucket exists
      try { await s3.headBucket({ Bucket: bucket }).promise(); } catch (e) { await s3.createBucket({ Bucket: bucket }).promise(); }
      const key = `${Date.now()}-${req.file.originalname}`;
      await s3.putObject({ Bucket: bucket, Key: key, Body: req.file.buffer }).promise();
      const meta = { bucket, path: key, originalName: req.file.originalname, size: req.file.size };
      const { rows } = await pool.query('INSERT INTO documents (user_id,bucket,path,meta) VALUES ($1,$2,$3,$4) RETURNING id', [req.body.user_id || null, bucket, key, meta]);
      res.json({ ok: true, id: rows[0].id, meta });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
