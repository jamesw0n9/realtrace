<!-- Translated from the English source README.md — English is the single source of truth. See docs/i18n.md. -->
<p align="center">
  <a href="README.md">English</a> ·
  <a href="README.zh.md">简体中文</a> ·
  <a href="README.zh-TW.md">繁體中文</a> ·
  <a href="README.ja.md">日本語</a> ·
  <a href="README.ko.md">한국어</a> ·
  <a href="README.de.md">Deutsch</a> ·
  <a href="README.fr.md">Français</a> ·
  <a href="README.es.md">Español</a> ·
  <a href="README.pt-BR.md">Português</a> ·
  <a href="README.ru.md">Русский</a> ·
  <a href="README.id.md">Bahasa Indonesia</a> ·
  <a href="README.it.md">Italiano</a> ·
  <a href="README.tr.md">Türkçe</a> ·
  <a href="README.vi.md">Tiếng Việt</a>
</p>
# RealTrace

> **A criação humana deve permanecer provável na era da IA.**
>
> Cadeia de assinaturas Ed25519 · Carimbo em tempo real · Sem upload de conteúdo · Verificação offline · ancoragem oficial da cadeia de gênese (grátis para indivíduos)

[![Licença: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE)
[![Versão](https://img.shields.io/badge/version-v0.6.0-orange.svg)](https://github.com/jamesw0n9/realtrace)
[![PRs Bem-vindos](https://img.shields.io/badge/PRs-bem-vindos-brightgreen.svg)](https://github.com/jamesw0n9/realtrace/pulls)

<p align="center">
  <img src="docs/demo/realtrace-demo-25s-en.gif" alt="Demo do RealTrace" width="640" />
  <br />
  <em>25 segundos · do carimbo em tempo real à verificação offline (demo · sem áudio)</em>
  <br />
  <a href="docs/demo/realtrace-demo-25s-en.mp4">▶ Assistir ao vídeo completo da demo (MP4)</a>
</p>

> Quando tudo pode ser forjado, a autenticidade se torna um luxo. **Os detectores adivinham. RealTrace prova.**

RealTrace é um **sistema de certificação de presença de criação humana**: ele usa uma cadeia de assinaturas criptográficas para provar que um conteúdo "foi realmente escrito por um humano em tempo real" — não gerado por IA, não colado posteriormente, não alterado.

```text
Criação humana ── carimbo em tempo real ── cadeia de assinaturas ── selado e ancorado ── verificável · rastreador · inalterável
```

---

## Manifesto

Em novembro de 2022, o ChatGPT nasceu. A partir daquele dia em diante, em um mundo onde tudo pode ser forjado, a autenticidade se tornou um luxo.

A IA pode imitar qualquer estilo — exceto o tempo da sua digitação. Os detectores adivinham. RealTrace prova.

RealTrace é um **sistema de certificação de presença de criação humana**: desde o primeiro segundo que você começa a escrever, cada pausa, cada exclusão, cada ritmo da sua digitação é gravado em tempo real e bloqueado por assinaturas Ed25519 em uma cadeia de criação imutável. Quando você terminar, você terá um arquivo `.rt` de cadeia — verificável, rastreador, inalterável.

**Isso já não é uma questão de múltipla escolha.** Cada selo referencia o hash do anterior. A ordem causal é bloqueada pela criptografia; qualquer modificação retrospectiva é detectável matemática e statisticamente. Isso é evidência da física e da matemática, não uma conjectura de um modelo estatístico.

**Você é o autor. Você merece prova.** Quando alguém perguntar "a IA escreveu isso?", você não deve precisar explicar. RealTrace oferece uma prova de presença verificável de forma independente — para publicação, para defender seus direitos, para prova. Criadores não devem lutar desarmados.

**Seu conteúdo pertence a você. Sempre.** O texto nunca sai do seu dispositivo; a cadeia apenas grava hashes e traços comportamentais. Não prometemos proteger sua privacidade — a arquitetura faz com que seja impossível termos seu conteúdo. O carimbo, a verificação e a verificação de certificados acontecem offline. A cadeia continua funcionando mesmo se nosso site cair.

**A confiança não deve ser decidida apenas pelo plataforma.** As raízes das sub-cadeias ancoram na cadeia de gênese oficial. Cadeias assinadas em qualquer plataforma podem rastrear até o mesmo âncora público para auditoria independente.

RealTrace é de código aberto. Gratuito para indivíduos. Cada criador pode selar seu próprio trabalho.

**Sua criação. Sua prova de presença.**

---

## Quando a criação humana se torna algo a ser acumulado

Em julho de 2026, documentos judiciais desencerrados revelaram o "Projeto Panama" da Anthropic: a compra em massa de mais de um milhão de livros físicos usados por vendedores de segunda mão — lombos cortados com uma prensa hidráulica, escaneados página a página, e destruídos — tudo para que Claude pudesse ler mais "palavras escritas por mãos humanas." Em um caso separado, aproximadamente 7 milhões de livros não autorizados foram usados para treinamento, resultando em um acordo de 1,5 bilhões de dólares, um recorde na litigação de direitos autorais dos EUA.

Empresas de IA estão acumulando criação humana. Porque elas sabem melhor do que ninguém: os modelos podem gerar infinitamente, mas o pensamento, a experiência e a escolha humanos são finitos. Livros antigos serão comprados, escaneados e destruídos; as palavras escritas pela próxima geração estão afogando no dilúvio da IA — incapazes sequer de provar "eu escrevi isso."

Quando a criação humana se torna escassa, ela precisa ser provada e protegida.

Isso é exatamente o que faz o RealTrace: desde o momento que você começa a escrever, seu processo criativo é bloqueado em uma cadeia de assinaturas verificável e inalterável. Suas palavras sempre pertencerão a você. Sua criação tem prova de presença.

**Quando a criação humana se torna escassa, o RealTrace é sua prova de presença.**

---

## Por que o RealTrace existe

Em novembro de 2022, o ChatGPT nasceu. A partir daquele dia em diante, tudo na internet se tornou "inconfiável": notícias, comentários, ensaios, poesia, código, contratos, ações judiciais — ninguém, nem mesmo o autor, podia dizer com olhos nus se um texto veio de um humano ou de uma máquina.

Mais assustador do que "a IA pode escrever coisas" é isso: **quando tudo pode ser forjado, a autenticidade se torna um luxo**. O valor da criação humana está sendo silenciosamente diluído — seus pensamentos, emoções, experiências e escolhas se tornam texto indistinguível do output da máquina.

A missão do RealTrace é dar "criação humana" uma **prova criptográfica de presença**:

- **Desde o primeiro segundo que você escreve**: não uma alegação pós-fato de "eu escrevi isso", mas gravação e assinatura em tempo real do processo criativo;
- **Sem dependência da reputação da plataforma**: cada assinatura pode ser verificada independentemente offline e auditada matemática e estatisticamente;
- **Zero upload de conteúdo**: o texto sempre permanece em suas mãos; a cadeia registra apenas hashes e traços comportamentais.

> Em uma era onde a IA pode imitar tudo, a dignidade da criação humana merece ser defendida.

---

## Quais problemas resolvemos

| Problema | Solução do RealTrace |
|:--|:--|
| Conteúdo gerado por IA não pode ser distinguido da criação humana | Carimbo em tempo real: assinaturas de assinatura Ed25519 são geradas automaticamente durante a escrita, registrando o ritmo das teclas, pausas, volume de exclusão e outros traços comportamentais |
| Manuseio pós-hoc ou substituição não pode ser detectado | Hashing da cadeia: cada selo referencia o hash do selo anterior; qualquer modificação retrospectiva é detectável matemática e estatisticamente |
| O upload de conteúdo cria riscos de privacidade | Sem upload de conteúdo: o texto permanece local; a cadeia registra apenas hashes e traços comportamentais |
| A verificação depende de um servidor; a cadeia morre quando o site cai | Totalmente offline: o carimbo, a verificação e a verificação de certificados acontecem localmente; os arquivos `.rt` são autocontidos |
| Não é possível rastrear "quem assinou, qual versão foi assinada" | Ancoragem da cadeia de gênese: as raízes das sub-cadeias são derivadas deterministicamente da semente oficial via HKDF-SHA256; as raízes das sub-cadeias ancoram na cadeia de gênese oficial — rastreador para cima e para baixo (grátis para indivíduos). |

---

## Princípios centrais

**Cadeia de assinaturas (cadeia de selos)** — cada selo durante a escrita é um nó na cadeia de assinaturas:

```text
chainHash = SHA-256(sessionId || index || salt || timestamp || contentHash || prevChainHash || nonce)
signature = Ed25519_sign(chainHash)
```

- **A ordem causal não pode ser forjada**: cada selo do hash referencia o selo anterior; a ordem topológica da cadeia é determinada por `prevChainHash`, independente do tempo do sistema — não pode ser inserido ou reordenado após o fato;
- **Chaves privadas não podem ser forjadas**: as assinaturas Ed25519 são produzidas por uma chave privada gerada localmente que nunca sai do seu dispositivo;
- **Impressão comportamental**: cada selo carrega traços de ritmo de teclado / pausa / exclusão (cadeia de comportamento HMAC) para análise de credibilidade;
- **Ancoragem da cadeia de gênese**: as chaves das sub-cadeias são derivadas deterministicamente da semente oficial via HKDF-SHA256; as raízes das sub-cadeias ancoram na cadeia de gênese oficial — rastreador para cima e para baixo (grátis para indivíduos);
- **Ligação Merkle de texto completo**: cada selo também calcula o root Merkle do texto completo e o escreve na cadeia, permitindo a divulgação seletiva de qualquer passagem sem expor todo o texto.

**Formato de arquivo de cadeia (`.rt`)**: um contêiner ZIP que contém `chain.json` (cadeia de assinaturas) e `meta.json` (versão, tempo, metadados do certificado). A cadeia registra apenas "evidência do processo criativo", nunca o conteúdo.

Veja [`docs/chain-spec.md`](docs/chain-spec.md) e [`docs/rt-file-format.md`](docs/rt-file-format.md).

---

## Início rápido

### 1. Abra o writer localmente (sem servidor necessário)

Clique duas vezes em `writer/index.html`, ou sirva o repositório raiz com qualquer servidor estático:

```bash
npx serve .
# abra http://localhost:3000/writer/
```

- Escolha "Escrita anônima" ou "Importar .rt para continuar" antes de entrar no editor; o conteúdo é carimbado automaticamente à medida que você digita;
- Clique em "Selar e Ancorar" para confirmar: você é redirecionado para a página de verificação offline para baixar o arquivo `.txt` original e o arquivo `.rt` de cadeia (exportação puramente local, sem upload);
- Abra `verify/index.html` e arraste o arquivo `.rt` para verificar a integridade da cadeia completamente offline.

### 2. Ative a ancoragem oficial da cadeia de gênese (opcional, grátis para indivíduos)

```bash
copy config.example.js config.js
```

Edite `config.js`:

```js
window.RT_CONFIG = {
  anchor: {
    apiBase: "https://official-anchor-service",  // use o endereço publicado oficialmente
    genesisPublicKey: "official-genesis-root-public-key",
    enabled: true                                // submeta a raiz da cadeia na selagem
  }
};
```

> `config.js` é ignorado por `.gitignore`, então sua configuração de endpoint própria não será acidentalmente comprometida.
> Ancorar suas criações pessoais na cadeia é **grátis**; a colaboração de empresas / plataformas é licenciada (entre em contato para colaboração comercial).

### 3. Execute testes

```bash
npm test
```

## Estrutura de diretório

| Caminho | Descrição |
|:--|:--|
| `core/` | Núcleo puramente front-end (IIFE do navegador, zero dependências de construção): carimbo `stamp.js`, criptografia `rt-crypto.js`, verificação offline `rt-verifier.js`, arquivo de cadeia `rt-export.js`, revelação Merkle `rt-merkle.js`, cronograma `rt-timeline.js`, download de arquivo `rt-downloader.js` |
| `writer/` | Ferramenta de escrita (HTML de página única): carimbo automático + download de selo |
| `verify/` | Página de verificação de cadeia offline: arraste um arquivo `.rt` para verificar |
| `anchor/` | Cliente de ancoragem de genesis-chain oficial (gratuito para indivíduos) |
| `docs/` | Especificação da cadeia, formato de arquivo rt, documentos da API de ancoragem |
| `test/` | Testes de regressão do Node (24/24 passando) |

---

## Como o projeto cresceu

| Data | Marco |
|:--|:--|
| 2022.11 | **Origem**: Lançamento do ChatGPT; "Conteúdo gerado por IA não pode mais ser distinguido a olho nu" tornou-se realidade, gerando a ideia de um "prova de presença de criação humana" |
| 2026.06 | **Primeira implementação completa**: carimbo → selo → verificação offline → certificado autônomo, de ponta a ponta; 11 patentes de invenção desenhadas em paralelo, caso pai arquivado com a agência de patentes |
| 2026.07 | **Refatoração modular**: núcleo de carimbo `stamp.js` extraído como módulo, kit de ferramentas de criptografia `rt-crypto.js` estratificado, serviços de escritor / verificador / ancoragem desacoplados; renomeado oficialmente para **RealTrace**; serviço de ancoragem de genesis-chain oficial lançado |
| 2026.08 | **Versão MVP 0.1.0 lançada** (AGPL-3.0 + licença dual comercial); modelo de licenciamento empresarial em planejamento |
| 2026.08 | **Versão 0.2.0 lançada**: revelação seletiva Merkle + geração de provas de revelação, interface em seis idiomas, regras de nomeação de ID de cadeia, seleção de modo de criação, cronograma modular |
| 2026.08 | **Versão 0.3.0 lançada**: fila de ancoragem de genesis (fila de sincronização offline + tentativa automática + assinatura anti-hijack), painel de fila de ancoragem de seis idiomas integrado ao escritor |
| 2026.08 | **Versão 0.4.0 lançada**: módulo de identidade (.rtkey exportação/importação, recuperação de identidade criptografada por senha, identidade embutida no selo), semântica de fusão de formato de cadeia v3 (continuação automática com a mesma chave / contêiner de agregação de chaves cruzadas), verificador multi-navegador |
| 2026.08 | **Versão 0.5.0 lançada**: fila de ancoragem de genesis (fila de sincronização offline + tentativa automática + assinatura anti-hijack), painel de fila de ancoragem de seis idiomas integrado ao escritor |
| 2026.08 | **Versão 0.6.0 lançada**: módulo de identidade (.rtkey exportação/importação, recuperação de identidade criptografada por senha, identidade embutida no selo), semântica de fusão de formato de cadeia v3 (continuação automática com a mesma chave / contêiner de agregação de chaves cruzadas), verificador multi-navegador |
| 2026.08 | **Versão 0.7.0 lançada**: fila de ancoragem de genesis (fila de sincronização offline + tentativa automática + assinatura anti-hijack), painel de fila de ancoragem de seis idiomas integrado ao escritor |
| 2026.08 | **Versão 0.8.0 lançada**: módulo de identidade (.rtkey exportação/importação, recuperação de identidade criptografada por senha, identidade embutida no selo), semântica de fusão de formato de cadeia v3 (continuação automática com a mesma chave / contêiner de agregação de chaves cruzadas), verificador multi-navegador |

---

## O que há nessa versão (v0.4.0)

Este repositório é um **construção open-source completa**: ele implementa o ciclo completo "escrever → carimbar → selar → verificar → continuidade de identidade → fusão de cadeia". Esta versão inclui:

- **Carimbo em tempo real**: assinaturas de carimbo Ed25519 geradas automaticamente durante a escrita, registrando o ritmo de teclados, pausas, volume de exclusão e outras características comportamentais;
- **Cadeia inalterável**: cada carimbo referencia o hash da cadeia do carimbo anterior; qualquer modificação retrospectiva é detectável matemática;
- **Sem upload de conteúdo**: o texto permanece local; a cadeia registra apenas hashes de conteúdo e características comportamentais;
- **Verificação offline**: arquivos de cadeia `.rt` podem ser verificados completamente offline, sem dependência do servidor;
- **Impressão digital comportamental**: traços de ritmo de teclados / pausa / exclusão (cadeia de comportamento HMAC) para análise de credibilidade;
- **Anchoreamento de genesis-chain (opcional, gratuito para indivíduos)**: após o selo, o hash raiz da cadeia é submetido à genesis-chain oficial, formando uma origem auditável publicamente;
- **Rastreamento de versão**: pacotes `.rt` registram `appVersion` em `meta.json` e `version` do formato de cadeia em `chain.json`; a versão é transportada ao ancorar na cadeia;
- **Revelação seletiva Merkle**: cada selo liga um raiz Merkle de texto completo, permitindo que qualquer passagem seja revelada sem revelar todo o texto;
- **Geração de provas de revelação**: clique único para prova de qualquer passagem na página de verificação offline, com visualização de caminho Merkle e JSON copiável;
- **Interface em seis idiomas**: escritor / verificador / site em 简体中文 · English · 日本語 · 한국어 · Deutsch · Français;
- **Regras de nomeação de ID de cadeia**: ID de cadeia de 23 caracteres (`web-personal-…`) ligando chave pública + hash raiz — verificável, não reversível;
- **Seleção de modo de criação**: escolha "Escrita anônima" ou "Importar .rt para continuar" antes de escrever; a continuação automaticamente estende a cadeia original;
- **Cronograma modular**: o histograma cronograma escalável é extraído para o módulo compartilhado `core/rt-timeline.js`, tornando o ritmo de escrita visível a um glance;

- **Fila de ancoragem de genesis**: após o selo, os metadados da cadeia são enfileirados localmente primeiro e sincronizados automaticamente quando voltar online; uma assinatura Ed25519 (`chainId|rootHash`) previne o hijack de reivindicação;
- **Painel de fila de ancoragem (seis idiomas)**: ⛓ indicador de status / sincronização manual com um clique / alternância de sincronização automática no escritor — upload de conteúdo mantido;
- **Atualização da notificação de privacidade**: esclarece que após o selo, apenas os metadados da cadeia podem ser sincronizados com a genesis-chain, e que a sincronização automática pode ser desativada no painel ⛓;

- **Módulo de identidade**: chave de identidade criptografada PBKDF2-SHA256 (600K iterações) + AES-256-GCM; exportação / importação de arquivos de chave de identidade `.rtkey`; a importação de um `.rt` com identidade recupera o criador via senha; o selo embute a identidade criptografada para que a mesma chave possa continuar a cadeia original;
- **Semântica de fusão de formato de cadeia v3**: continuação automática com a mesma chave estende automaticamente a cadeia original (`mergeChainsVerified` reassina e verifica); cadeias cruzadas podem ser agrupadas em um contêiner (`aggregateChains`), verificadas sub-cadeia por sub-cadeia;
- **Verificador multi-navegador**: verificação de assinatura tweetnacl unificada com WebCrypto como fallback apenas — resultados consistentes em todos os navegadores.

> Registo completo de mudanças: [CHANGELOG.md](CHANGELOG.md).

Todas as funcionalidades permanecem compatíveis com versões anteriores: os arquivos de cadeia `.rt` gerados por versões mais antigas devem permanecer verificáveis e rastreadáveis em versões posteriores.

---

## Como nos diferenciamos das soluções existentes

| | RealTrace | E-signature comum | TSA timestamp | Registro de direitos autorais |
|:--|:--|:--|:--|:--|
| Prova de "o conteúdo foi escrito por um humano em tempo real" | ✅ evidência de nível de processo | ❌ apenas prova da identidade do assinante | ❌ apenas prova do tempo | ❌ registro pós-fato |
| Previne manipulação pós-hoc | ✅ hashing de cadeia + assinatura | ⚠️ objeto de assinatura apenas | ⚠️ objeto de hash apenas | ❌ |
| Cobre todo o processo criativo | ✅ desde o primeiro caractere até o selo | ❌ | ❌ | ❌ |
| Verificável offline | ✅ `.rt` autônomo | ⚠️ depende de PKI | ⚠️ depende de serviço online | ❌ depende do corpo de registro |
| Privacidade (sem upload de conteúdo) | ✅ sem upload de conteúdo | — | — | ❌ conteúdo deve ser submetido |

---

## Casos de uso

- **Criadores submetendo trabalho**: quando seu trabalho é questionado com "um IA escreveu isso?", uma prova `.rt` de presença explica o processo criativo — contagem de palavras, tempo gasto, ritmo criativo, verificável por qualquer pessoa;
- **Defesa de direitos autorais**: a evidência não é mais uma reivindicação verbal. A impressão digital comportamental e a cadeia de assinaturas na cadeia fornecem evidência auditável do processo criativo original;
- **Publicadores / comunidades de conteúdo**: verificar se uma submissão foi realmente criada em tempo real por um humano, em vez de colada posteriormente ou gerada em lote por máquinas;
- **Cenários acadêmicos**: evidência de processo original para artigos, projetos e documentos técnicos, para que "eu escrevi isso" tenha algo para se apoiar.

> Os criadores não devem enfrentar suspeitas desarmados.

---

## Privacidade & segurança

- **Sem upload de conteúdo** por padrão: sua escrita permanece local; a cadeia registra apenas hashes de conteúdo e características comportamentais;
- Arquivos de cadeia `.rt` estão completamente sob seu controle — armazene-os localmente ou faça backup com sua própria criptografia;
- O ancoragem oficial submete apenas o hash raiz da cadeia e os metadados da assinatura, nunca o conteúdo;
- Toda a lógica de verificação é open-source e auditável;
- Se encontrar uma vulnerabilidade de segurança, mensage os mantenedores privadamente; não divulgue publicamente antes que uma correção esteja pronta.

---

---

## Patrocínio · Compre um café para mim

Gostou do projeto? Compre um café ☕:

- [GitHub Sponsors](https://github.com/sponsors/jamesw0n9)
- [Ko-fi](https://ko-fi.com/realtrace)
- China: códigos QR de Alipay / WeChat Pay (apenas dicas pessoais, não uma licença comercial)

| Alipay | WeChat Pay |
|:---:|:---:|
| <img src="site/sponsor/alipay.png" width="130" alt="Alipay QR"> | <img src="site/sponsor/wechat.png" width="130" alt="WeChat Pay QR"> |

> O patrocínio é apenas um sinal de apoio — **não é uma licença comercial**. O uso pessoal permanece gratuito; a integração empresarial / de plataforma é licenciada separadamente via [`LICENSE.commercial`](LICENSE.commercial).

---

## Open source & comercial

**Licença dual AGPL-3.0 + comercial** (a parte open-source é regida pelo texto completo da AGPL-3.0 em [`LICENSE`](LICENSE)):

- **Indivíduos**: livre para usar, modificar e distribuir; cadeias de criação auto-construídas / auto-assinadas são completamente gratuitas e podem ser verificadas offline; o ancoragem na genesis-chain oficial é gratuito para indivíduos;
- **Organizações não comerciais / pequenos grupos** (escolas públicas ou não lucrativas, associações de escritores / indústria, etc., verificadas por registro não lucrativo / certificado de entidade jurídica): gratuito para uso interno dos membros apenas — sem serviços pagos externos, sem operação de plataforma pública, sem revenda ou redistribuição após integração;
- **Empresas / plataformas**: a cooperação é licenciada — veja [`LICENSE.commercial`](LICENSE.commercial).

> Gratuito para uso pessoal; a integração comercial / de plataforma requer uma licença separada. Problemas e Pull Requests são bem-vindos — compatibilidade de formato de cadeia, correção de verificação e questões de privacidade / segurança têm prioridade.

---

**Sua criação. Sua prova de presença.**

Em uma era onde a IA pode imitar tudo, a dignidade da criação humana merece ser defendida.
