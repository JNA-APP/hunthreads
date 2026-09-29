const items = ['TATTOO', 'BARBER', 'MERCH', 'CUSTOM INK', 'FRESH CUTS', 'STREET WEAR']
const doubled = [...items, ...items]

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {doubled.map((item, i) => (
          <span key={i}>
            {item}
            {i < doubled.length - 1 && <span className="dot"> ✦</span>}
          </span>
        ))}
      </div>
    </div>
  )
}
