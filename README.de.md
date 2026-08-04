<p align="center">
  <a href="README.md">简体中文</a> ·
  <a href="README.en.md">English</a> ·
  <a href="README.ja.md">日本語</a> ·
  <a href="README.ko.md">한국어</a> ·
  <a href="README.de.md">Deutsch</a> ·
  <a href="README.fr.md">Français</a>
</p>
# RealTrace

> **Menschliches Schaffen muss auch im Zeitalter der KI beweisbar bleiben.**
>
> Ed25519-Signaturkette · Echtzeit-Stempeln · Keine Inhalts-Uploads · Offline-Verifizierung · Offizielle Genesis-Ketten-Ankerung (für Einzelpersonen kostenlos)

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-v0.1.0-orange.svg)](https://github.com/jamesw0n9/realtrace)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jamesw0n9/realtrace/pulls)

> Wenn alles gefälscht werden kann, wird Authentizität zum Luxusgut. **Detektoren raten. RealTrace beweist.**

RealTrace ist ein **Präsenz-Zertifizierungssystem für menschliches Schaffen**: Es beweist mit einer kryptografischen Signaturkette, dass ein Inhalt „tatsächlich von einem Menschen in Echtzeit geschrieben wurde" – nicht KI-generiert, nicht nachträglich eingefügt, nicht verändert.

```text
Menschliches Schaffen ── Echtzeit-Stempeln ── Signaturkette ── besiegelt & verankert ── verifizierbar · rückverfolgbar · manipulationssicher
```

---

## Manifest

Im November 2022 wurde ChatGPT geboren. Von diesem Tag an, in einer Welt, in der alles gefälscht werden kann, wurde Authentizität zum Luxusgut.

KI kann jeden Stil imitieren – nur nicht die Zeit deines Tippens. Detektoren raten. RealTrace beweist.

RealTrace ist ein **Präsenz-Zertifizierungssystem für menschliches Schaffen**: Ab der ersten Sekunde deines Schreibens werden jede Pause, jede Korrektur und jeder Rhythmus deiner Tastenanschläge in Echtzeit erfasst und durch Ed25519-Signaturen in eine unveränderliche Schöpfungskette geschlossen. Wenn du fertig bist, hältst du eine `.rt`-Ketten-Datei in der Hand – verifizierbar, rückverfolgbar, manipulationssicher.

**Das ist keine Multiple-Choice-Frage mehr.** Jede Siegelung verweist auf den Hash der vorherigen. Die kausale Ordnung ist kryptografisch fixiert; jede nachträgliche Änderung ist mathematisch nachweisbar. Das ist Beweis aus Physik und Mathematik, keine Vermutung eines statistischen Modells.

**Du bist der Autor. Du verdienst einen Beweis.** Wenn jemand fragt „Hat das die KI geschrieben?", solltest du dich nicht rechtfertigen müssen. RealTrace gibt dir einen unabhängig verifizierbaren Präsenz-Beweis – für Veröffentlichungen, für Rechtsansprüche, für Beweise. Schöpfer sollten nicht mit bloßen Händen kämpfen.

**Deine Inhalte gehören für immer dir.** Der Text verlässt dein Gerät nie; die Kette zeichnet nur Hashes und Verhaltensmerkmale auf. Wir versprechen nicht, deine Privatsphäre zu schützen – die Architektur macht es uns unmöglich, deinen Inhalt zu besitzen. Stempeln, Prüfen und Zertifikatscheck laufen komplett offline ab. Die Kette überlebt, selbst wenn unsere Seite offline geht.

**Vertrauen sollte nicht die Plattform allein entscheiden.** Die Wurzel-Hashes von Teilketten werden in der offiziellen Genesis-Kette verankert. Ketten, die auf beliebigen Plattformen signiert wurden, lassen sich auf denselben öffentlichen Anker zurückführen und unabhängig auditieren.

RealTrace ist Open Source. Für Einzelpersonen kostenlos. Jeder Schöpfer kann sein eigenes Werk besiegeln.

**Deine Schöpfung. Dein Präsenz-Beweis.**

---

## Wenn menschliches Schaffen gehortet wird

Im Juli 2026 enthüllten entsiegelte Gerichtsdokumente Anthropics „Project Panama": Massenkäufe von über einer Million gebrauchter physischer Bücher über Zwischenhändler — Buchrücken mit einer Hydraulikpresse abgeschnitten, Seite für Seite gescannt, dann vernichtet — nur damit Claude mehr „von Menschenhand geschriebene Wörter" liest. In einem anderen Fall wurden rund 7 Millionen nicht autorisierte Bücher für das Training genutzt; beigelegt mit 1,5 Milliarden US-Dollar, ein Rekord in der US-Urheberrechtsgeschichte.

KI-Unternehmen horten menschliche Schöpfungen. Weil sie besser als jeder andere wissen: Modelle können endlos generieren, aber menschliches Denken, Erleben und Wählen sind endlich. Alte Bücher werden aufgekauft, gescannt und vernichtet; die Worte der nächsten Generation ertrinken in der KI-Flut — unfähig, selbst zu beweisen: „Das habe ich geschrieben."

Wenn menschliches Schaffen zur Mangelware wird, braucht es Beweis und Schutz.

Genau das tut RealTrace: Vom ersten Tastendruck an wird dein Schaffensprozess in eine verifizierbare, manipulationssichere Signaturkette geschlossen. Deine Worte gehören immer dir. Dein Schaffen hat einen Anwesenheitsbeweis.

**In einer Zeit, in der menschliches Schaffen selten wird, ist RealTrace sein Beweis.**

---

## Warum es RealTrace gibt

Im November 2022 wurde ChatGPT geboren. Von diesem Tag an wurde alles im Internet „unvertrauenswürdig": Nachrichten, Kommentare, Essays, Gedichte, Code, Verträge, Klageschriften – niemand, nicht einmal der Autor selbst, konnte mit bloßem Auge erkennen, ob ein Text von einem Menschen oder von einer Maschine stammt.

Beängstigender als „KI kann Dinge schreiben" ist dies: **Wenn alles gefälscht werden kann, wird Authentizität zum Luxusgut**. Der Wert menschlichen Schaffens wird stillschweigend verwässert – deine Gedanken, Gefühle, Erfahrungen und Entscheidungen werden zu Text, der von Maschinenausgabe nicht mehr zu unterscheiden ist.

Die Mission von RealTrace ist es, „menschlichem Schaffen" einen kryptografischen **Präsenz-Beweis** zu geben:

- **Ab der ersten Sekunde des Schreibens**: keine nachträgliche Behauptung „das habe ich geschrieben", sondern Echtzeit-Erfassung und Echtzeit-Signierung des Schaffensprozesses;
- **Keine Abhängigkeit vom Ruf einer Plattform**: jede Signatur kann offline unabhängig verifiziert und mathematisch auditiert werden;
- **Keine Inhalts-Uploads**: Der Text bleibt immer in deinen Händen; die Kette zeichnet nur Hashes und Verhaltensmerkmale auf.

> In einer Zeit, in der KI alles imitieren kann, verdient die Würde menschlichen Schaffens verteidigt zu werden.

---

## Welche Probleme wir lösen

| Problem | Lösung von RealTrace |
|:--|:--|
| KI-generierte Inhalte sind von menschlichem Schaffen nicht zu unterscheiden | Echtzeit-Stempeln: Ed25519-Signaturstempel werden beim Schreiben automatisch erzeugt und erfassen Tipprhythmus, Pausen, Löschmenge und andere Verhaltensmerkmale |
| Nachträgliche Manipulation oder Ersetzung bleibt unerkannt | Ketten-Hashing: jeder Stempel verweist auf den Hash des vorherigen; jede nachträgliche Änderung ist mathematisch nachweisbar |
| Das Hochladen von Inhalten birgt Datenschutzrisiken | Keine Inhalts-Uploads: der Text bleibt lokal; die Kette zeichnet nur Inhalts-Hashes und Verhaltensmerkmale auf |
| Verifizierung hängt vom Server ab; die Kette stirbt, wenn die Seite offline geht | Komplett offline: Stempeln, Verifizieren und Zertifikatscheck laufen lokal ab; `.rt`-Dateien sind in sich geschlossen |
| „Wer hat signiert, welche Version wurde signiert" lässt sich nicht nachvollziehen | Genesis-Ketten-Ankerung: Wurzel-Hashes von Teilketten werden an die offizielle Genesis-Kette übermittelt; Versionen werden mit der Kette erfasst und sind öffentlich prüfbar |

---

## Kernprinzipien

**Signaturkette (Stempelkette)** – jede Siegelung beim Schreiben ist ein Knoten der Signaturkette:

```text
chainHash = SHA-256(sessionId || index || salt || timestamp || contentHash || prevChainHash || nonce)
signature = Ed25519_sign(chainHash)
```

- **Die kausale Ordnung ist nicht fälschbar**: der Hash jedes Stempels verweist auf den vorherigen Stempel; die topologische Reihenfolge der Kette wird durch `prevChainHash` bestimmt und ist unabhängig von der Systemzeit – nachträgliches Einfügen oder Umsortieren ist unmöglich;
- **Private Schlüssel sind nicht fälschbar**: Ed25519-Signaturen werden mit einem lokal erzeugten privaten Schlüssel erstellt, der dein Gerät nie verlässt;
- **Verhaltens-Fingerabdruck**: jeder Stempel trägt Merkmale von Tipprhythmus / Pausen / Löschmenge (HMAC-Verhaltenskette) für die Glaubwürdigkeitsanalyse;
- **Genesis-Ketten-Ankerung**: Teilketten-Schlüssel werden deterministisch per HKDF-SHA256 aus dem offiziellen Seed abgeleitet; die Wurzel-Hashes der Teilketten werden in der offiziellen Genesis-Kette verankert – nach oben und unten rückverfolgbar (für Einzelpersonen kostenlos).

**Ketten-Dateiformat (`.rt`)**: ein ZIP-Container mit `chain.json` (Signaturkette) und `meta.json` (Version, Zeit, Zertifikats-Metadaten). Die Kette zeichnet nur „Schaffensprozess-Beweise" auf, niemals den Inhalt.

Siehe [`docs/chain-spec.md`](docs/chain-spec.md) und [`docs/rt-file-format.md`](docs/rt-file-format.md).

---

## Schnellstart

### 1. Schreibwerkzeug lokal öffnen (kein Server nötig)

`writer/index.html` doppelklicken oder das Repository-Verzeichnis mit einem beliebigen statischen Server ausliefern:

```bash
npx serve .
# http://localhost:3000/writer/ öffnen
```

- Inhalte werden beim Tippen automatisch gestempelt; klicke auf „Besiegeln & verankern", um die `.rt`-Ketten-Datei + die `.txt`-Inhaltsdatei herunterzuladen;
- Öffne `verify/index.html` und ziehe die `.rt`-Datei hinein, um die Kettenintegrität vollständig offline zu prüfen.

### 2. Offizielle Genesis-Ketten-Ankerung aktivieren (optional, für Einzelpersonen kostenlos)

```bash
copy config.example.js config.js
```

`config.js` bearbeiten:

```js
window.RT_CONFIG = {
  anchor: {
    apiBase: "https://offizieller-anker-dienst",  // gemäß offizieller Veröffentlichung
    genesisPublicKey: "öffentlicher-Wurzel-Schlüssel-der-Genesis-Kette",
    enabled: true                                 // Kettenwurzel beim Besiegeln übermitteln
  }
};
```

> `config.js` wird von `.gitignore` ignoriert, sodass deine eigenen Endpunkt-Einstellungen nicht versehentlich committet werden.
> Das Verankern persönlicher Kreationen ist **kostenlos**; Unternehmens-/Plattformkooperationen sind lizenziert (für kommerzielle Zusammenarbeit kontaktiere uns).

### 3. Tests ausführen

```bash
npm test
```

---

## Verzeichnisstruktur

| Pfad | Beschreibung |
|:--|:--|
| `core/` | Reiner Frontend-Kern (Browser-IIFE, keine Build-Abhängigkeiten): Stempeln `stamp.js`, Kryptografie `rt-crypto.js`, Offline-Verifizierung `rt-verifier.js`, Ketten-Datei `rt-export.js` |
| `writer/` | Schreibwerkzeug (einzelnes HTML): automatisches Stempeln + Siegel-Download |
| `verify/` | Offline-Verifizierungsseite: `.rt`-Datei hineinziehen und prüfen |
| `anchor/` | Offizieller Genesis-Ketten-Ankerungs-Client (für Einzelpersonen kostenlos) |
| `docs/` | Ketten-Spezifikation, rt-Dateiformat, Anker-API-Dokumentation |
| `test/` | Node-Regressionstests (12/12 bestanden) |

---

## Wie das Projekt gewachsen ist

| Zeitpunkt | Meilenstein |
|:--|:--|
| 2022.11 | **Ursprung**: ChatGPT erscheint; „KI-generierte Inhalte sind mit bloßem Auge nicht mehr zu unterscheiden" wird Realität, und die Idee eines „Präsenz-Beweises für menschliches Schaffen" entsteht |
| 2026.06 | **Erste vollständige Umsetzung**: Ketten-Stempeln → Besiegeln → Offline-Verifizierung → in sich geschlossenes Zertifikat, durchgängig; parallel 11 Erfindungspatente vorbereitet, Stammsache beim Patentanwalt eingereicht |
| 2026.07 | **Modulare Umstrukturierung**: Stempelkern `stamp.js` als eigenes Modul, Krypto-Toolkit `rt-crypto.js` geschichtet, Schreibwerkzeug / Verifizierer / Anker-Dienst entkoppelt; offizielle Umbenennung in **RealTrace**; offizieller Genesis-Ketten-Ankerungs-Dienst gestartet |
| 2026.08 | **Open-Source-MVP v0.1.0 veröffentlicht** (AGPL-3.0 + kommerzielle Dual-Lizenz); Unternehmenslizenzmodell in Planung |

---

## Was diese Version enthält (v0.1.0 MVP)

Dieses Repository ist ein **minimaler MVP-Build**: Es implementiert den vollständigen Kreislauf „Schreiben → Stempeln → Besiegeln → Verifizieren" mit möglichst wenig Code. Diese Version enthält:

- **Echtzeit-Stempeln**: Ed25519-Signaturstempel werden beim Schreiben automatisch erzeugt und erfassen Tipprhythmus, Pausen, Löschmenge und andere Verhaltensmerkmale;
- **Manipulationssichere Kette**: jeder Stempel verweist auf den Ketten-Hash des vorherigen; jede nachträgliche Änderung ist mathematisch nachweisbar;
- **Keine Inhalts-Uploads**: der Text bleibt lokal; die Kette zeichnet nur Inhalts-Hashes und Verhaltensmerkmale auf;
- **Offline-Verifizierung**: `.rt`-Ketten-Dateien lassen sich vollständig offline und ohne Serverabhängigkeit prüfen;
- **Verhaltens-Fingerabdruck**: Tipprhythmus / Pausen / Löschmenge (HMAC-Verhaltenskette) für die Glaubwürdigkeitsanalyse;
- **Genesis-Ketten-Ankerung (optional, für Einzelpersonen kostenlos)**: nach dem Besiegeln wird der Ketten-Wurzel-Hash an die offizielle Genesis-Kette übermittelt und bildet eine öffentlich prüfbare Herkunft;
- **Versionsrückverfolgbarkeit**: `.rt`-Pakete erfassen `appVersion` in `meta.json` und das Kettenformat `version` in `chain.json`; die Version wird beim Verankern mitgeführt.

Alle Funktionen bleiben abwärtskompatibel: `.rt`-Ketten-Dateien aus älteren Versionen müssen in späteren Versionen weiterhin verifizierbar und rückverfolgbar sein.

---

## Wie wir uns von bestehenden Lösungen unterscheiden

| | RealTrace | Gewöhnliche elektronische Signatur | TSA-Zeitstempel | Urheberrechtsregistrierung |
|:--|:--|:--|:--|:--|
| Beweist „Inhalt wurde von einem Menschen in Echtzeit geschrieben" | ✅ prozessbasierte Beweiskette | ❌ nur Signatur-Identität | ❌ nur Zeit | ❌ nachträgliche Registrierung |
| Verhindert nachträgliche Manipulation | ✅ Ketten-Hashing + Signatur | ⚠️ nur signiertes Objekt | ⚠️ nur Hash-Objekt | ❌ |
| Deckt den gesamten Schaffensprozess ab | ✅ vom ersten Tastendruck bis zur Siegelung | ❌ | ❌ | ❌ |
| Offline verifizierbar | ✅ in sich geschlossene `.rt` | ⚠️ abhängig vom PKI | ⚠️ abhängig vom Online-Dienst | ❌ abhängig von der Registrierungsstelle |
| Datenschutz (keine Inhalts-Uploads) | ✅ keine Inhalts-Uploads | — | — | ❌ Inhalte müssen eingereicht werden |

---

## Anwendungsfälle

- **Schöpfer reichen Werke ein**: Wenn dein Werk mit „Hat das die KI geschrieben?" infrage gestellt wird, erklärt ein `.rt`-Präsenz-Beweis den Schaffensprozess – Wortzahl, Zeitaufwand, Schaffensrhythmus, von jedem prüfbar;
- **Urheberrechtsverteidigung**: Beweise sind keine mündlichen Behauptungen mehr. Der Verhaltens-Fingerabdruck und die Signaturkette auf der Kette liefern prüfbare Beweise für den ursprünglichen Schaffensprozess;
- **Verlage / Inhalts-Communitys**: prüfen, ob eine Einreichung wirklich in Echtzeit von einem Menschen geschaffen wurde und nicht nachträglich eingefügt oder maschinell in Serie erzeugt wurde;
- **Akademische Szenarien**: Beweise für den Schaffensprozess von Papieren, Projekten und technischen Dokumenten, damit „das habe ich geschrieben" einen Stand hat.

> Schöpfer sollten dem Verdacht nicht mit bloßen Händen gegenüberstehen.

---

## Datenschutz & Sicherheit

- Standardmäßig **keine Inhalts-Uploads**: dein Schreiben bleibt lokal; die Kette zeichnet nur Inhalts-Hashes und Verhaltensmerkmale auf;
- `.rt`-Ketten-Dateien liegen vollständig in deiner Hand – lokal aufbewahren oder mit eigener Verschlüsselung sichern;
- Die offizielle Ankerung übermittelt nur den Ketten-Wurzel-Hash und Signatur-Metadaten, niemals den Inhalt;
- Die gesamte Verifizierungslogik ist Open Source und auditierbar;
- Wenn du eine Sicherheitslücke findest, kontaktiere die Maintainer privat; veröffentliche sie erst nach dem Fix.

---

---

## Sponsor · Lade mich auf einen Kaffee ein

Gefällt Ihnen das Projekt? Laden Sie mich auf einen Kaffee ein ☕:

- [GitHub Sponsors](https://github.com/sponsors/jamesw0n9)
- [Ko-fi](https://ko-fi.com/realtrace)

> Sponsoring ist nur ein Zeichen der Unterstützung — **keine kommerzielle Lizenz**. Die private Nutzung bleibt kostenlos; die Integration durch Unternehmen / Plattformen wird separat über [`LICENSE.commercial`](LICENSE.commercial) lizenziert.

---

## Open Source & kommerziell

**AGPL-3.0 + kommerzielle Dual-Lizenz** (der Open-Source-Teil richtet sich nach dem vollständigen AGPL-3.0-Text in [`LICENSE`](LICENSE)):

- **Einzelpersonen**: frei zu nutzen, zu verändern und weiterzugeben; selbst erstellte / selbst signierte Schöpfungsketten sind völlig kostenlos und offline selbst verifizierbar; die Ankerung an die offizielle Genesis-Kette ist für Einzelpersonen kostenlos;
- **Unternehmen / Plattformen**: Unternehmenskooperationen sind lizenziert – siehe [`LICENSE.commercial`](LICENSE.commercial).

> Kostenlos für den persönlichen Gebrauch; die kommerzielle Integration durch Unternehmen / Plattformen erfordert eine separate Lizenz. Issues und Pull Requests sind willkommen – Kettenformat-Kompatibilität, Verifizierungskorrektheit sowie Datenschutz-/Sicherheitsfragen haben Priorität.

---

**Deine Schöpfung. Dein Präsenz-Beweis.**

In einer Zeit, in der KI alles imitieren kann, verdient die Würde menschlichen Schaffens verteidigt zu werden.
