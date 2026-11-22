# UI — biblioteka komponentów Angular

Pierwsza paczka UI w monorepo, budowana do **Angular Package Format (APF)**.
Jest rozwijana na Angularze 21, z własnymi zależnościami i `node_modules`.

## Publiczne API

```typescript
import { UiButton, UiAlert } from 'ui';
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
