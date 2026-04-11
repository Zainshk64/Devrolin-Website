// _app.tsx
import React, { Suspense, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// font awesome 6
import "public/icons/font-awesome/css/all.css";

// custom icons
import "public/icons/glyphter/css/xpovio.css";

// main scss
import "@/styles/main.scss";

const ModernLoader = () => {
  return (
    <div className="modern-loader-wrapper">
      <div className="loader-content">
        <div className="logo-container">
          <img
            src="/images/Company-Logo-Normal-1/1.svg"
            alt="OLIM Logo"
            className="company-logo"
          />
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar-fill"></div>
        </div>

        <p className="loading-text">Your Future , Our technology</p>
      </div>

      <style jsx>{`
        .modern-loader-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .loader-content {
          text-align: center;
          animation: fadeIn 0.5s ease-in;
        }
        .logo-container {
          margin-bottom: 10px;
          animation: pulse 2s ease-in-out infinite;
        }
        .company-logo {
          width: 150px;
          height: auto;
          filter: drop-shadow(0 4px 12px rgba(255, 107, 53, 0.2));
        }
        .progress-bar-container {
          width: 200px;
          height: 4px;
          background: #ffe5dc;
          border-radius: 10px;
          overflow: hidden;
          margin: 0 auto 20px;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff6b35 0%, #ff8c5a 100%);
          border-radius: 10px;
          animation: fillProgress 1.5s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
        }
        .loading-text {
          color: #ff6b35;
          font-size: 14px;
          font-weight: 500;
          margin: 0;
          animation: textPulse 2s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fillProgress {
          0% { width: 0%; transform: translateX(0); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 100%; transform: translateX(100%); }
        }
        @keyframes textPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// Track across the session so loader never shows again after first visit
let hasLoadedOnce = false;

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(!hasLoadedOnce);

  useEffect(() => {
    if (hasLoadedOnce) return;
    const timer = setTimeout(() => {
      hasLoadedOnce = true;
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ModernLoader />;
  }

  return (
    <Suspense fallback={null}>
      <Component {...pageProps} />
      <Toaster position="bottom-left" />
    </Suspense>
  );
}