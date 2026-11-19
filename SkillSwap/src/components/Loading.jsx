function Loading({ label = 'Loading...' }) {
  return (
    <div role="status" aria-live="polite" className="not-found">
      <span className="eyebrow">{label}</span>
    </div>
  )
}

export default Loading
