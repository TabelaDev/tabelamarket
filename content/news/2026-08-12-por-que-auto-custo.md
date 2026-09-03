---
title: Por que "auto custo"
date: 2026-08-12
summary: 'Minha filosofia pra software pessoal: suas chaves, seu banco, sua conta de nuvem. Nada de assinatura o olho da cara, nada de lock-in. BYOK não é feature, é princípio.'
tags: [filosofia]
featured: true
---

A frase "auto custo" aparece em vários repos da TAbelhaDev, e não é à toa: é a restrição de design que define o que cada app faz (e, principalmente, o que ele **não** faz).

## A regra

O app roda custando (quase) nada. Nada de assinatura mensal, nada de plano "Pro" empurrado na sua cara com popup a cada três cliques. O custo da infraestrutura é o seu, e ele é mínimo: uma conta de Cloudflare grátis, um banco pequeno, e - quando você quiser IA - **sua própria chave** (BYOK, bring your own key).

## Por que BYOK não é feature, é princípio

Quando um app aceita _sua_ chave de API, várias coisas mudam de uma vez:

1. **Sem lock-in.** Você paga direto ao provedor que escolheu. Trocar de modelo não é migração, é trocar um campo de config (e eu recomendo testar os modelos chineses, mas esse é papo pra outro post).
2. **Custo previsível.** O "plano" é o seu próprio consumo. Nada de surpresa no fim do mês porque você passou do limite do tier grátis.
3. **Dados onde você manda.** Suas credenciais e seus dados ficam no seu banco, criptografados. O app não vê, não guarda, não revende - o que, infelizmente, é mais do que dá pra dizer de boa parte do SaaS por aí.

Isso se conecta com outra regra da casa: **regras locais primeiro, IA depois.** No [tabelafin](https://github.com/TAbelhaDev/tabelafin), por exemplo, a categorização roda por regras locais mesmo sem nenhuma chave - IA é um upgrade opcional, nunca um requisito. App que funciona sem depender de terceiro é app que continua funcionando quando o terceiro muda de ideia.

## O custo dessa escolha

É mais trabalho pra mim. Sem assinatura não existe o modelo de "sustentar o servidor com a mensalidade", então a infra tem que ser barata por construção, não por desconto. E o BYOK joga pro usuário uma decisão que SaaS costuma esconder: quanto isso custa de verdade.

Mas vale a pena: software pessoal que funciona sem um plano pago é software que continua existindo mesmo quando a startup acaba. E startup acaba.
