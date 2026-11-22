# UI — biblioteka komponentów Angular

Pierwsza paczka UI w monorepo, budowana do **Angular Package Format (APF)**.
Jest rozwijana na Angularze 21, z własnymi zależnościami i `node_modules`.

## Publiczne API

```typescript
import { UiButton, UiAlert, UiInput, UiFormFieldInput } from 'ui';
```

Przykładowe użycie w komponencie standalone:

```typescript
@Component({
  imports: [UiButton, UiAlert],
  template: `
    <ui-button
      variant="secondary"
      size="mini"
      [disabled]="saving()"
      (clicked)="remove()"
    >Usuń</ui-button>
    <ui-alert variant="error">Nie udało się przesłać pliku.</ui-alert>
  `,
})
export class ExampleComponent { /* ... */ }
```

### UiButton

- `variant`: `primary` (domyślnie) lub `secondary`.
- `size`: `default` (domyślnie) lub `mini`.
- `type`: `button` (domyślnie), `submit`, `reset`.
- `disabled`: `false` (domyślnie).
- `clicked`: `output<MouseEvent>` emitowany po kliknięciu natywnego przycisku.

### UiAlert

- `variant`: `info` (domyślnie), `success`, `warning`, `error`.
- Treść komunikatu przez `ng-content`.
- Dla `error` host ma `role="alert"`, dla pozostałych `role="status"`.

### UiInput i UiFormFieldInput

`UiInput` działa samodzielnie lub z Angular Signal Forms. Ma typy `text`,
`search`, `email`, `password`, rozmiary `default` / `mini` oraz parametry
`placeholder`, `id`, `disabled`, `readonly`. `value = model('')` udostępnia
`valueChange`; natywne zdarzenia inputa mogą być obsługiwane standardowo.

```html
<ui-input type="search" placeholder="Filtruj" [(value)]="query" />
<ui-form-field-input label="Imię" [formField]="fields.name" />
```

`UiFormFieldInput` łączy `UiLabel`, `UiInput` i `UiError` (błąd pojawia się
po dotknięciu niepoprawnego pola). Sam wrapper jest kontrolką Signal Forms,
przekazując wartość do wewnętrznego `UiInput` bez dodatkowego modelu danych.
W formularzu należy zaimportować dyrektywę `FormField` z `@angular/forms/signals`.

### UiCheckbox i UiFormFieldCheckbox

Pojedynczy checkbox przechowuje `boolean` (`false` domyślnie), wspiera
`disabled` i Signal Forms:

```html
<ui-checkbox [(value)]="accepted">Akceptuję regulamin</ui-checkbox>
<ui-form-field-checkbox label="Akceptuję regulamin" [formField]="fields.accepted" />
```

Gotowe pole korzysta z `UiLabel` i `UiError`, z etykietą po prawej stronie.

### UiCheckboxGroup i UiFormFieldCheckboxGroup

Grupa wielokrotnego wyboru przechowuje **tablicę pełnych obiektów**. Obowiązkowe
`labelKey` i `valueKey` wskazują odpowiednio pole etykiety i klucz porównywania:

```html
<ui-checkbox-group [options]="departments" labelKey="name" valueKey="id"
  [(value)]="selectedDepartments" />
<ui-form-field-checkbox-group label="Działy" [formField]="fields.departments"
  [options]="departments" labelKey="name" valueKey="id" />
```

`orientation` to `vertical` (domyślnie) albo `horizontal`. Zmiana listy `options`
nie podmienia wybranych obiektów w wartości formularza.

## CSS i motywy

Paczka udostępnia pliki CSS jako osobne eksporty. Aplikacja wybiera **jeden**
motyw i importuje go w swoich globalnych stylach:

```css
@import 'ui/styles/tokens.css';
@import 'ui/styles/themes/red.css';
```

Alternatywnie użyj `ui/styles/themes/blue.css`. Nie importuj jednocześnie obu
motywów, bo definiują te same zmienne. Biblioteka nie narzuca motywu automatycznie.

Zmienne CSS, np. `--ui-color-primary`, `--ui-radius` i `--ui-spacing-md`,
mogą być używane również przez **własne komponenty aplikacji**. Komponenty UI
mają podstawowe wartości zastępcze dla kluczowych zmiennych, ale zalecamy
import tokenów i wybranego motywu w aplikacji.

## Budowanie i pakowanie

W katalogu `libs/ui`:

```bash
npm ci
npm run build
npm test -- --watch=false
npm run pack:check
npm run pack:local
```

Wynik APF znajduje się w `dist/`, w tym JavaScript, typy, source maps i pliki CSS.
`pack:local` tworzy archiwum `ui-0.1.0.tgz`, które można zainstalować lokalnie
bez publikowania w rejestrze npm, np. przez `npm install <ścieżka-do-tgz>`.
Nie instaluj aplikacji bezpośrednio z katalogu źródłowego `libs/ui`.

## Zależności

Angular jest `peerDependency` paczki i `devDependency` jej własnego procesu
budowania. Obecnie deklarowana jest zgodność z Angular 21. Obsługę Angular 22
i dalszych wersji rozszerzymy **po przeprowadzeniu testów integracyjnych**.

W docelowym rejestrze npm należy sprawdzić dostępność nieskopowanej nazwy
`ui` przed publikacją. Nie publikujemy paczki w ramach tego zadania.
