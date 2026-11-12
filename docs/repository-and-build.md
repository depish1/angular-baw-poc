# Repozytorium i proces budowania

## Układ

```text
baw-angular/
├── apps/
│   └── aaa/                 # niezależny projekt Angular CLI
│       ├── angular.json
│       ├── package.json
│       └── src/
│           ├── main.ts
│           └── app/
│               ├── forms/registration-form/
│               └── ...
├── packages/
│   ├── baw-angular-core/    # obecnie .gitkeep
│   └── ui-library/          # obecnie .gitkeep
├── tools/
│   ├── bundle.mjs
│   └── package.json
├── templates/               # planowane
├── docs/
└── xTest/                   # lokalny test osadzenia; zachować w repo
```

Każda aplikacja w `apps/` ma własne `angular.json`, `package.json`, `package-lock.json`, konfigurację TS i zależności. **Bez Nx i bez npm workspaces**. Wspólny kod formularzy *jednej* aplikacji może mieszkać w `apps/<app>/src/app/shared/`. Biblioteki między aplikacjami mają być docelowo publikowane w firmowym rejestrze npm i wersjonowane niezależnie; lokalne `packages/` są tymczasowe.

## Aktualny build `aaa`

Z katalogu `apps/aaa`:

```powershell
npm ci
npm run build:baw
```

Skrypt `build:baw` wykonuje `ng build && node ../../tools/bundle.mjs aaa`. Wymaga wcześniejszego `npm ci` w katalogu `tools/`.

1. Angular CLI (`@angular/build:application`) generuje pliki do `apps/aaa/dist/angular/` (w `angular.json` ustawiono `outputPath.base = dist/angular`, `browser = ""`).
2. `tools/bundle.mjs` wyszukuje `main*.js` i opcjonalny `styles*.css`, odczytuje CSS i tworzy wirtualny entrypoint importujący `init` z `main.js`.
3. esbuild (`bundle: true`, `format: 'iife'`, `globalName: 'AngularForm'`, `target: 'es2022'`, `minify: true`) zapisuje `apps/aaa/dist/baw/aaa.js`.
4. Publicznym punktem wejścia jest `AngularForm.init(...)`; CSS jest przekazywany do funkcji `init` jako ostatni argument i wstawiany do dokumentu przez `main.ts`.

`xTest/test.html` jest wersjonowanym testowym hostem; używa `xTest/angular-form.js`, czyli kopii artefaktu wymagającej aktualizacji po przebudowaniu. Nie jest to jeszcze automatyczny krok skryptu.

## Zasady

- Jeden wynikowy JS na aplikację BAW; nie jeden JS na formularz.
- Formularze jednej aplikacji współdzielą wersję Angulara i zależności; różne aplikacje mogą je wersjonować niezależnie.
- Zmiana komponentu wspólnego **wewnątrz aplikacji** nie powinna wymuszać przebudowy innych aplikacji.
- Zmiana biblioteki npm wymaga świadomej aktualizacji wersji i przebudowy konsumentów; nie ma automatycznego wdrożenia wszystkich aplikacji.
- `node_modules/`, `dist/`, cache Angulara i `.env` nie trafiają do Gita; lockfile jest wersjonowany. `.env.example` można wersjonować.
- Prefiksy selektorów: komponenty aplikacji np. `aaa-*`, biblioteka UI `ui-*`; nazwy formularzy np. `aaa-registration-form` / `RegistrationForm`. Szczegółowa konwencja może ewoluować.

## Ograniczenia i weryfikacja

Aktualny bundler jest POC. Należy sprawdzić, czy obejmuje wszystkie chunki, zasoby i style przy bardziej rozbudowanych aplikacjach oraz czy Angular CLI nie zmieni formatu outputu. Test dynamicznego importu (`LazyTestComponent`) służy właśnie temu. Przed wdrożeniem potwierdzić zachowanie w iframe BAW i z kilkoma formularzami.
