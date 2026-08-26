---
title: A estética "lendo o código-fonte de alguém"
date: 2026-08-12
summary: 'Todo app da TabelaDev compartilha a mesma linguagem visual: Catppuccin, bordas afiadas, mono carregando a estrutura. Não é coincidência - é o tabelawebui. (E não, não é preguiça. Ok, talvez um pouco.)'
tags: [tabelawebui, design]
featured: true
---

Se você abriu dois apps da TabelaDev, reparou: eles parecem a mesma família. Mesmo fundo, mesma tipografia, mesmas bordas. Isso não é preguiça (ok, é um pouco) - é o [`tabelawebui`](https://github.com/TabelaDev/tabelawebui) no centro da casa.

## A estética

A frase que resume tudo é "lendo o código-fonte de alguém": a estrutura (labels, datas, valores, navegação) é carregada por mono - a tipografia de quem escreve código -, as bordas são afiadas e bem definidas, e uma cor de accent marca o que importa. O resultado parece mais um arquivo bem organizado do que um site "de template" - e é exatamente esse o ponto.

A paleta é Catppuccin (Latte no claro, Mocha no escuro), porque escolher cor é decisão difícil e alguém já tomou ela muito bem. Os tokens que importam são semânticos: `paper`, `ink`, `rule`, `accent`. O app declara o que é, não qual hex é.

## Por que uma lib, não um monte de CSS copiado

Cada app nasceu com o mesmo problema: redesenhar do zero o tema e os componentes que todo mundo redesenha. O `tabelawebui` resolve isso de uma vez - tema, componentes e chrome ficam num lugar só, com uma fonte de verdade pra paleta. Copiar CSS entre projetos "só dessa vez" é o caminho mais rápido pro caos, e eu digo isso por experiência própria.

E tem um detalhe que eu gosto muito: o **fluxo de requests**. Quando um app precisa de um componente novo, o pedido vira um arquivo em `requests/` no repo da lib - com a API proposta e critérios de aceite - e o componente nasce lá, não como CSS paralelo no app. É o mesmo princípio do changelog aqui no hub: decisões registradas, em vez de ficarem na cabeça de quem implementa (ou pior, na minha).

## Os gêmeos no terminal

A mesma história vale pro terminal: as TUIs em Go compartilham o [`tabelatuiui`](https://github.com/TabelaDev/tabelatuiui), que leva a mesma linguagem visual pros TUIs do [tabelavagas](https://github.com/TabelaDev/tabelavagas), [tabelaradar](https://github.com/TabelaDev/tabelaradar) e cia. Web e TUI, mesma cara de família.

Este site é a prova viva: construído inteiro em cima do `tabelawebui`, incluindo o tema que você está vendo agora. Se isso aqui tá bonito (ou pelo menos consistente), a lib merece o crédito.
