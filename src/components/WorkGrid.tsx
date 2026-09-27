"use client";

import { useRef, useState } from "react";

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
  const hover = useHoverPlayback();

  return (
    <figure
      className={`work-feature${hover.live ? " is-live" : ""}`}
      onPointerEnter={hover.enter}
      onPointerLeave={hover.leave}
    >
      <div className="work-feature__stage">
        <video
          ref={hover.ref}
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
  const hover = useHoverPlayback();

  return (
    <li
      className={`work-tile${hover.live ? " is-live" : ""}${item.reserved ? " work-tile--reserved" : ""}`}
      onPointerEnter={item.reserved ? undefined : hover.enter}
      onPointerLeave={item.reserved ? undefined : hover.leave}
    >
      {item.video ? (
        <video
          ref={hover.ref}
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

function useHoverPlayback() {
  const ref = useRef<HTMLVideoElement>(null);
  const [live, setLive] = useState(false);

  function enter() {
    setLive(true);
    void ref.current?.play().catch(() => undefined);
  }

  function leave() {
    setLive(false);
    const video = ref.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }

  return { ref, live, enter, leave };
}
