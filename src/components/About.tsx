import { getAbout } from '@/lib/db'

export default async function About() {
  const data = await getAbout()

  const stats = [
    { num: data.stat1_num, label: data.stat1_label },
    { num: data.stat2_num, label: data.stat2_label },
    { num: data.stat3_num, label: data.stat3_label },
  ]

  const values = [
    { heading: data.value1_heading, body: data.value1_body },
    { heading: data.value2_heading, body: data.value2_body },
    { heading: data.value3_heading, body: data.value3_body },
  ]

  const storyP1 = data.story_p1
  const storyP2 = data.story_p2

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
