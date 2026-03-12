'use client';

import { X, CameraOff, ExternalLink, CheckCircle2 } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import jsQR from "jsqr";
import { useGame } from "@/contexts/GameContext";

function isURL(text: string) {
  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const ScannerOverlay = () => {
  const { scannerOpen, closeScanner, simulateScan, missions, activeMissionId } = useGame();
  const mission = missions.find((m) => m.id === activeMissionId);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);

  // Scan loop — runs on each animation frame
  const scan = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < video.HAVE_ENOUGH_DATA) {
      rafRef.current = requestAnimationFrame(scan);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    if (code) {
      setScannedData(code.data);
      // Stop scanning once a code is found
      return;
    }

    rafRef.current = requestAnimationFrame(scan);
  }, []);

  useEffect(() => {
    if (!scannerOpen) {
      rafRef.current && cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setCameraError(null);
      setScannedData(null);
      return;
    }

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            rafRef.current = requestAnimationFrame(scan);
          };
        }
      } catch {
        setCameraError("Camera access denied or unavailable.");
      }
    };

    startCamera();

    return () => {
      rafRef.current && cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [scannerOpen, scan]);

  // Restart scanning after dismissing a result
  const handleScanAgain = () => {
    setScannedData(null);
    rafRef.current = requestAnimationFrame(scan);
  };

  if (!scannerOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-background/95 flex flex-col animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div>
          <h2 className="font-display font-bold text-sm">
            {mission ? mission.title : "Scan a QR Code"}
          </h2>
          {mission && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Step {mission.stepsCompleted + 1} of {mission.stepsRequired}
            </p>
          )}
        </div>
        <button
          onClick={closeScanner}
          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Camera / Scanner area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-4">
        <div className="relative w-full" style={{ aspectRatio: "1/1", maxWidth: "100%" }}>
          <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-secondary/50 scanner-frame">
          {cameraError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted gap-2 px-4 text-center">
              <CameraOff size={36} className="text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{cameraError}</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Hidden canvas used for QR decoding */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary rounded-tl-lg z-10" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-secondary rounded-tr-lg z-10" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-secondary rounded-bl-lg z-10" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary rounded-br-lg z-10" />

          {!cameraError && !scannedData && (
            <div className="absolute left-2 right-2 h-0.5 bg-secondary/80 scan-line rounded-full shadow-[0_0_8px_hsl(150_80%_50%/0.6)] z-10" />
          )}

          {/* Success overlay when QR detected */}
          {scannedData && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-20">
              <CheckCircle2 size={56} className="text-secondary drop-shadow-lg" />
            </div>
          )}
          </div>{/* end inner rounded box */}
        </div>{/* end aspect-ratio wrapper */}

        {/* Decoded QR result */}
        {scannedData ? (
          <div className="w-full bg-muted rounded-2xl p-4 flex flex-col gap-3">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">QR Code Detected</p>
            {isURL(scannedData) ? (
              <a
                href={scannedData}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-secondary text-sm font-semibold break-all hover:underline"
              >
                <ExternalLink size={16} className="shrink-0" />
                {scannedData}
              </a>
            ) : (
              <p className="text-sm text-foreground break-all">{scannedData}</p>
            )}
            <button
              onClick={handleScanAgain}
              className="text-xs text-muted-foreground underline self-start"
            >
              Scan again
            </button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            {cameraError
              ? "Use the button below to simulate a scan"
              : "Point your camera at a QR code"}
          </p>
        )}
      </div>

      {/* Simulate button */}
      <div className="p-6">
        <button
          onClick={simulateScan}
          className="w-full py-4 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm neon-glow-green hover:brightness-110 active:scale-[0.98] transition-all"
        >
          Simulate Scan
        </button>
      </div>
    </div>
  );
};

export default ScannerOverlay;
