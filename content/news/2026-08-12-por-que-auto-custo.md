---
title: Por que "auto custo"
date: 2026-08-12
summary: "A filosofia por trás da TabelaDev: suas chaves, seu banco, sua conta de nuvem. Nada de assinatura, nada de lock-in. BYOK não é feature, é princípio."
tags: [filosofia]
featured: true
---

A frase "auto custo" aparece em vários repos da TabelaDev, e não é só um rótulo
de marketing — é a restrição de design que define o que cada app faz (e o que
ele **não** faz).

## A regra

O app roda custando (quase) nada. Nada de assinatura mensal, nada de um plano
"Pro" empurrado na sua cara. O custo da infraestrutura é o seu, e ele é mínimo:
uma conta de Cloudflare grátis, um banco pequeno, e — quando você quiser IA —
**sua própria chave** (BYOK, bring your own key).

## Por que BYOK não é feature, é princípio

Quando um app aceita _sua_ chave de API, várias coisas mudam de uma vez:

1. **Sem lock-in.** Você paga direto ao provedor que escolheu. Trocar de modelo
   não é migração, é trocar um campo de config.
2. **Custo previsível.** O "plano" é o seu próprio consumo. Nada de surpresa no
   fim do mês porque você passou do limite do tier grátis.
3. **Dados onde você manda.** Suas credenciais e seus dados ficam no seu banco,
   criptografados. O app não vê, não guarda, não revende.

Isso se conecta com outra regra da casa: **regras locais primeiro, IA depois.**
No [tabelafin](https://github.com/TabelaDev/tabelafin), por exemplo, a
categorização roda por regras locais mesmo sem nenhuma chave — IA é um upgrade
opcional, nunca um requisito.

## O custo dessa escolha

É mais trabalho pra quem desenvolve. Sem assinatura não existe o modelo de
"sustentar o servidor com a mensalidade", então a infra tem que ser barata por
construção, não por desconto. E o BYOK joga pro usuário uma decisão que SaaS
costuma esconder.

Mas vale a pena: software pessoal que funciona sem um plano pago é software que
continua existindo mesmo quando a startup acaba.
