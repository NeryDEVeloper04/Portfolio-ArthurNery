import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Timeline from '../components/Timeline'
import ProjectList from '../components/ProjectList'
import ContactForm from '../features/contact/ContactForm'
import {
  about,
  education,
  experience,
  skills,
  softSkills,
} from '../data/profile'

export default function Home() {
  const { hash } = useLocation()
  useEffect(() => {
    if (hash)
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])
  return (
    <>
      <Hero />
      <Section id="sobre" title="Sobre mim">
        <Reveal>
          <p className="about">{about}</p>
          <div className="chips">
            {softSkills.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>
      <Section id="habilidades" title="Habilidades">
        <div className="skills">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 100}>
              <div className="card">
                <h3>{g.group}</h3>
                {g.note && <small>{g.note}</small>}
                <div className="chips">
                  {g.items.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section id="trajetoria" title="Trajetória">
        <div className="two">
          <div>
            <h3 className="sub">Formação</h3>
            <Timeline items={education} />
          </div>
          <div>
            <h3 className="sub">Experiência</h3>
            <Timeline items={experience} />
          </div>
        </div>
      </Section>
      <Section id="projetos" title="Projetos">
        <ProjectList onlyFeatured />
      </Section>
      <Section id="contato" title="Contato">
        <ContactForm />
      </Section>
    </>
  )
}
