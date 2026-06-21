# pgats-pagamento-tcd

Trabalho de conclusão da disciplina **Programação para Automação de Testes (PGATS)**, reutilizado aqui como
projeto-alvo do trabalho de conclusão da disciplina **Integração Contínua para Automação de Testes**.

O projeto contém a classe `ServicoDePagamento` (`src/servicoDePagamento.js`) e seus testes de unidade
em Mocha (`test/servicoDePagamento.test.js`).

## Pré-requisitos

- Node.js 20+
- npm

## Como rodar os testes localmente

```bash
npm install
npm test
```

`npm test` executa o Mocha com o reporter **mochawesome**, gerando o relatório em `mochawesome-report/`
(`mochawesome.html` e `mochawesome.json`).

## Pipeline de Integração Contínua

A pipeline está definida em um único arquivo: [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

### Gatilhos (formas de disparo)

A mesma pipeline pode ser disparada de três formas, conforme exigido pelo trabalho:

| Gatilho | Chave no YAML | Quando dispara |
| --- | --- | --- |
| Manual (nível 1) | `workflow_dispatch` | Ao clicar em **Run workflow** na aba Actions |
| Push | `push` (branch `main`) | A cada push na branch principal |
| Agendado (nível 2) | `schedule` (`cron: '0 12 * * *'`) | Diariamente às 12:00 UTC (09:00 BRT) |

> O cron do GitHub Actions é executado em **UTC** e só roda na **branch padrão** do repositório (`main`).

### Job e passos

A pipeline tem um job `testes` que roda em `ubuntu-latest`:

1. **Checkout** do projeto — `actions/checkout@v4`
2. **Setup do Node** — `actions/setup-node@v4` (Node 20)
3. **Instalação das dependências** — `npm ci`
4. **Execução dos testes** — `npm test`
5. **Armazenamento do relatório** — `actions/upload-artifact@v4` com `if: ${{ always() }}`,
   publicando a pasta `mochawesome-report` como o artefato **"Relatório de Testes"**.

O `if: ${{ always() }}` garante que o relatório seja salvo mesmo que os testes falhem.

### Como visualizar o relatório

Na aba **Actions** do repositório → abra a execução desejada → seção **Artifacts** →
baixe **"Relatório de Testes"** → extraia o `.zip` e abra `mochawesome.html` no navegador.

## Conceitos da disciplina aplicados

- **Integração Contínua**: validação automatizada dos testes a cada push e em execuções agendadas/manuais.
- **Gatilhos (triggers)**: execução manual (`workflow_dispatch`), por push e agendada (`schedule`/cron).
- **Workflow, job, steps e runner**: estrutura da pipeline rodando em uma máquina `ubuntu-latest`.
- **Relatório de testes**: geração de relatório compatível com o framework (Mocha → mochawesome).
- **Artefato**: armazenamento/publicação do relatório na pipeline, disponível após a execução.
