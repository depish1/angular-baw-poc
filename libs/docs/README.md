# Docs — komponent dokumentów

Biblioteka Angular udostępniająca `Documents` oraz publiczne typy dokumentów.
Poza paczką APF zachowuje osobny build Angular Elements dla HTML/BAW.

## Budowanie i pakowanie

Najpierw zbuduj paczkę `ui` w `libs/ui`:

```bash
npm ci
npm run pack:local
```

Następnie w `libs/docs`:

```bash
npm ci
npm run build:lib
npm run pack:check
npm run pack:local
```

Archiwum `docs-0.1.0.tgz` można zainstalować lokalnie obok paczki `ui`.
W aplikacji Angular:

```typescript
import { Documents, type DocumentMetadata } from 'docs';
```

Komponent obsługuje Angular Signal Forms (dyrektywa `[formField]`).
Konsument dostarcza `provideHttpClient()` oraz globalne style UI, np.:

```css
@import 'ui/styles/tokens.css';
@import 'ui/styles/themes/red.css';
```

## Angular Elements

Niezależny bundle:

```bash
npm run build:element
```

Wynik: `dist/documents-element/main.js`. Przykładowa strona HTML znajduje się
w `examples/documents-element/`. Ten build nie korzysta z paczki APF `docs`.

## Zależności

`docs` i `ui` deklarują Angular 21 oraz 22 jako `peerDependency` po testach
integracyjnych w aplikacji `aaa` (Angular 22).
Repozytorium B pozostaje placeholderem.
