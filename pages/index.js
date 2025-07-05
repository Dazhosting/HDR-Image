// pages/index.js
import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState(1);
  const [size, setSize] = useState('low');
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
      setImageUrl(null);
    }
  };

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
      setError('❌ Whoops! Gagal menyempurnakan gambar. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ihancer - AI HDR Photo Enhancer</title>
        <meta name="description" content="Generate stunning HDR images from your photos with AI. Fast, easy, and free." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4 transition-colors duration-300">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 transition-all">
          
          <div className="flex items-center mb-5">
            <Image 
              src="https://ar-hosting.pages.dev/1751679958097.jpg" 
              alt="Ihancer Logo"
              width={52}
              height={52}
              className="rounded-full shadow-md"
            />
            <h1 className="text-5xl font-extrabold ml-4 text-gray-900 tracking-tight">🧠 Ihancer</h1>
          </div>
          <p className="text-gray-500 mb-8 text-lg">
            Ubah foto biasa menjadi gambar <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-semibold">HDR</span> yang memukau dengan kekuatan AI.
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="file-upload" className="block text-sm font-bold text-gray-700 mb-2">
                Pilih Gambar Anda
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-indigo-500 transition-colors duration-300">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Unggah file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">atau seret dan lepas</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF hingga 10MB</p>
                </div>
              </div>
            </div>

            {preview && !imageUrl && (
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 mb-2">Pratinjau:</p>
                <img src={preview} alt="Image preview" className="mx-auto max-h-60 rounded-lg shadow-lg" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="method" className="block text-sm font-bold text-gray-700">Metode Peningkatan</label>
                <select id="method" value={method} onChange={(e) => setMethod(Number(e.target.value))} className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg shadow-sm">
                  <option value={1}>Metode 1 (Cepat)</option>
                  <option value={2}>Metode 2 (Seimbang)</option>
                  <option value={3}>Metode 3 (Kualitas)</option>
                  <option value={4}>Metode 4 (Eksperimental)</option>
                </select>
              </div>
              <div>
                <label htmlFor="size" className="block text-sm font-bold text-gray-700">Resolusi Output</label>
                <select id="size" value={size} onChange={(e) => setSize(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg shadow-sm">
                  <option value="low">Rendah</option>
                  <option value="medium">Sedang</option>
                  <option value="high">Tinggi</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={submit}
              disabled={loading || !file}
              className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-bold rounded-lg shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:from-indigo-400 disabled:to-purple-400 disabled:cursor-not-allowed transform hover:scale-105 transition-transform duration-300"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Meningkatkan...
                </>
              ) : '✨ Mulai Sempurnakan Gambar'}
            </button>
          </div>

          {error && <p className="text-red-500 mt-6 text-center font-semibold">{error}</p>}

          {imageUrl && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Hasil Telah Siap!</h2>
              <img src={imageUrl} alt="Enhanced HDR Result" className="rounded-xl shadow-2xl mx-auto mb-4" />
              <a
                href={imageUrl}
                download="enhanced-hdr-image.jpg"
                className="w-full mt-4 flex justify-center items-center px-6 py-3 border border-transparent text-base font-bold rounded-lg shadow-lg text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 transition-transform duration-300"
              >
                ⬇️ Unduh Hasil Gambar
              </a>
            </div>
          )}
        </div>
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Ditenagai oleh <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:text-indigo-600 transition-colors">Vercel Team</a></p>
        </footer>
      </div>
    </>
  );
                }
