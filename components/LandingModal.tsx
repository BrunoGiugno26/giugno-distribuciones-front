"use client";
import { useEffect, useState } from "react";

type LandingModalProps = {
  title: string;
  description: string;
  cta?: string;
  segmentKey?: string
}

const LandingModal = ({ title, description, cta, segmentKey = "default" }: LandingModalProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastShown = localStorage.getItem("landingModalLastShown");
      const now = Date.now();
      const interval = 30 * 60 * 1000;

      if (!lastShown || now - parseInt(lastShown) > interval) {
        queueMicrotask(() => {
          setShow(true);
        });
        localStorage.setItem("landingModalLastShown", now.toString());
      }
    }
  }, [segmentKey]);

  const handleClose = () => {
    setShow(false);
  };

  if (!show) return null

  return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-5">
          <div className="bg-background rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative animate-fadeIn">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="mb-6 text-muted-foreground">{description}</p>
            {cta && (
              <button className="px-6 py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-all duration-300">
                {cta}
              </button>
            )}
          </div>
        </div>
  );
};

export default LandingModal;
