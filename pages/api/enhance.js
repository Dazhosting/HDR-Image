import axios from 'axios';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const busboy = await import('busboy');
  const bb = busboy.default({ headers: req.headers });

  let buffer, method = 1, size = 'low';

  bb.on('file', (_, file) => {
    const chunks = [];
    file.on('data', (data) => chunks.push(data));
    file.on('end', () => {
      buffer = Buffer.concat(chunks);
    });
  });

  bb.on('field', (name, val) => {
    if (name === 'method') method = parseInt(val);
    if (name === 'size') size = val;
  });

  bb.on('finish', async () => {
    try {
      if (!buffer) return res.status(400).end('No image uploaded.');

      const sizes = ['low', 'medium', 'high'];
      if (!sizes.includes(size)) throw new Error('Invalid size');
      if (![1, 2, 3, 4].includes(method)) throw new Error('Invalid method');

      const form = new FormData();
      form.append('method', method.toString());
      form.append('is_pro_version', 'false');
      form.append('is_enhancing_more', 'false');
      form.append('max_image_size', size);
      form.append('file', buffer, `ihancer_${Date.now()}.jpg`);

      const result = await axios.post('https://ihancer.com/api/enhance', form, {
        headers: {
          ...form.getHeaders(),
          'accept-encoding': 'gzip',
          'user-agent': 'Dart/3.5 (dart:io)',
        },
        responseType: 'arraybuffer',
      });

      res.setHeader('Content-Type', 'image/jpeg');
      return res.end(result.data);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  req.pipe(bb);
}
