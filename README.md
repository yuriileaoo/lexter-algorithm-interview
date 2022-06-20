# Teste de algorítimo Lexter.ai

## Introdução

O teste consiste em escrever um algorítimo que modifique um lista de objetos do
tipo Input (definido em `src/input.ts`) para uma lista de objetos do tipo output
(definido em `src/output.ts`), usando Typescript e quaisquer outras ferramentas
que deseje.

## Rodando

O setup do Node.js com o Typescript já está feito para você, basta usar
`npm start` para rodar o projeto.

O arquivo de entrada do projeto é o `src/index.ts`

## Detalhes

* Todos os níveis da lista de output devem estar em ordem crescente por entryId.
* Uma entrada deve ser filha da outra se o inicio do path de ambas for igual, ou
  seja, a entrada 'root/path' é filha da entrada 'root'.
* A estrutura tem profundidade indefinida.
* A chave `fullPath` do Output é uma string com todos os elementos do path
  separados por `/`.
* A chave `currentPath` é o valor do path atual. Ou seja para a entrada de
  `fullPath` `roo/path` o seu `currentPath` é `path`.
* Os arquivos `src/input.ts` e `src/output.ts` tem um exemplo de um array de
  input e um de output.
