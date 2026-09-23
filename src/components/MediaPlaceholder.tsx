type MediaPlaceholderProps = {
  kind?: "image" | "video";
  label?: string;
  aspect?: "hero" | "wide" | "square";
  className?: string;
};

export function MediaPlaceholder({
  kind = "image",
  label,
  aspect = "wide",
  className = "",
}: MediaPlaceholderProps) {
  const defaultLabel =
    kind === "video" ? "Add video" : "Add photo";
  const displayLabel = label ?? defaultLabel;

  return (
    <div
      className={`media-placeholder media-placeholder--${aspect} media-placeholder--${kind} ${className}`.trim()}
      role="img"
      aria-label={displayLabel}
    >
      <span className="media-placeholder__label">{displayLabel}</span>
      <span className="media-placeholder__hint">
        {kind === "video" ? "MP4 or embed" : "JPG, PNG, or WebP"}
      </span>
    </div>
  );
}
