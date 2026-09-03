---
title: Bem-vindo ao tabelahub
date: 2026-08-12
summary: 'O hub central da TabelaDev tá no ar - landing, news e changelog agregado dos produtos. Por que ele existe (spoiler: preguiça de manter N sites) e o que tu vai encontrar aqui.'
tags: [tabelahub]
featured: true
---

O `tabelahub` é o ponto de entrada da TabelaDev: uma landing que amarra todos os produtos, um feed de news com o que eu ando fazendo e pensando, e um changelog que se mantém sozinho a partir das releases - porque manter changelog na mão é aquele tipo de tarefa que todo mundo jura que vai fazer e morre no segundo mês.

A TabelaDev nasceu de uma crença simples: software pessoal deveria custar quase nada pra rodar e ser um prazer de usar. Tudo que eu publico aqui segue esse espírito - apps web em SvelteKit, TUIs em Go, e uma estética compartilhada de "lendo o código-fonte de alguém".

## O que você vai encontrar

- **`/`** - a landing com todos os produtos do org.
- **`/news`** - o que estou construindo, o que penso sobre ferramentas e as decisões de design (inclusive as que eu arrependo).
- **`/changelog`** - histórico de releases de todos os repos públicos, agregado automaticamente.

## Por que um hub

Cada repo tem seu README, mas nada amarrava a coisa toda. O hub é esse fio condutor: da landing você chega no repo, do changelog você vê o projeto ganhar vida, das news você entende o _porquê_ por trás das decisões.

O site inteiro é open source - [`tabelahub`](https://github.com/TabelaDev/tabelahub) - e construído em cima do próprio [`tabelawebui`](https://github.com/TabelaDev/tabelawebui), a lib de tema e componentes da casa. É o mesmo estilo dos apps, dogfooding total: se a lib não serve pra fazer o site dela, ela não serve pra nada.
