# Architektura integracji Angular ↔ IBM BAW

## Granice i cykl życia

1. BAW renderuje Coach View z Custom HTML zawierającym element hostujący, np. `<div id="root"></div>`.
2. Kod integracyjny BAW pozyskuje binding, konfigurację i dostępne usługi/zdarzenia.
3. Wspólna biblioteka (roboczo `baw-angular-core`, wcześniej `baw-angular-platform`) izoluje specyfikę BAW i przekazuje do aplikacji Angular zwykłe dane JS oraz bridge.
4. Aplikacja wybiera formularz, inicjalizuje Angular i zwraca uchwyt do zwolnienia zasobów (`destroy`).
5. Formularz korzysta z bridge'a, nie z `tw.*` ani metod obiektów BAW.

**Status:** kroki 2–3 i docelowy kontrakt są projektowane. Aktualny `main.ts` to niezależny test osadzenia, nie kompletna integracja z BAW.

## Planowany kontrakt integracji

Wcześniej uzgodniony kierunek:

```ts
const { binding, config, bridge } = prepareHost(/* kontekst BAW */);
const instance = await initForm(binding, config, bridge);
instance.destroy();
```

- `prepareHost()` jest odpowiedzialnością wspólnej biblioteki.
- `binding` — dane formularza w postaci niezależnej od BAW.
- `config` — konfiguracja formularza, w tym potrzebne opcje Coach View.
- `bridge` — komunikacja z BAW: odczyt/zapis całego bindingu, odczyt/zapis opcji (`tw.context.options`, w tym `clientData`), zdarzenia graniczne (np. zamknięcie/przejście), wywołania usług.
- Po stronie Angulara planowano DI przez tokeny `FORM_DATA`, `FORM_CONFIG`, `BRIDGE`.

To **kontrakt koncepcyjny**, a nie API już zaimplementowane. Szczegóły typów, reaktywność danych i miejsce bootstrapu pozostają do ustalenia.

## Adapter danych BAW ↔ JS

Obiekty złożone BAW mogą mieć własne metody `get`/`set` i nie powinny trafiać bezpośrednio do Angulara. Adapter powinien:

- rekurencyjnie odwzorowywać struktury BAW na plain JS (również listy i wartości zagnieżdżone);
- zapewnić kontrolowany zapis zmian do bindingu BAW;
- konwertować wyniki usług i wartości opcji odczytywane przez bridge;
- ukrywać format i metody specyficzne dla BAW.

Otwarte: reguły konwersji typów specjalnych, list, wartości pustych, tożsamości obiektów i obsługi błędów. Nie zakładać, że zwykłe `JSON.stringify` rozwiązuje ten problem.

## Wywoływanie usług

**POC:** korzystamy z usług podpiętych do opcji Coach View. Istniejący mechanizm callbacków `onSuccess`/`onError` ma być opakowany w `Promise`; wynik przechodzi przez adapter BAW → JS. Wejście usługi ma akceptować zwykłe obiekty JS, o ile praktyczne testy nie wykażą potrzeby dodatkowej konwersji.

**Później:** bezpośrednie wywołania Service Flow przez REST, z uwzględnieniem wersji aplikacji/snapshotu, kontekstu i autoryzacji. Nie jest to element bieżącego kontraktu POC.

## Obecna implementacja testowa

`apps/aaa/src/main.ts` eksportuje:

```ts
init(formType, element, data, onSave, globalCss?)
// zwraca { destroy(), setData(data) }
```

`tools/bundle.mjs` opakowuje ją jako `window.AngularForm.init(...)` i przekazuje CSS buildu. `main.ts` tworzy `createApplication()`, bootstrapuje obecnie bezpośrednio `RegistrationForm`, dodaje `<style>` do `element.ownerDocument.head`, a `destroy()` usuwa aplikację i style.

**Ważne:** `RegistrationForm` w obecnym kodzie nie deklaruje inputów `data`, `formType`, `onSave`, mimo że `main.ts` wywołuje `setInput()`. Jest to test techniczny, nie potwierdzony przepływ danych formularza. Komponent testuje dynamiczny import `LazyTestComponent`.

## Izolacja i style

Formularze BAW są renderowane w iframe, więc style dodane do dokumentu iframe nie powinny wpływać na stronę nadrzędną. Należy sprawdzić zachowanie w prawdziwym BAW, szczególnie przy wielokrotnej inicjalizacji i zwalnianiu instancji. Docelowa biblioteka UI ma wspierać lokalne nadpisania stylów bez mnożenia wariantów komponentów; mechanizm pozostaje otwarty.
