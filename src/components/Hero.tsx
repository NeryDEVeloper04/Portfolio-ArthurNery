import { lazy, Suspense } from 'react'

const ParticleField = lazy(() => import('./ParticleField'))

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
      <div className="hero-body">
        <p className="eyebrow">Engenharia de Software · FIAP</p>
        <h1>
          Olá, sou <span className="grad">Arthur Meneghin Nery</span>
        </h1>
        <p className="lead">
          Desenvolvedor em formação em busca de estágio em desenvolvimento de
          software. Transformo base acadêmica em projetos reais, com código
          limpo e aprendizado contínuo.
        </p>
        <div className="cta">
          <a className="btn" href="#projetos">
            Ver projetos
          </a>
          <a className="btn ghost" href="#contato">
            Falar comigo
          </a>
        </div>
      </div>
    </section>
  )
}
