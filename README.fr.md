<p align="center">
  <a href="README.md">简体中文</a> ·
  <a href="README.en.md">English</a> ·
  <a href="README.ja.md">日本語</a> ·
  <a href="README.ko.md">한국어</a> ·
  <a href="README.de.md">Deutsch</a> ·
  <a href="README.fr.md">Français</a>
</p>
# RealTrace

> **La création humaine doit rester prouvable à l'ère de l'IA.**
>
> Chaîne de signatures Ed25519 · Estampillage en temps réel · Aucun upload de contenu · Vérification hors ligne · Ancrage à la chaîne de genèse officielle (gratuit pour les particuliers)

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-v0.1.0-orange.svg)](https://github.com/jamesw0n9/realtrace)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jamesw0n9/realtrace/pulls)

> Quand tout peut être falsifié, l'authenticité devient un luxe. **Les détecteurs devinent. RealTrace prouve.**

RealTrace est un **système de certification de présence de la création humaine** : il prouve par une chaîne de signatures cryptographiques qu'un contenu « a réellement été écrit par un humain en temps réel » — ni généré par l'IA, ni collé après coup, ni modifié.

```text
Création humaine ── estampillage en temps réel ── chaîne de signatures ── scellée & ancrée ── vérifiable · traçable · infalsifiable
```

---

## Manifeste

En novembre 2022, ChatGPT est né. À partir de ce jour, dans un monde où tout peut être falsifié, l'authenticité est devenue un luxe.

L'IA peut imiter tous les styles – sauf le temps de votre frappe. Les détecteurs devinent. RealTrace prouve.

RealTrace est un **système de certification de présence de la création humaine** : dès la première seconde d'écriture, chaque pause, chaque suppression, chaque rythme de frappe est enregistré en temps réel et verrouillé par des signatures Ed25519 dans une chaîne de création infalsifiable. Quand vous terminez, vous tenez un fichier de chaîne `.rt` – vérifiable, traçable, infalsifiable.

**Ce n'est plus une question à choix multiples.** Chaque scellé référence le hash du précédent. L'ordre causal est verrouillé par la cryptographie ; toute modification rétrospective est mathématiquement détectable. C'est une preuve venue de la physique et des mathématiques, pas une supposition de modèle statistique.

**Vous êtes l'auteur. Vous méritez une preuve.** Quand on vous demande « c'est l'IA qui a écrit ça ? », vous ne devriez pas avoir à vous justifier. RealTrace vous offre une preuve de présence indépendamment vérifiable – pour publier, pour défendre vos droits, pour prouver. Les créateurs ne devraient pas se battre à mains nues.

**Vos contenus vous appartiennent. Pour toujours.** Le texte ne quitte jamais votre appareil ; la chaîne n'enregistre que des hashs et des traits comportementaux. Nous ne promettons pas de protéger votre vie privée – l'architecture rend impossible le fait que nous ayons votre contenu. Estampillage, vérification et contrôle du certificat se font entièrement hors ligne. La chaîne survit même si notre site s'arrête.

**La confiance ne devrait pas être décidée par la plateforme seule.** Les hashs racines des sous-chaînes sont ancrés dans la chaîne de genèse officielle. Les chaînes signées sur n'importe quelle plateforme peuvent être retracées jusqu'au même ancrage public pour un audit indépendant.

RealTrace est open source. Gratuit pour les particuliers. Chaque créateur peut sceller sa propre œuvre.

**Votre création. Votre preuve de présence.**

---

## Quand la création humaine devient un bien à thésauriser

En juillet 2026, des documents judiciaires sortis sous scellés ont révélé le « Project Panama » d'Anthropic : des achats massifs de plus d'un million de livres physiques d'occasion auprès de revendeurs — dos découpés à la presse hydraulique, pages scannées une à une, puis ouvrages détruits — tout cela pour que Claude lise davantage de « mots écrits par des mains humaines ». Dans une autre affaire, environ 7 millions de livres non autorisés ont servi à l'entraînement, réglée par un accord de 1,5 milliard de dollars, un record dans le droit d'auteur américain.

Les entreprises d'IA thésaurisent la création humaine. Parce qu'elles savent mieux que personne : les modèles peuvent générer à l'infini, mais la pensée, l'expérience et les choix humains sont finis. Les vieux livres seront achetés, scannés, détruits ; les mots écrits par la nouvelle génération se noient dans le flot de l'IA — incapables même de prouver « c'est moi qui ai écrit ça ».

Quand la création humaine devient rare, elle mérite d'être prouvée et protégée.

C'est exactement ce que fait RealTrace : dès votre première frappe, votre processus de création est verrouillé dans une chaîne de signatures vérifiable et infalsifiable. Vos mots vous appartiennent toujours. Votre création porte une preuve de présence.

**À l'heure où la création humaine se raréfie, RealTrace est sa preuve.**

---

## Pourquoi RealTrace existe

En novembre 2022, ChatGPT est né. À partir de ce jour, tout sur Internet est devenu « non fiable » : actualités, commentaires, essais, poésie, code, contrats, plaintes — personne, pas même l'auteur, ne pouvait plus distinguer à l'œil nu si un texte venait d'un humain ou d'une machine.

Plus effrayant que « l'IA sait écrire », il y a ceci : **quand tout peut être falsifié, l'authenticité devient un luxe**. La valeur de la création humaine se dilue silencieusement — vos pensées, émotions, expériences et choix deviennent un texte impossible à distinguer d'une sortie de machine.

La mission de RealTrace est de donner à la « création humaine » une **preuve de présence** cryptographique :

- **Dès la première seconde d'écriture** : pas une affirmation a posteriori « c'est moi qui l'ai écrit », mais un enregistrement et une signature en temps réel du processus de création ;
- **Aucune dépendance à la réputation d'une plateforme** : chaque signature peut être vérifiée indépendamment hors ligne et auditée mathématiquement ;
- **Aucun upload de contenu** : le texte reste toujours entre vos mains ; la chaîne n'enregistre que des hashs et des traits comportementaux.

> Dans une époque où l'IA peut tout imiter, la dignité de la création humaine mérite d'être défendue.

---

## Quels problèmes nous résolvons

| Problème | Solution de RealTrace |
|:--|:--|
| Les contenus générés par IA ne se distinguent pas de la création humaine | Estampillage en temps réel : des tampons de signature Ed25519 sont générés automatiquement pendant l'écriture, enregistrant rythme de frappe, pauses, volume de suppression et autres traits comportementaux |
| La manipulation ou substitution a posteriori reste indétectable | Hachage en chaîne : chaque tampon référence le hash du précédent ; toute modification rétrospective est mathématiquement détectable |
| L'upload de contenu présente un risque pour la vie privée | Aucun upload de contenu : le texte reste local ; la chaîne n'enregistre que des hashs de contenu et des traits comportementaux |
| La vérification dépend du serveur ; la chaîne meurt si le site s'arrête | Entièrement hors ligne : estampillage, vérification et contrôle du certificat se font localement ; les fichiers `.rt` sont autonomes |
| Impossible de tracer « qui a signé, quelle version a été signée » | Ancrage à la chaîne de genèse : les hashs racines des sous-chaînes sont soumis à la chaîne de genèse officielle ; les versions sont enregistrées avec la chaîne et auditables publiquement |

---

## Principes fondamentaux

**Chaîne de signatures (chaîne de tampons)** – chaque scellé pendant l'écriture est un nœud de la chaîne de signatures :

```text
chainHash = SHA-256(sessionId || index || salt || timestamp || contentHash || prevChainHash || nonce)
signature = Ed25519_sign(chainHash)
```

- **L'ordre causal est infalsifiable** : le hash de chaque tampon référence le tampon précédent ; l'ordre topologique de la chaîne est déterminé par `prevChainHash`, indépendant de l'horloge système — insertion ou réordonnancement a posteriori est impossible ;
- **Les clés privées sont infalsifiables** : les signatures Ed25519 sont produites par une clé privée générée localement, qui ne quitte jamais votre appareil ;
- **Empreinte comportementale** : chaque tampon porte des traits de rythme de frappe / pauses / suppressions (chaîne comportementale HMAC) pour l'analyse de crédibilité ;
- **Ancrage à la chaîne de genèse** : les clés des sous-chaînes sont dérivées de manière déterministe via HKDF-SHA256 à partir de la graine officielle ; les hashs racines des sous-chaînes s'ancrent dans la chaîne de genèse officielle — traçables vers le haut comme vers le bas (gratuit pour les particuliers).

**Format du fichier de chaîne (`.rt`)** : un conteneur ZIP contenant `chain.json` (chaîne de signatures) et `meta.json` (version, temps, métadonnées du certificat). La chaîne n'enregistre que des « preuves du processus de création », jamais le contenu.

Voir [`docs/chain-spec.md`](docs/chain-spec.md) et [`docs/rt-file-format.md`](docs/rt-file-format.md).

---

## Démarrage rapide

### 1. Ouvrir l'outil d'écriture localement (aucun serveur requis)

Double-cliquez sur `writer/index.html`, ou servez la racine du dépôt avec n'importe quel serveur statique :

```bash
npx serve .
# ouvrir http://localhost:3000/writer/
```

- Le contenu est estampillé automatiquement pendant la frappe ; cliquez sur « Sceller & ancrer » pour télécharger le fichier de chaîne `.rt` + le fichier de contenu `.txt` ;
- Ouvrez `verify/index.html` et glissez-y le fichier `.rt` pour vérifier l'intégrité de la chaîne entièrement hors ligne.

### 2. Activer l'ancrage à la chaîne de genèse officielle (optionnel, gratuit pour les particuliers)

```bash
copy config.example.js config.js
```

Modifiez `config.js` :

```js
window.RT_CONFIG = {
  anchor: {
    apiBase: "https://service-d-ancrage-officiel",  // selon la publication officielle
    genesisPublicKey: "clé-publique-racine-de-la-chaîne-de-genèse",
    enabled: true                                   // soumettre la racine de chaîne au scellement
  }
};
```

> `config.js` est ignoré par `.gitignore`, donc votre propre configuration d'endpoint ne sera pas commitée par erreur.
> L'ancrage de vos créations personnelles est **gratuit** ; la coopération entreprise / plateforme est sous licence (contactez-nous pour une collaboration commerciale).

### 3. Exécuter les tests

```bash
npm test
```

---

## Structure du dépôt

| Chemin | Description |
|:--|:--|
| `core/` | Noyau front-end pur (IIFE navigateur, zéro dépendance de build) : estampillage `stamp.js`, cryptographie `rt-crypto.js`, vérification hors ligne `rt-verifier.js`, fichier de chaîne `rt-export.js` |
| `writer/` | Outil d'écriture (HTML mono-page) : estampillage automatique + téléchargement du scellé |
| `verify/` | Page de vérification hors ligne : glissez un `.rt` pour vérifier |
| `anchor/` | Client d'ancrage à la chaîne de genèse officielle (gratuit pour les particuliers) |
| `docs/` | Spécification de chaîne, format du fichier rt, documentation API d'ancrage |
| `test/` | Tests de régression Node (12/12 réussis) |

---

## Comment le projet a grandi

| Date | Jalon |
|:--|:--|
| 2022.11 | **Origine** : lancement de ChatGPT ; « les contenus générés par IA ne se distinguent plus à l'œil nu » devient réalité, et naît l'idée d'une « preuve de présence de la création humaine » |
| 2026.06 | **Première implémentation complète** : estampillage en chaîne → scellement → vérification hors ligne → certificat autonome, de bout en bout ; 11 brevets d'invention préparés en parallèle, dossier parent déposé auprès de l'agence de brevets |
| 2026.07 | **Refactorisation modulaire** : le noyau d'estampillage `stamp.js` devient un module indépendant, la boîte à outils crypto `rt-crypto.js` est stratifiée, outil d'écriture / vérificateur / service d'ancrage découplés ; renommage officiel en **RealTrace** ; lancement du service d'ancrage à la chaîne de genèse officielle |
| 2026.08 | **MVP open source v0.1.0 publié** (double licence AGPL-3.0 + commerciale) ; modèle de licence entreprise en planification |

---

## Ce que contient cette version (MVP v0.1.0)

Ce dépôt est une **construction MVP minimale** : il implémente la boucle complète « écrire → estampiller → sceller → vérifier » avec le moins de code possible. Cette version inclut :

- **Estampillage en temps réel** : des tampons de signature Ed25519 sont générés automatiquement pendant l'écriture, enregistrant rythme de frappe, pauses, volume de suppression et autres traits comportementaux ;
- **Chaîne infalsifiable** : chaque tampon référence le hash de chaîne du précédent ; toute modification rétrospective est mathématiquement détectable ;
- **Aucun upload de contenu** : le texte reste local ; la chaîne n'enregistre que des hashs de contenu et des traits comportementaux ;
- **Vérification hors ligne** : les fichiers de chaîne `.rt` se vérifient entièrement hors ligne, sans dépendance serveur ;
- **Empreinte comportementale** : rythme de frappe / pauses / suppressions (chaîne comportementale HMAC) pour l'analyse de crédibilité ;
- **Ancrage à la chaîne de genèse (optionnel, gratuit pour les particuliers)** : après scellement, le hash racine de chaîne est soumis à la chaîne de genèse officielle, formant une provenance auditée publiquement ;
- **Traçabilité des versions** : les paquets `.rt` enregistrent `appVersion` dans `meta.json` et le format de chaîne `version` dans `chain.json` ; la version est portée lors de l'ancrage.

Toutes les fonctionnalités restent rétrocompatibles : les fichiers de chaîne `.rt` générés par les anciennes versions doivent rester vérifiables et traçables dans les versions ultérieures.

---

## Comment nous nous différencions des solutions existantes

| | RealTrace | Signature électronique ordinaire | Horodatage TSA | Enregistrement de droits d'auteur |
|:--|:--|:--|:--|:--|
| Prouve « un contenu écrit par un humain en temps réel » | ✅ chaîne de preuves au niveau du processus | ❌ prouve seulement l'identité du signataire | ❌ prouve seulement le temps | ❌ enregistrement a posteriori |
| Empêche la manipulation a posteriori | ✅ hachage en chaîne + signature | ⚠️ objet signé uniquement | ⚠️ objet haché uniquement | ❌ |
| Couvre tout le processus de création | ✅ du premier caractère au scellement | ❌ | ❌ | ❌ |
| Vérifiable hors ligne | ✅ `.rt` autonome | ⚠️ dépend de la PKI | ⚠️ dépend du service en ligne | ❌ dépend de l'organisme d'enregistrement |
| Vie privée (aucun upload de contenu) | ✅ aucun upload de contenu | — | — | ❌ contenu à soumettre |

---

## Cas d'usage

- **Créateurs qui soumettent leur travail** : quand votre œuvre est mise en doute par « c'est l'IA qui a écrit ça ? », une preuve de présence `.rt` explique le processus de création — nombre de mots, temps passé, rythme de création, vérifiable par tous ;
- **Défense des droits d'auteur** : la preuve n'est plus une déclaration verbale. L'empreinte comportementale et la chaîne de signatures fournissent des preuves auditables du processus de création original ;
- **Éditeurs / communautés de contenu** : vérifier si une soumission a réellement été créée en temps réel par un humain, plutôt que collée après coup ou générée en série par des machines ;
- **Scénarios académiques** : preuves du processus de création pour articles, projets et documents techniques, pour que « c'est moi qui l'ai écrit » ait de quoi s'appuyer.

> Les créateurs ne devraient pas faire face au soupçon à mains nues.

---

## Vie privée & sécurité

- Par défaut, **aucun upload de contenu** : votre écriture reste locale ; la chaîne n'enregistre que des hashs de contenu et des traits comportementaux ;
- Les fichiers de chaîne `.rt` sont entièrement sous votre contrôle — conservez-les localement ou sauvegardez-les avec votre propre chiffrement ;
- L'ancrage officiel ne soumet que le hash racine de chaîne et les métadonnées de signature, jamais le contenu ;
- Toute la logique de vérification est open source et auditable ;
- Si vous découvrez une faille de sécurité, contactez les mainteneurs en privé ; ne divulguez pas publiquement avant le correctif.

---

---

## Sponsor · Offrez-moi un café

Le projet vous plaît ? Offrez-moi un café ☕ :

- [GitHub Sponsors](https://github.com/sponsors/jamesw0n9)
- [Ko-fi](https://ko-fi.com/realtrace)

> Le sponsoring n'est qu'un geste de soutien — **ce n'est pas une licence commerciale**. L'usage personnel reste gratuit ; l'intégration par les entreprises / plateformes reste soumise à une licence séparée via [`LICENSE.commercial`](LICENSE.commercial).

---

## Open source & commercial

**Double licence AGPL-3.0 + commerciale** (la partie open source est régie par le texte intégral de l'AGPL-3.0 dans [`LICENSE`](LICENSE)) :

- **Particuliers** : libres d'utiliser, modifier et distribuer ; les chaînes de création auto-construites / auto-signées sont entièrement gratuites et vérifiables hors ligne ; l'ancrage à la chaîne de genèse officielle est gratuit pour les particuliers ;
- **Entreprises / plateformes** : la coopération est sous licence — voir [`LICENSE.commercial`](LICENSE.commercial).

> Gratuit pour un usage personnel ; l'intégration commerciale par des entreprises / plateformes nécessite une licence séparée. Issues et Pull Requests sont les bienvenus — compatibilité du format de chaîne, exactitude de la vérification et questions de vie privée / sécurité en priorité.

---

**Votre création. Votre preuve de présence.**

Dans une époque où l'IA peut tout imiter, la dignité de la création humaine mérite d'être défendue.
