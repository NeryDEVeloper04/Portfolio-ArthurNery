# Portfólio — Arthur Meneghin Nery

Portfólio em React com projetos carregados da API do GitHub, formulário de contato e painel protegido.

## Tecnologias

Vite, React, TypeScript, React Router, TanStack Query, React Hook Form + Zod, Supabase (Auth + Postgres), CSS puro com variáveis, Vitest + Testing Library, ESLint, Prettier, Husky, lint-staged, commitlint.

## Como rodar

1. `npm install`
2. Copie `.env.example` para `.env` e preencha as variáveis.
3. No Supabase, execute `supabase/schema.sql`, crie o usuário dono e **desative novos cadastros** (Auth > Providers).
4. `npm run dev`

## Uso de Inteligência Artificial

A inteligência artificial foi utilizada como ferramenta de apoio durante o desenvolvimento deste projeto, auxiliando na organização do código, na documentação e na identificação de possíveis melhorias.

## Onde a IA foi utilizada

Organização do código: apoio na estruturação dos componentes e na separação de responsabilidades.

Desenvolvimento da interface: sugestões de melhorias na organização visual, responsividade e experiência do usuário.

Integração com serviços: auxílio na análise da comunicação com a API do GitHub e com o Supabase.

Documentação: apoio na elaboração e revisão do README e na padronização das instruções do projeto.

Git e versionamento: auxílio na definição de convenções para branches, commits e organização das alterações.

Revisão de código: sugestões de melhorias de legibilidade, manutenção e identificação de possíveis erros.

Todo código sugerido por ferramentas de IA deve ser revisado e validado antes de ser integrado ao projeto. A utilização dessas ferramentas não substitui a compreensão das funcionalidades nem a responsabilidade sobre o código final.

## Padrões de Código e Convenções para IA

Para manter a consistência e a qualidade do projeto, qualquer ferramenta de inteligência artificial utilizada no desenvolvimento deve seguir as seguintes convenções.

Nomenclatura

Componentes React: utilizar PascalCase, como ProjectCard.jsx e Header.jsx.

Hooks personalizados: iniciar os nomes com use, utilizando camelCase, como useProjects.js.

Funções e variáveis: utilizar camelCase, como fetchProjects e projectList.

Constantes: utilizar UPPER_SNAKE_CASE quando representarem valores fixos, como API_BASE_URL.

Arquivos de componentes: utilizar nomes claros e relacionados à responsabilidade de cada componente.

Organização e arquitetura

Manter componentes pequenos, reutilizáveis e com responsabilidades bem definidas.

Separar chamadas de API e integrações com o Supabase da camada de apresentação, utilizando a pasta services quando apropriado.

Reutilizar componentes existentes antes de criar novas implementações.

Evitar duplicação de código e dependências desnecessárias.

Preservar a estrutura e o comportamento existente do projeto ao implementar novas funcionalidades.

Regras para ferramentas de IA

Analisar os arquivos existentes antes de propor alterações.

Respeitar as tecnologias, dependências e convenções já adotadas.

Não remover funcionalidades existentes sem justificativa.

Não incluir credenciais, tokens ou chaves privadas diretamente no código.

Priorizar soluções simples, legíveis, acessíveis e fáceis de manter.

Informar quais arquivos foram alterados e explicar as mudanças realizadas.

Verificar possíveis erros e executar os testes ou o build disponível antes de considerar uma alteração concluída.

Essas convenções devem ser seguidas durante a implementação de novas funcionalidades, correções e refatorações, garantindo maior consistência entre o código desenvolvido manualmente e aquele produzido com auxílio de inteligência artificial.


