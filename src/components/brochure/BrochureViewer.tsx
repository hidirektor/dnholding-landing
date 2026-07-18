"use client";

import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import HTMLFlipBook from "react-pageflip";
import { X, ExternalLink, Columns, Rows, ZoomIn, ZoomOut } from "lucide-react";
import styles from "./Brochure.module.css";

// Configure PDF.js worker
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface BrochureViewerProps {
  onClose?: () => void;
  isPage?: boolean;
}

export default function BrochureViewer({ onClose, isPage = false }: BrochureViewerProps) {
  const [isMinimal, setIsMinimal] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const flipBookRef = useRef<any>(null);
  
  const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset state when switching modes
  useEffect(() => {
    setNumPages(null); // Clear pages so it doesn't render old pages while loading
    setCurrentPage(0);
    setZoom(1);
    setTimeout(() => {
      const scrollContainer = document.getElementById('pdf-content-area');
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
    }, 50);
  }, [isMinimal]);

  // Track scroll position in minimal mode
  useEffect(() => {
    if (!isMinimal || !numPages) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
          const index = parseInt(entry.target.getAttribute('data-page-index') || '0', 10);
          setCurrentPage(index);
        }
      });
    }, {
      root: document.getElementById('pdf-content-area'),
      threshold: 0.4
    });

    const elements = document.querySelectorAll('.vertical-page-container');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isMinimal, numPages]);

  const horizontalPdf = "/assets/brochure/brochure-horizontal.pdf";
  const verticalPdf = "/assets/brochure/brochure-vertical.pdf";

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    
    // Force scroll to top when document is fully loaded and rendered
    if (isMinimal) {
      setTimeout(() => {
        const scrollContainer = document.getElementById('pdf-content-area');
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: 'instant' as any });
        }
      }, 100);
    }
  }

  const handleOpenInNewTab = () => {
    window.open("/brochure", "_blank");
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));

  if (!isClient) return null;

  return (
    <div className={styles.viewerContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>DN Broşür</h2>
        <div className={styles.controls}>
          <button 
            className={styles.button} 
            onClick={() => setIsMinimal(!isMinimal)}
            title={isMinimal ? "Dergi Görünümü" : "Dikey Görünüm"}
          >
            {isMinimal ? <Columns size={18} /> : <Rows size={18} />}
            <span className="hidden sm:inline">{isMinimal ? "Dergi Görünümü" : "Dikey Görünüme Geç"}</span>
          </button>
          
          {!isPage && (
            <button 
              className={styles.button} 
              onClick={handleOpenInNewTab}
              title="Yeni Sekmede Aç"
            >
              <ExternalLink size={18} />
              <span className="hidden sm:inline">Yeni Sekmede Aç</span>
            </button>
          )}

          {!isPage && onClose && (
            <button 
              className={`${styles.button} ${styles.danger}`} 
              onClick={onClose}
              title="Kapat"
            >
              <X size={18} />
              <span className="hidden sm:inline">Kapat</span>
            </button>
          )}
        </div>
      </div>

      <div key={isMinimal ? 'minimal' : 'flipbook'} className={isMinimal ? styles.contentAreaMinimal : styles.contentArea} id="pdf-content-area" style={{ overflowAnchor: 'none' }}>
        {/* Zoom Controls inside inner card */}
        <div className={styles.zoomControls}>
          <button onClick={handleZoomOut} className={styles.zoomBtn} title="Uzaklaştır">
            <ZoomOut size={18} />
          </button>
          <span className={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} className={styles.zoomBtn} title="Yakınlaştır">
            <ZoomIn size={18} />
          </button>
        </div>

        <div style={{ 
          transform: `scale(${zoom})`, 
          transformOrigin: 'center top', 
          transition: 'transform 0.2s ease', 
          width: '100%', 
          height: '100%',
          display: 'flex', 
          justifyContent: 'center' 
        }}>
          <Document
            file={isMinimal ? verticalPdf : horizontalPdf}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className={styles.loading}>Yükleniyor...</div>}
            className={isMinimal ? styles.pdfDocumentMinimal : styles.pdfDocument}
          >
          {isMinimal ? (
            <div className={styles.verticalScroll}>
              {Array.from(new Array(numPages || 0), (el, index) => (
                <div 
                  key={`page_${index + 1}`} 
                  id={`vertical_page_${index}`}
                  className={`${styles.pageContainer} vertical-page-container`}
                  data-page-index={index}
                >
                  <Page 
                    pageNumber={index + 1} 
                    width={typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.9, 800) : 800}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    devicePixelRatio={dpr * zoom}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.flipbookWrapper}>
              {numPages && (
                // @ts-expect-error - react-pageflip types require all optional props
                <HTMLFlipBook 
                  width={842} 
                  height={595} 
                  size="stretch"
                  minWidth={315}
                  maxWidth={2000}
                  minHeight={400}
                  maxHeight={2000}
                  maxShadowOpacity={0.5}
                  showCover={true}
                  usePortrait={false}
                  mobileScrollSupport={true}
                  className="demo-book"
                  style={{ margin: "0 auto" }}
                  ref={flipBookRef}
                  onFlip={(e: any) => setCurrentPage(e.data)}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} className={styles.flipPage}>
                      <Page 
                        pageNumber={index + 1} 
                        width={842}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        devicePixelRatio={dpr * zoom}
                      />
                    </div>
                  ))}
                </HTMLFlipBook>
              )}
            </div>
          )}
        </Document>
        </div>
      </div>
      
      {numPages && (
        <div className={styles.footerControls}>
          <button 
            className={styles.navButton} 
            onClick={() => {
              if (isMinimal) {
                const prev = Math.max(currentPage - 1, 0);
                document.getElementById(`vertical_page_${prev}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                flipBookRef.current?.pageFlip().flipPrev();
              }
            }}
            style={{ visibility: currentPage > 0 ? 'visible' : 'hidden' }}
          >
            Önceki Sayfa
          </button>
          <button 
            className={styles.navButton} 
            onClick={() => {
              if (isMinimal) {
                const next = Math.min(currentPage + 1, numPages - 1);
                document.getElementById(`vertical_page_${next}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                flipBookRef.current?.pageFlip().flipNext();
              }
            }}
            style={{ 
              visibility: (isMinimal 
                ? currentPage < numPages - 1 
                : (currentPage === 0 ? numPages > 1 : currentPage + 2 < numPages)) 
                ? 'visible' 
                : 'hidden' 
            }}
          >
            Sonraki Sayfa
          </button>
        </div>
      )}
    </div>
  );
}
