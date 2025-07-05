// pages/index.js
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState(1);
  const [size, setSize] = useState('low');
  const [error, setError] = useState(null);

  const submit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const form = new FormData();
      form.append('file', file);
      form.append('method', method);
      form.append('size', size);

      const res = await axios.post('/api/enhance', form, {
        responseType: 'blob'
      });

      const url = URL.createObjectURL(res.data);
      setImageUrl(url);
    } catch (err) {
      setError('❌ Gagal enhance gambar.');
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🧠 Ihancer - HDR Foto Generator</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <div className="mb-4">
        <label className="mr-2">Method:</label>
        <select value={method} onChange={(e) => setMethod(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>

        <label className="ml-4 mr-2">Size:</label>
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        onClick={submit}
        disabled={loading || !file}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Memproses...' : 'Enhance Gambar'}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {imageUrl && (
        <div className="mt-6">
          <img src={imageUrl} alt="HDR Result" className="rounded shadow mb-2" />
          <a
            href={imageUrl}
            download="enhanced.jpg"
            className="text-blue-700 underline"
          >
            ⬇️ Download Hasil
          </a>
        </div>
      )}
    </div>
  );
  }
        
