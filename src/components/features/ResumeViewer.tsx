"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Download, X } from "lucide-react";

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PDFPageProps {
  pdfDoc: any;
  pageNumber: number;
  scale: number;
}

const PDFPage: React.FC<PDFPageProps> = ({ pdfDoc, pageNumber, scale }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);

  useEffect(() => {
    if (!pdfDoc) return;

    let isCancelled = false;

    pdfDoc.getPage(pageNumber).then((page: any) => {
      if (isCancelled) return;

      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      // Use devicePixelRatio to render high DPI/Retina text sharply
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      context.scale(dpr, dpr);

      // Cancel previous render task if active
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;

      renderTask.promise.then(
        () => {
          renderTaskRef.current = null;
        },
        (err: any) => {
          if (err.name !== "RenderingCancelledException") {
            console.error("Page render error:", err);
          }
        }
      );
    });

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdfDoc, pageNumber, scale]);

  return (
    <div className="shadow-md bg-white border border-[#e5e5e5] dark:border-border-subtle rounded-md overflow-hidden my-4 mx-auto max-w-full">
      <canvas ref={canvasRef} className="max-w-full block" />
    </div>
  );
};

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ isOpen, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(115);
  const [pdfLibLoaded, setPdfLibLoaded] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Set default zoom based on screen size on open
  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setZoomLevel(60); // Mobile: fit width
      } else {
        setZoomLevel(115); // Desktop: 115% zoom
      }
    }
  }, [isOpen]);

  // Load PDF.js CDN
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as any).pdfjsLib) {
      setPdfLibLoaded(true);
      return;
    }

    // Check if script already exists to prevent duplicate loading
    const existingScript = document.getElementById("pdfjs-lib-cdn");
    if (existingScript) {
      const checkLoaded = setInterval(() => {
        if ((window as any).pdfjsLib) {
          clearInterval(checkLoaded);
          setPdfLibLoaded(true);
        }
      }, 100);
      return () => clearInterval(checkLoaded);
    }

    const script = document.createElement("script");
    script.id = "pdfjs-lib-cdn";
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js";
    script.async = true;
    script.onload = () => {
      (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
      setPdfLibLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load PDF.js script from CDN.");
      setError(true);
      setLoading(false);
    };
    document.head.appendChild(script);
  }, []);

  // Fetch / Load PDF file when library is ready and viewer is open
  useEffect(() => {
    if (!pdfLibLoaded || !isOpen) return;

    setLoading(true);
    setError(false);

    const pdfjsLib = (window as any).pdfjsLib;
    const loadingTask = pdfjsLib.getDocument("/resume.pdf");

    loadingTask.promise.then(
      (pdf: any) => {
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setLoading(false);
      },
      (err: any) => {
        console.error("Error loading PDF document:", err);
        setError(true);
        setLoading(false);
      }
    );
  }, [pdfLibLoaded, isOpen]);

  // Handle ESC key press to close viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(150, prev + 10));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(50, prev - 10));
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Aditya_Pharande_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/70 dark:bg-black/55 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[95vw] md:w-[min(90vw,1050px)] h-[85vh] md:h-[88vh] bg-[#fbfbfb] dark:bg-card border border-[#e5e5e5] dark:border-border-subtle rounded-xl shadow-2xl flex flex-col overflow-hidden select-none"
          >
            {/* Top Toolbar */}
            <div className="h-[50px] min-h-[50px] px-5 bg-white dark:bg-card-alt border-b border-[#e5e5e5] dark:border-border-subtle flex items-center justify-between z-10">
              {/* Left Side: Filename */}
              <div className="flex items-center">
                <span className="text-sm font-semibold tracking-tight text-foreground font-mono">
                  resume.pdf
                </span>
              </div>

              {/* Right Side: Controls */}
              <div className="flex items-center gap-3">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 50}
                    className="p-1 rounded hover:bg-foreground/5 text-secondary-text disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    title="Zoom Out"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="text-xs font-mono min-w-[36px] text-center text-secondary-text">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 150}
                    className="p-1 rounded hover:bg-foreground/5 text-secondary-text disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    title="Zoom In"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Divider */}
                <div className="w-[1px] h-4 bg-[#e5e5e5] dark:bg-border-subtle/50 mx-1" />

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="p-1.5 rounded hover:bg-foreground/5 text-secondary-text hover:text-foreground cursor-pointer transition-colors"
                  title="Download Resume"
                >
                  <Download size={15} />
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded hover:bg-foreground/5 text-secondary-text hover:text-red-500 cursor-pointer transition-colors"
                  title="Close (Esc)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-auto p-4 md:p-6 bg-[#f4f4f5] dark:bg-black/20 flex flex-col items-center">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-secondary-text py-12">
                  <span className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                  <span className="text-xs font-mono">Loading resume...</span>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-6 max-w-sm">
                  <span className="text-sm font-medium text-foreground">Could not load preview</span>
                  <p className="text-xs text-secondary-text">
                    We were unable to load the interactive PDF reader. You can still download the resume file directly.
                  </p>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded text-xs font-medium cursor-pointer transition-colors"
                  >
                    Download Resume
                  </button>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  {Array.from({ length: numPages }, (_, i) => (
                    <PDFPage
                      key={i + 1}
                      pdfDoc={pdfDoc}
                      pageNumber={i + 1}
                      scale={zoomLevel / 100}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
