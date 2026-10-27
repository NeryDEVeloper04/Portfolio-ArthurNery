import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p>Essa página não existe.</p>
      <Link to="/">Voltar para o início</Link>
    </section>
  )
}
