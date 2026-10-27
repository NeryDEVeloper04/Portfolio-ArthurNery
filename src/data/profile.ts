export const about =
  'Estudante de Engenharia de Software na FIAP, no início da carreira em tecnologia. Tenho interesse em construção de software, boas práticas de código e aprendizado contínuo. Minha experiência nas áreas administrativa e financeira me deu organização, atenção aos detalhes, responsabilidade e trabalho em equipe.'

export const skills = [
  {
    group: 'Linguagens',
    items: ['Python', 'JavaScript', 'C++'],
    note: 'conhecimentos iniciais',
  },
  {
    group: 'Fundamentos',
    items: [
      'Lógica de programação',
      'Pensamento computacional',
      'Boas práticas de código',
      'Resolução de problemas',
    ],
  },
  {
    group: 'Web e APIs',
    items: ['Desenvolvimento web', 'Consumo de APIs'],
    note: 'em formação',
  },
  { group: 'Ferramentas', items: ['Git', 'GitHub', 'VS Code'] },
]

export const softSkills = [
  'Proatividade',
  'Aprendizado rápido',
  'Organização e disciplina',
  'Trabalho em equipe',
  'Boa comunicação',
  'Adaptabilidade',
  'Resiliência',
  'Atenção aos detalhes',
]

export type TimelineItem = {
  period: string
  title: string
  place: string
  text: string
}

export const education: TimelineItem[] = [
  {
    period: '2026 – 2029',
    title: 'Bacharelado em Engenharia de Software',
    place: 'FIAP',
    text: 'Programação, desenvolvimento de software, engenharia de sistemas e inovação.',
  },
  {
    period: 'Fev – Jun 2023',
    title: 'Curso profissionalizante em Programação de Computadores',
    place: 'ETEC Albert Einstein',
    text: 'Fundamentos de programação e primeiras competências na área de tecnologia.',
  },
]

export const experience: TimelineItem[] = [
  {
    period: 'Mar 2026 – atual',
    title: 'Auxiliar de Firmas',
    place: '23º Tabelionato de Notas de São Paulo',
    text: 'Apoio a rotinas administrativas, organização e acompanhamento de documentos com precisão.',
  },
  {
    period: 'Set – Dez 2025',
    title: 'Assistente Administrativo Financeiro',
    place: 'Colégio Delta',
    text: 'Conferência de documentos, apoio às rotinas financeiras e controle de demandas.',
  },
]
