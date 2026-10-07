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
  const userPausedRef = useRef(false);
  const [ended, setEnded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [needsSound, setNeedsSound] = useState(false);

  function playProof({
    restart = false,
    withSound = false,
  }: { restart?: boolean; withSound?: boolean } = {}) {
    const video = videoRef.current;
    if (!video) return;

    setEnded(false);
    setPaused(false);
    userPausedRef.current = false;

    if (restart || video.ended) {
      video.currentTime = 0;
    }

    // Browsers only allow autoplay without a user gesture when muted.
    video.muted = !withSound;
    if (withSound) setNeedsSound(false);

    void video
      .play()
      .then(() => {
        if (withSound) return;
        // Try to restore audio after muted autoplay; most browsers keep it muted.
        video.muted = false;
        if (video.muted) {
          setNeedsSound(true);
        }
      })
      .catch(() => {
        video.muted = true;
        void video.play().then(() => setNeedsSound(true)).catch(() => {
          setPaused(true);
        });
      });
  }

  function onVideoTap() {
    const video = videoRef.current;
    if (!video) return;

    if (ended || video.ended) {
      playProof({ restart: true, withSound: true });
      return;
    }

    if (video.muted || needsSound) {
      video.muted = false;
      setNeedsSound(false);
      if (video.paused) {
        void video.play().catch(() => setPaused(true));
      }
      setPaused(false);
      userPausedRef.current = false;
      return;
    }

    if (!video.paused) {
      video.pause();
      setPaused(true);
      userPausedRef.current = true;
      return;
    }

    setPaused(false);
    userPausedRef.current = false;
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
      setNeedsSound(false);
    }
    video.addEventListener("ended", onEnded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (!entry.isIntersecting) {
          if (!video.paused && !video.ended) {
            video.pause();
          }
          return;
        }

        if (userPausedRef.current || video.ended) return;
        if (!video.paused && !video.ended) return;
        playProof({ withSound: false });
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
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
      window.setTimeout(() => playProof({ restart: true, withSound: true }), 280);
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
        muted
        preload="auto"
        controls={false}
        onClick={onVideoTap}
        aria-label="Client proof video. Scrolls to play. Tap for sound, pause, or replay."
      />
      {ended ? (
        <button
          type="button"
          className="proof-video__replay"
          onClick={() => playProof({ restart: true, withSound: true })}
        >
          Play again
        </button>
      ) : null}
      {needsSound && !ended && !paused ? (
        <button
          type="button"
          className="proof-video__sound"
          onClick={onVideoTap}
        >
          Tap for sound
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
