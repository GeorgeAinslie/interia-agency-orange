"use client";

import { useRef, useState, type PointerEvent } from "react";

type WorkItem = {
  name: string;
  video?: string;
  poster?: string;
  logo?: string;
  reserved?: boolean;
};

export function WorkGrid({ items }: { items: readonly WorkItem[] }) {
  return (
    <ul className="work-grid">
      {items.map((item, index) => (
        <WorkTile key={`${item.name}-${index}`} item={item} />
      ))}
    </ul>
  );
}

export function WorkFeature({ item }: { item: WorkItem }) {
  const playback = useTilePlayback();

  return (
    <figure
      className={`work-feature${playback.live ? " is-live" : ""}`}
      onPointerEnter={playback.onPointerEnter}
      onPointerLeave={playback.onPointerLeave}
      onClick={playback.onClick}
    >
      <div className="work-feature__stage">
        <video
          ref={playback.ref}
          className="work-feature__video"
          src={item.video}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${item.name} website`}
        />
        <span className="work-tile__wash" aria-hidden />
      </div>
    </figure>
  );
}

function WorkTile({ item }: { item: WorkItem }) {
  const playback = useTilePlayback();

  return (
    <li
      className={`work-tile${playback.live ? " is-live" : ""}${item.reserved ? " work-tile--reserved" : ""}`}
      onPointerEnter={item.reserved ? undefined : playback.onPointerEnter}
      onPointerLeave={item.reserved ? undefined : playback.onPointerLeave}
      onClick={item.reserved ? undefined : playback.onClick}
    >
      {item.video ? (
        <video
          ref={playback.ref}
          className="work-tile__media"
          src={item.video}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${item.name} website`}
        />
      ) : item.logo ? (
        <div className="work-tile__still">
          <img src={`${item.logo}?v=2`} alt="" />
        </div>
      ) : (
        <div className="work-tile__still work-tile__still--empty" />
      )}
      <span className="work-tile__wash" aria-hidden />
      <p className="work-tile__name">{item.name}</p>
    </li>
  );
}

function canHover() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

function useTilePlayback() {
  const ref = useRef<HTMLVideoElement>(null);
  const liveRef = useRef(false);
  const [live, setLive] = useState(false);

  function play() {
    liveRef.current = true;
    setLive(true);
    void ref.current?.play().catch(() => undefined);
  }

  function stop() {
    liveRef.current = false;
    setLive(false);
    const video = ref.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }

  function onPointerEnter(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || !canHover()) return;
    play();
  }

  function onPointerLeave(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || !canHover()) return;
    stop();
  }

  function onClick() {
    if (canHover()) return;
    if (liveRef.current) stop();
    else play();
  }

  return { ref, live, onPointerEnter, onPointerLeave, onClick };
}
