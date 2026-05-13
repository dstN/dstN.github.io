export function ScanLine() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-[0.03]" aria-hidden="true">
      <div
        className="absolute left-0 right-0 h-[2px] bg-primary"
        style={{
          animation: "scan-line 8s linear infinite",
        }}
      />
    </div>
  )
}
