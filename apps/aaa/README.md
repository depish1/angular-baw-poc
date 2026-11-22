# AAA — demonstracja wyboru formularza

Jedna aplikacja BAW udostępnia kilka formularzy w jednym bundlu JS. Host wskazuje
formularz przez `formType`, a jego `binding` i `config` są przekazywane tylko
podczas inicjalizacji.

## Dodawanie formularza

1. Zaimplementuj komponent z wymaganymi inputami `binding`, `config`, `bridge`
   i typami właściwymi dla danego formularza (`FormInputs<...>`).
2. Dodaj komponent do rejestru `src/app/forms.ts` pod nowym identyfikatorem.
3. Nie zmieniaj wspólnego resolvera w `libs/form-runtime/src/form-registry.ts`.

Do testowania formularza lokalnie dodaj również dane do `src/dev/fixtures.ts`.

`libs/form-runtime` jest na razie prostym, niezależnym od Angulara modułem
TypeScript, dołączanym ze źródeł. Pakowanie i zasady zgodności wersji bibliotek
będą przedmiotem osobnych zadań.

## Kontrakt hosta

```javascript
const instance = await AngularForm.init(
  'CUSTOMER',
  document.getElementById('root'),
  { firstName: 'Anna', lastName: 'Nowak' }, // binding
  { title: 'Klient' },                    // config
  { complete: (result) => console.log(result) }, // testowy bridge
);

instance.destroy();
```

`bridge.complete()` jest **placeholderem**, a nie implementacją API BAW.
W docelowym środowisku bridge będzie przekazywał wynik do Coach View oraz
obsługiwał Boundary Event. Dane od hosta JS nie są walidowane w czasie wykonania.

## Lokalny development (bez BAW)

W katalogu `apps/aaa` uruchom `npm start`, a następnie otwórz:

- `http://localhost:4200/` — domyślnie formularz `CUSTOMER`.
- `http://localhost:4200/?formType=REQUEST` — formularz `REQUEST`.

`main.dev.ts` wywołuje tę samą funkcję `init()` co host BAW, przekazując
`binding` i `config` z `src/dev/fixtures.ts`. Placeholder bridge wypisuje
rezultat `complete()` do konsoli przeglądarki. Nieznany `formType` wyświetla
błąd na stronie.

Punkt wejścia `main.dev.ts` działa **wyłącznie** w konfiguracji developerskiej.
`npm run build` i `npm run build:baw` używają produkcyjnego `main.ts` — samo
załadowanie ich kodu nie inicjalizuje Angulara.

## Build i testy

W katalogu `apps/aaa`:

```bash
npm ci
npm test -- --watch=false
npm run test:baw
```

`test:baw` wymaga zależności zainstalowanych także w `tools/` (`npm ci` w tym
katalogu). Buduje `dist/baw/aaa.js` i uruchamia test bundla z użyciem jsdom.

Do testów ręcznych uruchom serwer statyczny z katalogu głównego repozytorium
i otwórz `/xTest/test.html`. Strona testowa ładuje **wygenerowany** bundle z
`apps/aaa/dist/baw/aaa.js`, nie przechowuje jego kopii w repozytorium.

## Paczki ui i docs

Przed instalacją zależności `aaa` wygeneruj lokalne paczki npm w kolejności:

1. `libs/ui`: `npm ci`, `npm run pack:local` — tworzy `ui-0.1.0.tgz`.
2. `libs/docs`: `npm ci`, `npm run pack:local` — tworzy `docs-0.1.0.tgz`.
3. `apps/aaa`: `npm ci`, `npm start`.

Ścieżki do archiwów są zapisane w `apps/aaa/package.json`. Każda aplikacja
i biblioteka posiada własne `node_modules`. Lokalnie nie trzeba publikować
paczek. Po zmianach w bibliotekach ponownie wygeneruj i zainstaluj archiwa.

`aaa` używa czerwonego motywu z `ui/styles`; niebieski można wybrać przez
zamianę importu `ui/styles/themes/red.css` na `blue.css` w `src/styles.css`.

Test `src/app/libraries.spec.ts` sprawdza import obu paczek i wspólny runtime
Angulara 22.

## Demonstracja komponentów i Documents

Po uruchomieniu `npm start` otwórz `/?formType=DOCUMENTS_DEMO`.
Formularz zawiera pola tekstowe, checkbox, grupę checkboxów, grupę radio
i `Documents` z walidacją Angular Signal Forms. Dla wygody na starcie
podstawiany jest testowy dokument, więc formularz można zatwierdzić bez API.
Dodawanie nowych plików nadal wymaga lokalnej usługi repozytorium A.
Na zakończenie formularz przekazuje wynik do lokalnego placeholdera bridge
(rezultat wypisywany jest w konsoli przeglądarki).
