"use client";

import { useEffect, useRef, useState } from "react";

function clearProofHash() {
  if (window.location.hash !== "#proof") return;
  history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}`,
  );
}

export function ProofVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);
  const [ended, setEnded] = useState(false);
  const [paused, setPaused] = useState(false);

  function playProof({ restart = false }: { restart?: boolean } = {}) {
    const video = videoRef.current;
    if (!video) return;
    setEnded(false);
    setPaused(false);
    if (restart || video.ended) {
      video.currentTime = 0;
    }
    startedRef.current = true;
    void video.play().catch(() => {
      startedRef.current = false;
    });
  }

  function onVideoTap() {
    const video = videoRef.current;
    if (!video) return;

    if (ended || video.ended) {
      playProof({ restart: true });
      return;
    }

    if (!video.paused) {
      video.pause();
      setPaused(true);
      return;
    }

    setPaused(false);
    void video.play().catch(() => {
      setPaused(true);
    });
  }

  useEffect(() => {
    const root = sectionRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    // Refresh with #proof was jumping straight here — clear it and stay at top.
    if (window.location.hash === "#proof") {
      clearProofHash();
      window.scrollTo(0, 0);
    }

    function onEnded() {
      setEnded(true);
      setPaused(false);
    }
    video.addEventListener("ended", onEnded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || startedRef.current) return;
        playProof();
      },
      { threshold: 0.45 },
    );
    observer.observe(root);

    function onProofNavClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.(
        'a[href="#proof"], a[href="/#proof"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;

      event.preventDefault();
      clearProofHash();
      const section = sectionRef.current;
      if (!section) return;
      section.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => playProof({ restart: true }), 280);
    }

    document.addEventListener("click", onProofNavClick);

    return () => {
      video.removeEventListener("ended", onEnded);
      observer.disconnect();
      document.removeEventListener("click", onProofNavClick);
    };
  }, []);

  return (
    <div className="proof-video" ref={sectionRef}>
      <video
        ref={videoRef}
        className="proof-video__player"
        src="/assets/proof.mp4?v=2"
        playsInline
        preload="metadata"
        controls={false}
        onClick={onVideoTap}
        aria-label="Client proof video. Tap to pause or play."
      />
      {ended ? (
        <button
          type="button"
          className="proof-video__replay"
          onClick={() => playProof({ restart: true })}
        >
          Play again
        </button>
      ) : null}
      {paused && !ended ? (
        <button
          type="button"
          className="proof-video__replay proof-video__replay--quiet"
          onClick={onVideoTap}
        >
          Tap to play
        </button>
      ) : null}
    </div>
  );
}
