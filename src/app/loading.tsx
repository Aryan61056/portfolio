export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="flex items-center gap-2 font-mono text-sm text-muted">
        <span className="inline-block h-2 w-2 animate-ping rounded-full bg-primary" />
        hang on, gathering my thoughts…
      </p>
    </div>
  );
}
