import { reader } from '@/lib/keystatic'

export default async function About() {
  const data = await reader.singletons.about.read()

  const stats = [
    { num: data?.stat1Num ?? '500+', label: data?.stat1Label ?? 'Tattoos Done' },
    { num: data?.stat2Num ?? '1K+',  label: data?.stat2Label ?? 'Clients Served' },
    { num: data?.stat3Num ?? '3',    label: data?.stat3Label ?? 'Disciplines' },
  ]

  const values = [
    { heading: data?.value1Heading ?? 'No Shortcuts',     body: data?.value1Body ?? 'Every tattoo is drawn from scratch. Every cut is dialled in.' },
    { heading: data?.value2Heading ?? 'Community First',  body: data?.value2Body ?? "We know our clients by name. That's the point." },
    { heading: data?.value3Heading ?? 'Culture Over Trend', body: data?.value3Body ?? "We don't chase hype. We set the standard." },
  ]

  const storyP1 = data?.storyP1 ?? 'Hunthreads started as a simple idea — what if the best tattoo studio, the sharpest barber, and the most authentic streetwear brand in Central Luzon were all under one roof?'
  const storyP2 = data?.storyP2 ?? "We're not a chain. We're not a franchise. We're a crew of artists and barbers based in Central Luzon who care about the craft. Every client walks out looking and feeling like themselves — just sharper."

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__inner">
          <div className="about__content">
            <span className="section-label">Our Story</span>
            <h2 className="section-title">BUILT DIFFERENT.<br />RUN DIFFERENT.</h2>
            <p>{storyP1}</p>
            <p>{storyP2}</p>
          </div>

          <div className="about__values">
            {values.map(v => (
              <div key={v.heading} className="about__value">
                <span className="about__value-icon">✦</span>
                <div>
                  <h4>{v.heading}</h4>
                  <p>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
