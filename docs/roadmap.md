# Roadmapa POC

## Stan aktualny — sprawdzone w kodzie repozytorium

- Niezależny projekt Angular CLI `apps/aaa` (Angular 22.2).
- Build Angular CLI → esbuild → `dist/baw/aaa.js`, z globalnym `AngularForm.init`.
- `main.ts`: tworzenie aplikacji przez `createApplication()`, bootstrap komponentu, dołączenie CSS, `destroy()` i `setData()`.
- Formularz `RegistrationForm` z przyciskiem ładującym dynamicznie `LazyTestComponent`.
- Testowy host `xTest/test.html` i wersjonowany plik JS.
- Katalogi `packages/baw-angular-core` i `packages/ui-library` istnieją, lecz nie zawierają implementacji bibliotek.

**Uwaga:** `main.ts` wywołuje `setInput('data'/'formType'/'onSave')`, ale bieżący `RegistrationForm` nie deklaruje tych inputów. Nie uznawać przepływu danych i zapisu za zweryfikowane.

## Najbliższy etap — pierwszy działający formularz w BAW

1. Sprawdzić uruchamianie i niszczenie Angulara w rzeczywistym Coach View i iframe BAW.
2. Zdefiniować minimalny kontrakt host ↔ Angular i wybrać mechanizm bootstrapu/wyboru formularza.
3. Zaimplementować adapter bindingu BAW → plain JS oraz zapis zmian.
4. Zaimplementować podstawowy bridge: binding, opcje, zdarzenia graniczne.
5. Dodać wywoływanie usług z opcji Coach View przez Promise wrapper i konwersję odpowiedzi.
6. Zweryfikować jeden pełny scenariusz formularza (dane wejściowe, usługa, zapis, zamknięcie).

## Następnie

- Generator aplikacji i formularzy, kiedy wzorzec zostanie ustabilizowany.
- Lokalne `ng serve` z mockiem bridge'a i przykładowymi danymi (może poczekać do pierwszego formularza produkcyjnego).
- Wspólne paczki `baw-angular-core`, UI i theme publikowane w firmowym npm registry.
- Testy regresji buildu: lazy loading, CSS, wiele formularzy, różne wersje Angulara, wielokrotna inicjalizacja.
- Konwencje wersjonowania, diagnostyka i dokumentacja wdrożenia.

## Etap 2 — wstępne propozycje, nie decyzje

1. Spójna obsługa błędów i diagnostyka integracji.
2. Bezpośrednie wywoływanie Service Flow przez REST z poprawnym kontekstem wersji/snapshotu.

Nie dodawać tych funkcji do MVP tylko dlatego, że są wymienione w roadmapie.
