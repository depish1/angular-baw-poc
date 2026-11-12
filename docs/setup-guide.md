# Quick start — odtworzenie struktury POC (Windows / PowerShell)

Instrukcja odtwarza **szkielet** aktualnego repozytorium i sposób budowania, nie pełną implementację bridge'a. Zakłada Node.js i npm dostępne w PATH oraz dostęp do paczek Angular i esbuild (w firmie może być wymagany registry/proxy). Przykładowa aplikacja: `aaa`.

## 1. Repozytorium i katalogi

```powershell
mkdir baw-angular
cd baw-angular
git init
mkdir apps, packages, tools, templates, docs, xTest
mkdir packages/baw-angular-core, packages/ui-library
New-Item packages/baw-angular-core/.gitkeep -ItemType File
New-Item packages/ui-library/.gitkeep -ItemType File
```

Przygotuj `.gitignore` (co najmniej `**/node_modules/`, `**/dist/`, `**/.angular/`, `**/.env`, `**/.env.*`, wyjątki `!**/.env.example` i `!**/.env.*.example`) oraz `.gitattributes` dla normalizacji LF.

## 2. Niezależny projekt Angular

Z katalogu głównego repozytorium:

```powershell
npx -p @angular/cli@22.2.6 ng new aaa --directory apps/aaa --standalone --routing --style css --skip-git --package-manager npm --skip-tests
```

Wynikiem jest osobny projekt Angular CLI z własnym `angular.json`, `package.json` i lockfile. Nie uruchamiaj `ng new` w katalogu głównym repozytorium i nie twórz zagnieżdżonego `.git`.

**Uwaga:** polecenie tworzy świeży projekt, a nie kopię obecnych plików. Dla dokładnej reprodukcji preferuj skopiowanie `apps/aaa/angular.json`, `src/main.ts` i `tools/bundle.mjs` z repozytorium oraz sprawdzenie zgodności wersji.

## 3. Narzędzia builda

```powershell
cd tools
npm init -y
npm install esbuild@0.28.2
cd ..
```

Skopiuj `tools/bundle.mjs` z repozytorium. Nie zastępuj go samym poleceniem esbuild: obecny skrypt wyszukuje output Angulara, zbiera CSS, tworzy wirtualny entrypoint i eksportuje `AngularForm.init`.

## 4. Konfiguracja Angular CLI

W `apps/aaa/angular.json`, w `projects.aaa.architect.build.options`, ustaw:

```json
"outputPath": { "base": "dist/angular", "browser": "" }
```

W `projects.aaa.architect.build.configurations.production` ustaw `"outputHashing": "none"`. Pozostaw `browser: "src/main.ts"` i `styles: ["src/styles.css"]` (zgodnie z bieżącym repozytorium).

W `apps/aaa/package.json` dodaj do `scripts`:

```json
"build:baw": "ng build && node ../../tools/bundle.mjs aaa"
```

## 5. Punkt wejścia i build

`src/main.ts` musi **eksportować** funkcję `init` (nie tylko uruchamiać `bootstrapApplication()`), ponieważ `bundle.mjs` ją importuje. Najszybciej skopiować aktualny `main.ts` i komponenty testowe z repozytorium; szczegóły w [architecture.md](architecture.md).

```powershell
cd apps/aaa
npm install
npm run build:baw
cd ../..
```

Oczekiwany plik: `apps/aaa/dist/baw/aaa.js`. Po zmianie skryptów lub zależności zachowaj zaktualizowany `package-lock.json`. Przy kolejnych instalacjach używaj `npm ci` w `tools/` i `apps/aaa/`.

## 6. Test osadzenia

Skopiuj wynik buildu do testowego hosta:

```powershell
Copy-Item apps/aaa/dist/baw/aaa.js xTest/angular-form.js
```

Testowy `xTest/test.html` z repozytorium wywołuje `AngularForm.init(...)` i sprawdza `destroy()` / `setData()`. Samo otwarcie strony przez `file://` może powodować ograniczenia przeglądarki; w razie potrzeby uruchom prosty lokalny serwer HTTP.

## 7. Kolejne aplikacje

Powtórz krok 2 dla nowej nazwy, dodaj skrypt `build:baw` wskazujący nazwę aplikacji i zachowaj niezależny `package.json` oraz lockfile. **Nie** kopiuj `node_modules` ani `dist`. Docelowo te powtarzalne czynności zastąpi generator.

## Kontrola przed pracą w BAW

- Czy `AngularForm.init` jest dostępne po załadowaniu JS?
- Czy działa dynamiczny import oraz `destroy()` i usunięcie stylów?
- Czy kod uruchamia się w iframe Coach View i poprawnie współpracuje z BAW?
- Czy dane i usługi przechodzą przez adapter/bridge, a nie przez API BAW w Angularze?

Wersje CLI, skryptów i konfiguracji w tym przewodniku odpowiadają obecnemu POC; przy aktualizacji repozytorium traktuj kod jako nadrzędne źródło szczegółów implementacji.
