/** A row of gold brass oil lamps with flickering flames, drawn as vector line-art. */
export default function OilLamps({ className = "" }: { className?: string }) {
  const xs = Array.from({ length: 9 }, (_, i) => 24 + i * 44);
  return (
    <svg viewBox="0 0 400 78" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <line x1="0" y1="76" x2="400" y2="76" stroke="#c6a664" strokeWidth="1" opacity="0.7" />
      {xs.map((x, i) => (
        <g key={x} transform={`translate(${x} 0)`} stroke="#c6a664" strokeWidth="1.2" fill="none" strokeLinecap="round">
          <path d="M-9 76 L9 76 L6 66 L-6 66Z" fill="#e8d6ab" fillOpacity="0.45" />
          <path d="M0 66 L0 50" />
          <ellipse cx="0" cy="58" rx="4" ry="2" />
          <path d="M-13 46 Q0 58 13 46 Z" fill="#e8d6ab" fillOpacity="0.5" />
          <path className="flame" style={{ animationDelay: `${i * 0.17}s` }} d="M0 44 C -5 37, -3 30, 0 24 C 3 30, 5 37, 0 44Z" fill="#c6a664" fillOpacity="0.85" stroke="none" />
        </g>
      ))}
    </svg>
  );
}
