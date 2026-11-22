# AAA — demonstracja wyboru formularza

Jedna aplikacja BAW udostępnia kilka formularzy w jednym bundlu JS. Host wskazuje
formularz przez `formType`, a jego `binding` i `config` są przekazywane tylko
podczas inicjalizacji.

## Dodawanie formularza

1. Zaimplementuj komponent z wymaganymi inputami `binding`, `config`, `bridge`
   i typami właściwymi dla danego formularza (`FormInputs<...>`).
2. Dodaj komponent do rejestru `src/app/forms.ts` pod nowym identyfikatorem.
3. Nie zmieniaj wspólnego resolvera w `libs/form-runtime/src/form-registry.ts`.

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

## Uruchomienie i weryfikacja

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
