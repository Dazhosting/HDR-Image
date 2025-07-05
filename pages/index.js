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
      
      <div className="page-container">
        <div className="main-container">
          
          <div className="header">
            <Image 
              src="https://ar-hosting.pages.dev/1751679958097.jpg" 
              alt="Ihancer Logo"
              width={52}
              height={52}
              className="header-logo"
            />
            <h1>🧠 Ihancer</h1>
          </div>
          <p className="subheading">
            Ubah foto biasa menjadi gambar <span className="highlight">HDR</span> yang memukau dengan kekuatan AI.
          </p>

          <div className="form-container">
            <div>
              <label htmlFor="file-upload" className="file-upload-label">
                Pilih Gambar Anda
              </label>
              <div className="file-drop-area">
                <div className="file-drop-content">
                  <svg stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="file-text">
                    <label htmlFor="file-upload" className="upload-link">
                      <span>Unggah file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                    </label>
                    <p className="file-hint">atau seret dan lepas</p>
                  </div>
                  <p className="file-hint-small">PNG, JPG, GIF hingga 10MB</p>
                </div>
              </div>
            </div>

            {preview && !imageUrl && (
              <div className="image-preview-container">
                <p className="image-preview-label">Pratinjau:</p>
                <img src={preview} alt="Image preview" className="image-preview" />
              </div>
            )}

            <div className="controls-grid">
              <div>
                <label htmlFor="method" className="select-label">Metode Peningkatan</label>
                <select id="method" value={method} onChange={(e) => setMethod(Number(e.target.value))} className="select-input">
                  <option value={1}>Metode 1 (Cepat)</option>
                  <option value={2}>Metode 2 (Seimbang)</option>
                  <option value={3}>Metode 3 (Kualitas)</option>
                  <option value={4}>Metode 4 (Eksperimental)</option>
                </select>
              </div>
              <div>
                <label htmlFor="size" className="select-label">Resolusi Output</label>
                <select id="size" value={size} onChange={(e) => setSize(e.target.value)} className="select-input">
                  <option value="low">Rendah</option>
                  <option value="medium">Sedang</option>
                  <option value="high">Tinggi</option>
                </select>
              </div>
            </div>
          </div>

          <div className="submit-button-container">
            <button
              onClick={submit}
              disabled={loading || !file}
              className="submit-button"
            >
              {loading ? (
                <>
                  <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Meningkatkan...
                </>
              ) : '✨ Mulai Sempurnakan Gambar'}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          {imageUrl && (
            <div className="results-container">
              <h2 className="results-header">Hasil Telah Siap!</h2>
              <img src={imageUrl} alt="Enhanced HDR Result" className="enhanced-image" />
              <a
                href={imageUrl}
                download="enhanced-hdr-image.jpg"
                className="download-button"
              >
                ⬇️ Unduh Hasil Gambar
              </a>
            </div>
          )}
        </div>
        <footer>
          <p>Ditenagai oleh <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel Team</a></p>
        </footer>
      </div>

      <style jsx global>{`
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin: 0;
          background-color: #f3f4f6;
          color: #374151;
          transition: color 0.3s;
        }
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
      `}</style>
      
      <style jsx>{`
        .page-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 1rem;
        }
        .main-container {
          width: 100%;
          max-width: 42rem;
          margin: 0 auto;
          background-color: white;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          padding: 2rem;
          transition: all 0.3s;
        }
        .header {
          display: flex;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        .header-logo {
          border-radius: 9999px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .header h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-left: 1rem;
          color: #111827;
          letter-spacing: -0.025em;
        }
        .subheading {
          color: #6b7280;
          margin-bottom: 2rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
        }
        .subheading .highlight {
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          background-image: linear-gradient(to right, #8b5cf6, #ec4899);
          font-weight: 600;
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .file-upload-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 700;
          color: #4b5563;
          margin-bottom: 0.5rem;
        }
        .file-drop-area {
          margin-top: 0.25rem;
          display: flex;
          justify-content: center;
          padding: 1.25rem 1.5rem 1.5rem;
          border-width: 2px;
          border-color: #d1d5db;
          border-style: dashed;
          border-radius: 0.75rem;
          transition: border-color 0.3s;
        }
        .file-drop-area:hover {
          border-color: #6366f1;
        }
        .file-drop-content {
          text-align: center;
        }
        .file-drop-content svg {
          margin: 0 auto;
          height: 3rem;
          width: 3rem;
          color: #9ca3af;
        }
        .file-text {
          display: flex;
          font-size: 0.875rem;
          color: #4b5563;
          justify-content: center;
        }
        .upload-link {
          position: relative;
          cursor: pointer;
          background-color: white;
          border-radius: 0.375rem;
          font-weight: 500;
          color: #4f46e5;
        }
        .upload-link:hover {
          color: #4338ca;
        }
        .file-hint {
          padding-left: 0.25rem;
        }
        .file-hint-small {
          font-size: 0.75rem;
          color: #6b7280;
        }
        .image-preview-container {
          text-align: center;
        }
        .image-preview-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #4b5563;
          margin-bottom: 0.5rem;
        }
        .image-preview {
          margin: 0 auto;
          max-height: 15rem;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .controls-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .controls-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .select-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 700;
          color: #4b5563;
        }
        .select-input {
          margin-top: 0.25rem;
          display: block;
          width: 100%;
          padding: 0.625rem 2.5rem 0.625rem 0.75rem;
          font-size: 0.875rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
        }
        .select-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5);
        }
        .submit-button-container {
          margin-top: 2rem;
        }
        .submit-button {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem 1.5rem;
          border: 1px solid transparent;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          color: white;
          background-image: linear-gradient(to right, #4f46e5, #7c3aed);
          cursor: pointer;
          transition: transform 0.3s, background-image 0.3s;
          transform-origin: center;
        }
        .submit-button:hover:not(:disabled) {
          background-image: linear-gradient(to right, #4338ca, #6d28d9);
          transform: scale(1.05);
        }
        .submit-button:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5);
        }
        .submit-button:disabled {
          background-image: linear-gradient(to right, #a5b4fc, #c4b5fd);
          cursor: not-allowed;
        }
        .spinner {
          animation: spin 1s linear infinite;
          margin-right: 0.75rem;
          margin-left: -0.25rem;
          height: 1.25rem;
          width: 1.25rem;
          color: white;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .spinner .opacity-25 {
          opacity: 0.25;
        }
        .spinner .opacity-75 {
          opacity: 0.75;
        }
        .error-message {
          color: #ef4444;
          margin-top: 1.5rem;
          text-align: center;
          font-weight: 600;
        }
        .results-container {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }
        .results-header {
          font-size: 1.875rem;
          font-weight: 700;
          text-align: center;
          color: #374151;
          margin-bottom: 1rem;
        }
        .enhanced-image {
          border-radius: 0.75rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          margin: 0 auto 1rem auto;
          display: block;
          max-width: 100%;
        }
        .download-button {
          width: 100%;
          margin-top: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.75rem 1.5rem;
          border: 1px solid transparent;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          color: white;
          background-image: linear-gradient(to right, #22c55e, #14b8a6);
          text-decoration: none;
          transition: transform 0.3s, background-image 0.3s;
          transform-origin: center;
        }
        .download-button:hover {
          background-image: linear-gradient(to right, #16a34a, #0d9488);
          transform: scale(1.05);
        }
        .download-button:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.5);
        }
        footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
        }
        footer a {
          font-weight: 500;
          color: #4b5563;
          transition: color 0.3s;
          text-decoration: none;
        }
        footer a:hover {
          color: #4f46e5;
        }
      `}</style>
    </>
  );
                }
