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
=== CHUNK 1/2 ===
# RealTrace

> **La creación humana debe seguir siendo demostrable en la era de la IA.**
>
> Cadena de firmas Ed25519 · Sello en tiempo real · Sin carga de contenido · Verificación sin conexión · Anclaje oficial de la cadena de génesis (gratis para individuos)

[![Licencia: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE)
[![Versión](https://img.shields.io/badge/version-v0.5.0-orange.svg)](https://github.com/jamesw0n9/realtrace)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jamesw0n9/realtrace/pulls)

<p align="center">
  <img src="docs/demo/realtrace-demo-25s-en.gif" alt="Demo de RealTrace" width="640" />
  <br />
  <em>25 segundos · desde el sello en tiempo real hasta la verificación sin conexión (demo · sin audio)</em>
  <br />
  <a href="docs/demo/realtrace-demo-25s-en.mp4">▶ Ver video de demostración completa (MP4)</a>
</p>

> Cuando todo puede ser forjado, la autenticidad se convierte en un lujo. **Los detectores adivinan. RealTrace prueba.**

RealTrace es un **sistema de certificación de presencia de creación humana**: utiliza una cadena de firmas criptográficas para demostrar que un contenido "fue verdaderamente escrito por un humano en tiempo real" — no generado por IA, no pegado después, no alterado.

```text
Creación humana ── sello en tiempo real ── cadena de firmas ── sellado y anclado ── verificable · rastreador · imborrable
```

---

## Manifiesto

En noviembre de 2022, nació ChatGPT. Desde ese día en adelante, en un mundo donde todo puede ser forjado, la autenticidad se convirtió en un lujo.

La IA puede imitar cualquier estilo — excepto el tiempo de tu escritura. Los detectores adivinan. RealTrace prueba.

RealTrace es un **sistema de certificación de presencia de creación humana**: desde el primer segundo que comienzas a escribir, cada pausa, cada eliminación, cada ritmo de tus pulsaciones de teclas se graba en tiempo real y se bloquea con firmas Ed25519 en una cadena de creación inmutable. Cuando termines, tendrás un archivo de cadena `.rt` — verificable, rastreador, imborrable.

**Ya no es una pregunta de opción múltiple.** Cada sello se refiere al hash del anterior. El orden causal está bloqueado por la criptografía; cualquier modificación retrospectiva es detectable matemáticamente. Esto es evidencia de la física y las matemáticas, no una conjetura de un modelo estadístico.

**Tú eres el autor. Te mereces la prueba.** Cuando alguien pregunta "¿lo escribió la IA?", no deberías tener que explicar. RealTrace te da una prueba de presencia verificable de manera independiente — para publicar, para defender tus derechos, para evidencia. Los creadores no deberían luchar sin armas.

**Tu contenido pertenece a ti. Siempre.** El texto nunca sale de tu dispositivo; la cadena solo registra hashes y características de comportamiento. No prometemos proteger tu privacidad — la arquitectura hace que sea imposible que tengamos tu contenido. El sello, la verificación y las comprobaciones de certificados ocurren sin conexión. La cadena sigue funcionando incluso si nuestro sitio cae.

**La confianza no debe decidirse solo por la plataforma.** Las raíces de la subcadena se anclan en la cadena de génesis oficial. Las cadenas firmadas en cualquier plataforma pueden rastrear hacia la misma raíz pública para una auditoría independiente.

RealTrace es de código abierto. Gratis para individuos. Cada creador puede sellar su propia obra.

**Tu creación. Tu prueba de presencia.**

---

## Cuando la creación humana se convierte en algo que acumular

En julio de 2026, documentos judiciales desclasificados revelaron el "Proyecto Panama" de Anthropic: compras en masa de más de un millón de libros físicos usados a través de vendedores de segunda mano — lomos cortados con una prensa hidráulica, escaneados página por página y destruidos — todo para que Claude pudiera leer más "palabras escritas por manos humanas". En un caso separado, se utilizaron aproximadamente 7 millones de libros no autorizados para el entrenamiento, terminando en un acuerdo por 1.5 mil millones de dólares, un récord en litigios de copyright en los EE. UU.

Las empresas de IA están acumulando creación humana. Porque saben mejor que nadie: los modelos pueden generar sin fin, pero el pensamiento, la experiencia y la elección humana son finitos. Los libros antiguos serán comprados, escaneados y destruidos; las palabras escritas por la próxima generación se ahogan en la inundación de IA — incapaces incluso de probar "lo escribí yo".

Cuando la creación humana se convierte en algo escaso, necesita ser probada y protegida.

Eso es exactamente lo que hace RealTrace: desde el momento en que comienzas a escribir, tu proceso creativo se bloquea en una cadena de firmas verificable e imborrable. Tus palabras siempre pertenecen a ti. Tu creación tiene prueba de presencia.

**Cuando la creación humana se convierte en algo escaso, RealTrace es su prueba de presencia.**

---

## Por qué existe RealTrace

En noviembre de 2022, nació ChatGPT. Desde ese día en adelante, todo en internet se convirtió en "inconfiable": noticias, comentarios, ensayos, poesía, código, contratos, demandas — nadie, ni siquiera el autor, podía decir a simple vista si un texto había sido escrito por un humano o por una máquina.

Más aterrador que "la IA puede escribir cosas" es esto: **cuando todo puede ser forjado, la autenticidad se convierte en un lujo**. El valor de la creación humana se está diluyendo silenciosamente — tus pensamientos, emociones, experiencias y elecciones se convierten en texto indistinguible de la salida de la máquina.

La misión de RealTrace es dar a "la creación humana" una **prueba criptográfica de presencia**:

- **Desde el primer segundo que escribes**: no una afirmación póstuma de "lo escribí yo", sino un registro y firma en tiempo real del proceso creativo;
- **Sin dependencia de la reputación de la plataforma**: cada firma puede ser verificada de manera independiente sin conexión y auditada matemáticamente;
- **Sin carga de contenido**: el texto siempre permanece en tus manos; la cadena solo registra hashes y características de comportamiento.

> En una era donde la IA puede imitar todo, la dignidad de la creación humana merece ser defendida.

---

## Los problemas que resolvemos

| Problema | Solución de RealTrace |
|:--|:--|
| El contenido generado por IA no se puede distinguir de la creación humana | Sello en tiempo real: las firmas de Ed25519 se generan automáticamente durante la escritura, registrando el ritmo de las pulsaciones de teclas, las pausas y la cantidad de eliminaciones, entre otras características de comportamiento |
| No se puede detectar el adulteración o sustitución póstuma | Hashing de la cadena: cada sello se refiere al hash del sello anterior; cualquier modificación retrospectiva es detectable matemáticamente |
| La carga de contenido crea un riesgo de privacidad | Sin carga de contenido: el texto permanece local; la cadena solo registra hashes y características de comportamiento |
| La verificación depende de un servidor; la cadena muere cuando el sitio cae | Sin conexión completa: el sello, la verificación y las comprobaciones de certificados ocurren localmente; los archivos `.rt` son autosuficientes |
| No se puede rastrear "quién lo firmó, qué versión se firmó" | Anclaje en la cadena de génesis: las raíces de la subcadena se derivan determinísticamente del semilla oficial a través de HKDF-SHA256; las raíces de la subcadena se anclan en la cadena de génesis oficial — rastreadoras hacia arriba y hacia abajo (gratis para individuos).
| No se puede rastrear "quién lo firmó, qué versión se firmó" | Anclaje en la cadena de génesis: las raíces de la subcadena se derivan determinísticamente del semilla oficial a través de HKDF-SHA256; las raíces de la subcadena se anclan en la cadena de génesis oficial — rastreadoras hacia arriba y hacia abajo (gratis para individuos).

---

## Principios fundamentales

**Cadena de firmas (cadena de sellos)** — cada sello durante la escritura es un nodo en la cadena de firmas:

```text
chainHash = SHA-256(sessionId || index || salt || timestamp || contentHash || prevChainHash || nonce)
signature = Ed25519_sign(chainHash)
```

- **El orden causal no puede ser forjado**: cada sello se refiere al hash del sello anterior; el orden topológico de la cadena se determina por `prevChainHash`, independientemente de la hora del sistema — no puede ser insertado o reordenado después;
- **Las claves privadas no pueden ser forjadas**: las firmas Ed25519 se producen por una clave privada generada localmente que nunca sale de tu dispositivo;
- **Huella de comportamiento**: cada sello lleva las características de ritmo de pulsaciones de teclas / pausa / eliminación (cadena de comportamiento HMAC) para el análisis de credibilidad;
- **Anclaje en la cadena de génesis**: las claves de la subcadena se derivan determinísticamente del semilla oficial a través de HKDF-SHA256; las raíces de la subcadena se anclan en la cadena de génesis oficial — rastreadoras hacia arriba y hacia abajo (gratis para individuos).
- **Vinculación de Merkle completa del texto**: cada sello también calcula el root de Merkle del texto completo y lo escribe en la cadena, permitiendo la divulgación selectiva de cualquier pasaje sin exponer todo el texto.

**Formato de archivo de cadena (`.rt`)**: un contenedor ZIP que contiene `chain.json` (cadena de firmas) y `meta.json` (versión, tiempo, metadatos del certificado). La cadena solo registra "evidencia del proceso creativo", nunca el contenido.

Ver [`docs/chain-spec.md`](docs/chain-spec.md) y [`docs/rt-file-format.md`](docs/rt-file-format.md).

---

## Inicio rápido

### 1. Abre el escritor localmente (no se necesita servidor)

Haz doble clic en `writer/index.html`, o sirve el directorio raíz con cualquier servidor estático:

```bash
npx serve .
# abre http://localhost:3000/writer/
```

- Elige "Escritura anónima" o "Importar .rt para continuar" antes de entrar en el editor; el contenido se sella automáticamente a medida que escribes;
- Haz clic en "Sellado y Anclaje" para confirmar: te redirigirás a la página de verificación sin conexión para descargar el archivo original `.txt` y el archivo de cadena `.rt` (exportación puramente local, sin carga);
- Abre `verify/index.html` y arrastra el archivo `.rt` para verificar la integridad de la cadena completamente sin conexión.

### 2. Habilita el anclaje en la cadena de génesis oficial (opcional, gratis para individuos)

```bash
copy config.example.js config.js
```

Edita `config.js`:

```js
window.RT_CONFIG = {
  anchor: {
    apiBase: "https://official-anchor-service",  // usa la dirección publicada oficialmente
    genesisPublicKey: "official-genesis-root-public-key",
    enabled: true                                // enviar la raíz de la cadena al sellado
  }
};
```

> `config.js` es ignorado por `.gitignore`, por lo que tu propia configuración de extremo no se comprometerá accidentalmente.
> Anclar tus creaciones personales a la cadena es **gratis**; la cooperación empresarial / de plataforma está licenciada (contacta con nosotros para colaboración comercial).

### 3. Ejecuta pruebas

```bash
npm test
```

=== CHUNK 2/2 ===

## Estructura del directorio

| Ruta | Descripción |
|:--|:--|
| `core/` | Núcleo puro de front-end (IIFE del navegador, sin dependencias de construcción): estampado `stamp.js`, criptografía `rt-crypto.js`, verificación offline `rt-verifier.js`, archivo de cadena `rt-export.js`, divulgación de Merkle `rt-merkle.js`, línea de tiempo `rt-timeline.js`, descarga de archivo `rt-downloader.js` |
| `writer/` | Herramienta de escritura (HTML de una página): estampado automático + descarga de sello |
| `verify/` | Página de verificación de cadena offline: arrastrar un archivo `.rt` para verificar |
| `anchor/` | Cliente de anclaje de cadena genesis oficial (gratis para individuos) |
| `docs/` | Especificación de cadena, formato de archivo rt, documentos de API de anclaje |
| `test/` | Pruebas de regresión de nodo (24/24 pasando) |

---

## Cómo creció el proyecto

| Fecha | Hito |
|:--|:--|
| 2022.11 | **Origen**: Lanzamiento de ChatGPT; "El contenido generado por IA ya no puede distinguirse a simple vista" se convirtió en realidad, dando lugar a la idea de una "prueba de presencia de creación humana" |
| 2026.06 | **Primera implementación completa**: estampado de cadena → sellado → verificación offline → certificado autosuficiente, de extremo a extremo; 11 patentes de invención presentadas en paralelo, caso principal presentado ante la oficina de patentes |
| 2026.07 | **Refactorización modular**: el núcleo de estampado `stamp.js` extraído como un módulo, la herramienta de criptografía `rt-crypto.js` estratificada, el servicio de escritor / verificador / anclaje desacoplado; oficialmente renombrado **RealTrace**; lanzamiento del servicio de anclaje de cadena genesis oficial |
| 2026.08 | **Versión MVP v0.1.0 lanzada** (AGPL-3.0 + licencia dual comercial); modelo de licencia empresarial en planificación |
| 2026.08 | **v0.2.0 lanzada**: divulgación selectiva de Merkle + generación de prueba de divulgación, interfaz de usuario en seis idiomas, reglas de nombramiento de ID de cadena, selección de modo de creación, línea de tiempo modular |
| 2026.08 | **v0.3.0 lanzada**: cola de anclaje de cadena genesis (cola de espera offline + reinicio automático + firma anti-hijack), panel de cola de anclaje en seis idiomas integrado en el escritor |
| 2026.08 | **v0.4.0 lanzada**: módulo de identidad (.rtkey exportación/importación, recuperación de identidad encriptada con contraseña, identidad incrustada en el sello), semántica de fusión de formato de cadena v3 (continuación automática con la misma clave / contenedor de contenedor de claves cruzadas), verificador multi-navegador |
| 2026.08 | **v0.5.0 publicado**: README en 14 idiomas; el inglés es la única fuente de las traducciones (docs/i18n.md) |
| 2026.08 | **v0.5.0 lanzada**: cola de anclaje de genesis (cola de espera local primero y sincronización automática al volver en línea; firma Ed25519 (`chainId|rootHash`) para evitar el secuestro de reivindicaciones); panel de cola de anclaje (seis idiomas) en el escritor — mantenimiento de la carga de contenido cero; actualización de la notificación de privacidad |

---

## Lo que hay en esta versión (v0.4.0)

Este repositorio es un **conjunto de construcción de código abierto completo**: implementa el ciclo completo "escribir → estampar → sellar → verificar → continuación de identidad → fusión de cadena". Esta versión incluye:

- **Estampado en tiempo real**: firmas de estampado Ed25519 generadas automáticamente durante la escritura, registrando el ritmo de pulsación de teclas, las pausas, el volumen de eliminación y otras características de comportamiento;
- **Cadena inalterable**: cada estampado referencia el hash de la cadena del estampado anterior; cualquier modificación retrospectiva es detectable matemáticamente;
- **Carga de contenido cero**: el texto se mantiene local; la cadena solo registra hashes de contenido y características de comportamiento;
- **Verificación offline**: los archivos de cadena `.rt` pueden verificarse completamente offline, sin dependencia del servidor;
- **Huella de comportamiento**: características de ritmo de pulsación de teclas / pausa / eliminación (cadena de comportamiento HMAC) para análisis de credibilidad;
- **Anclaje de cadena genesis (opcional, gratis para individuos)**: después de sellar, el hash raíz de la cadena se envía a la cadena genesis oficial, formando una procedencia auditada públicamente;
- **Rastreo de versión**: los paquetes `.rt` graban `appVersion` en `meta.json` y el formato de cadena `version` en `chain.json`; la versión se lleva cuando se ancla a la cadena.
- **Divulgación selectiva de Merkle**: cada sello une un raíz de Merkle de texto completo, por lo que cualquier pasaje puede divulgarse sin revelar todo el texto;
- **Generación de prueba de divulgación**: un clic para la prueba de cualquier pasaje en la página de verificación offline, con visualización de camino de Merkle y JSON copiable;
- **Interfaz de usuario en seis idiomas**: escritor / verificador / sitio web en 简体中文 · English · 日本語 · 한국어 · Deutsch · Français;
- **Reglas de nombramiento de ID de cadena**: ID de cadena de 23 caracteres (`web-personal-…`) que une la clave pública + hash raíz — verificable, no reversible;
- **Selección de modo de creación**: elija "Escritura anónima" o "Importar .rt para continuar" antes de escribir; la continuación automática extiende la cadena original.
- **Línea de tiempo modular**: la línea de tiempo histograma escalable se extrae al módulo compartido `core/rt-timeline.js`, haciendo visible el ritmo de escritura a simple vista.

- **Cola de anclaje de genesis**: después de sellar, los metadatos de la cadena se colan localmente primero y se sincronizan automáticamente al volver en línea; una firma Ed25519 (`chainId|rootHash`) previene el secuestro de reivindicaciones;
- **Panel de cola de anclaje (seis idiomas)**: ⛓ indicador de estado / sincronización manual con un clic / conmutador de sincronización automática en el escritor — mantenimiento de la carga de contenido cero;
- **Actualización de la notificación de privacidad**: aclara que después de sellar, solo los metadatos de la cadena pueden sincronizarse con la cadena genesis oficial, y que la sincronización automática se puede desactivar en el panel ⛓.

- **Módulo de identidad**: clave de identidad encriptada con PBKDF2-SHA256 (600K iteraciones) + AES-256-GCM; exportación / importación de archivos de clave de identidad `.rtkey`; la importación de un archivo `.rt` que contiene identidad restaura al creador mediante contraseña; el sellado incrusta la identidad encriptada para que la misma clave pueda continuar la cadena original;
- **Semántica de fusión de formato de cadena v3**: la continuación automática con la misma clave extiende la cadena original (`mergeChainsVerified` firma y verifica de nuevo); las cadenas cruzadas pueden agruparse en un contenedor (`aggregateChains`), verificadas subcadena por subcadena;
- **Verificador multi-navegador**: verificación de firma tweetnacl unificada con WebCrypto como fallback solo — resultados consistentes en todos los navegadores.

> Changelog completo: [CHANGELOG.md](CHANGELOG.md).

Todas las características son compatibles con versiones anteriores: los archivos de cadena `.rt` generados por versiones anteriores deben seguir siendo verificables y rastreadores en versiones posteriores.

---

## Cómo nos diferenciamos de las soluciones existentes

| | RealTrace | Firma electrónica ordinaria | Sello de tiempo TSA | Registro de derechos de autor |
|:--|:--|:--|:--|:--|
| Prueba "que el contenido fue escrito por un humano en tiempo real" | ✅ cadena de evidencia a nivel de proceso | ❌ solo prueba la identidad del firmante | ❌ solo prueba la hora | ❌ registro posterior |
| Previene la modificación posterior | ✅ hash de cadena + firma | ⚠️ solo objeto de firma | ⚠️ solo objeto de hash | ❌ |
| Cubre todo el proceso creativo | ✅ desde la primera pulsación de tecla hasta el sello | ❌ | ❌ | ❌ |
| Verificable offline | ✅ `.rt` autosuficiente | ⚠️ depende de PKI | ⚠️ depende de servicio en línea | ❌ depende del organismo de registro |
| Privacidad (sin carga de contenido) | ✅ carga de contenido cero | — | — | ❌ debe presentarse el contenido |

---

## Casos de uso

- **Creadores presentando su trabajo**: cuando su trabajo es cuestionado con "¿escribió esto la IA?", una prueba `.rt` de presencia explica el proceso creativo — cantidad de palabras, tiempo invertido, ritmo creativo, verificable por cualquier persona;
- **Defensa de derechos de autor**: la evidencia ya no es una reivindicación verbal. La huella de comportamiento y la cadena de firma en la cadena proporcionan evidencia auditada del proceso creativo original;
- **Publicadores / comunidades de contenido**: verificar si una presentación fue realmente creada en tiempo real por un humano, en lugar de pegada después o generada en lotes por máquinas;
- **Escenarios académicos**: evidencia del proceso original para artículos, proyectos y documentos técnicos, para que "lo escribí" tenga algo que respaldarlo.

> Los creadores no deben enfrentar la sospecha sin protección.

---

## Privacidad y seguridad

- **Carga de contenido cero** por defecto: su escritura se mantiene local; la cadena solo registra hashes de contenido y características de comportamiento;
- Los archivos de cadena `.rt` están completamente bajo su control — guárdelos localmente o respáldelos con su propia encriptación;
- El anclaje oficial solo envía el hash raíz de la cadena y los metadatos de la firma, nunca el contenido;
- Toda la lógica de verificación es de código abierto y verificable;
- Si encuentra una vulnerabilidad de seguridad, envíe un mensaje a los mantenedores de manera privada; no revele públicamente antes de que esté lista la solución.

---

---

## Patrocinador · Comprame un café

¿Disfruta del proyecto? Comprame un café ☕:

- [Patrocinadores de GitHub](https://github.com/sponsors/jamesw0n9)
- [Ko-fi](https://ko-fi.com/realtrace)
- China: códigos QR de Alipay / WeChat Pay (sólo consejos personales, no una licencia comercial)

| Alipay | WeChat Pay |
|:---:|:---:|
| <img src="site/sponsor/alipay.png" width="130" alt="Alipay QR"> | <img src="site/sponsor/wechat.png" width="130" alt="WeChat Pay QR"> |

> El patrocinio es solo un símbolo de apoyo — **no es una licencia comercial**. El uso personal sigue siendo gratuito; la integración empresarial / de plataforma requiere una licencia separada a través de [`LICENSE.commercial`](LICENSE.commercial).

---

## Código abierto y comercial

**Licencia dual AGPL-3.0 + comercial** (la parte de código abierto se rige por el texto completo de la AGPL-3.0 en [`LICENSE`](LICENSE)):

- **Individuos**: libre para usar, modificar y distribuir; las cadenas de creación autoconstruidas / autosignadas son completamente gratuitas y pueden verificarse de manera autónoma offline; el anclaje a la cadena genesis oficial es gratuito para individuos;
- **Organizaciones no comerciales / pequeños círculos** (escuelas públicas o no lucrativas, asociaciones de escritores / industrias, etc., verificadas por certificado de registro no lucrativo / certificado de entidad legal): gratuito para el uso interno de los miembros solo — sin servicios pagados externos, sin operación de plataforma pública, sin reventa o redistribución después de la integración;
- **Empresas / plataformas**: la cooperación está licenciada — ver [`LICENSE.commercial`](LICENSE.commercial).

> Gratuito para el uso personal; la integración comercial / de plataforma requiere una licencia separada. Los problemas y Pull Requests son bienvenidos — la compatibilidad del formato de cadena, la corrección de verificación y los problemas de privacidad/seguridad tienen prioridad.

---

**Tu creación. Tu prueba de presencia.**

En una era donde la IA puede imitar todo, la dignidad de la creación humana merece ser defendida.
