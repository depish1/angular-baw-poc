# Angular Web Components w IBM BAW — scenariusz współdzielonych komponentów biznesowych

> **Status: koncepcja do analizy / POC, nie decyzja architektoniczna.** Ten dokument opisuje potencjalny wyjątek od aktualnej zasady niemieszania Angulara i Coach Views w pojedynczym formularzu. Nie zmienia architektury migracji całych formularzy ani obecnego kodu POC.

## Cel i motywacja

Rozważamy wcześniejsze przepisanie około 5–10 rozbudowanych, współdzielonych komponentów biznesowych (np. zarządzania dokumentami: lista, podgląd, dodawanie, pobieranie, usuwanie). Obecnie są one wykorzystywane w formularzach Coach Views, ale docelowo powinny również działać w nowych formularzach Angular.

Priorytetem jest **jedna implementacja biznesowa** i efektywne użycie jej w docelowych formularzach Angular. Obsługa starszych formularzy ma być warstwą kompatybilności, a nie powodem do uruchamiania Angular Elements wewnątrz formularzy napisanych już w Angularze.

## Dwie odrębne ścieżki migracji

| Scenariusz | Integracja | Zakres |
| --- | --- | --- |
| Cały formularz migrowany do Angulara | Obecny kierunek: `initForm()`, `BawBridge`, adapter BAW ↔ JS | Formularz w całości Angular, bez osadzania Coach Views |
| Współdzielony komponent w formularzu Coach Views | Rozważany wrapper Angular Elements / Custom Element | Wyjątek: pojedynczy komponent Angular wewnątrz istniejącego formularza Coach Views |

`BawBridge` pozostaje koncepcją dla **całych formularzy**. Nie zakładamy uniwersalnego `ComponentBridge` dla wszystkich komponentów biznesowych.

## Jedna implementacja, dwa sposoby użycia

```text
Biblioteka komponentów Angular
└── DocumentManagerComponent (UI + logika biznesowa + REST)
    ├── formularz Angular → natywny import komponentu
    │   └── współdzielony runtime formularza
    └── wrapper Angular Elements → <company-document-manager>
        └── Coach View → dane / zdarzenia / synchronizacja bindingu BAW
```

Komponent definiuje **własny kontrakt biznesowy**: `input()`, `output()` i, jeśli potrzebne, publiczne metody. Nie otrzymuje obiektów `tw.*`, bindingów specyficznych dla BAW ani `BawBridge`.

### Szkic kontraktu komponentu (ilustracyjny, nie zatwierdzone API)

```ts
@Component({
  selector: 'ui-document-manager',
  standalone: true,
  template: `<!-- UI dokumentów -->`,
})
export class DocumentManagerComponent {
  documents = input<readonly DocumentSummary[]>([]);
  documentAdded = output<DocumentSummary>();
  documentOpenRequested = output<string>();

  refreshDocuments(): void {
    // Przykładowa publiczna operacja; szczegóły kontraktu do ustalenia.
  }
}
```

Użycie w formularzu Angular:

```html
<ui-document-manager
  [documents]="documents()"
  (documentAdded)="onDocumentAdded($event)"
/>
```

Wrapper rejestrujący Custom Element (schemat, nie kod produkcyjny):

```ts
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

export async function registerDocumentManagerElement(): Promise<void> {
  if (customElements.get('company-document-manager')) return;

  const app = await createApplication();
  const elementConstructor = createCustomElement(DocumentManagerComponent, {
    injector: app.injector,
  });
  customElements.define('company-document-manager', elementConstructor);
}
```

**Uwaga:** ten przykład nie zabezpiecza przed równoległymi wywołaniami funkcji. Produkcyjny loader musi współdzielić jedną obietnicę inicjalizacji na stronę, obsłużyć błędy i zapewnić zwalnianie zasobów. `customElements.get()` samo w sobie nie wystarcza jako blokada współbieżności.

Przykładowe użycie po stronie Coach View:

```js
const element = document.querySelector('company-document-manager');
element.documents = plainJsDocuments;

element.addEventListener('documentAdded', (event) => {
  // event.detail: dane biznesowe; adapter Coach View aktualizuje binding BAW
  updateBawDocuments(event.detail);
});
```

W Angular Elements wyjścia komponentu są eksponowane jako zdarzenia DOM; ich nazwy i mapowanie należy potwierdzić dla używanej wersji Angulara. Powyższy kod zakłada, że Custom Element został już zarejestrowany i wyrenderowany.

## Granica integracji i REST

Rozważane komponenty biznesowe komunikują się z backendem **bezpośrednio przez REST**, nie wywołują Service Flow BAW. Z tego powodu na tym etapie nie projektujemy dla nich API wywoływania usług BAW.

Należy jednak sprawdzić: adresy endpointów w różnych środowiskach, przekazywanie konfiguracji, uwierzytelnianie i cookies/tokeny, CORS, obsługę błędów i ograniczenia bezpieczeństwa w kontekście strony BAW. Logika REST może być współdzielona, a konfiguracja środowiskowa nie powinna być zaszyta w komponencie.

## Binding Coach View i synchronizacja danych

W przeciwieństwie do całego formularza Angular, osadzony komponent współistnieje z pozostałymi Coach Views i może korzystać z tych samych danych biznesowych. Warstwa integracyjna po stronie Coach View powinna:

1. Odczytać odpowiedni fragment bindingu BAW i zamienić go na plain JS.
2. Przekazać dane do właściwości Custom Element.
3. Obsłużyć zdarzenia komponentu i zapisać odpowiednie zmiany do BAW.
4. W razie potrzeby obserwować zmiany bindingu dokonane przez inne Coach Views i aktualizować komponent.
5. Unikać pętli zmian, rozstrzygnąć źródło prawdy i zwolnić subskrypcje przy zniszczeniu Coach View.

Nie przesądzamy, czy wszystkie komponenty wymagają pełnej synchronizacji dwukierunkowej. Kontrakt i częstotliwość aktualizacji powinny wynikać z konkretnego przypadku biznesowego. Wspólne pomocnicze funkcje BAW ↔ JS są możliwe, ale nie powinny wymuszać jednakowego interfejsu biznesowego.

## Runtime, bundlowanie i dystrybucja

- Kilka instancji **tego samego zarejestrowanego Custom Element** na jednej stronie może korzystać z jednej aplikacji/injectora Angular; instancje mają własny stan komponentu, ale usługi o zasięgu root mogą być współdzielone.
- Należy zagwarantować **jednokrotne załadowanie skryptu, utworzenie aplikacji i rejestrację elementu na stronę**, także gdy kilka Coach Views inicjalizuje się równocześnie.
- Custom Elements wymagają własnego entrypointu i bundla dla legacy Coach Views. Formularze Angular powinny korzystać z biblioteki **natywnie**, bez ponownego pakowania runtime'u przez Angular Elements.
- Nie zakładamy współdzielenia runtime'u pomiędzy odrębnymi stronami, iframe ani aplikacjami BAW.
- Nie przesądzamy, czy wiele typów elementów otrzyma wspólny bundle, czy oddzielne bundle, ani jak będą dystrybuowane w toolkitach BAW.

## Otwarte pytania do POC

1. Czy da się bezpiecznie ładować i rejestrować Custom Elements raz na stronę przy wielu instancjach Coach View, również równolegle?
2. Jak dokładnie działają `input()`, `output()`, właściwości i publiczne metody przez Angular Elements w docelowej wersji Angulara?
3. Jak wygląda odczyt, zapis i obserwowanie zagnieżdżonego bindingu BAW, w tym list i obiektów z `get/set`?
4. Jak rozstrzygać konflikty aktualizacji oraz unikać sprzężeń zwrotnych?
5. Jak organizować bundle, aktualizacje bibliotek, zgodność wersji Angulara i cache skryptów?
6. Jak konfigurować REST, autoryzację i obsługę błędów wewnątrz hosta BAW?
7. Kto odpowiada za cykl życia i sprzątanie zasobów przy usuwaniu Coach View?

## Relacja do aktualnych ustaleń

Aktualne zasady z [architektury](architecture.md) i [decyzji projektowych](decisions-and-open-questions.md) nadal obowiązują dla **migracji całych formularzy**. Ten dokument nie oznacza wdrożenia Angular Elements ani zmiany istniejącego `BawBridge`. Ewentualne dopuszczenie mieszanego formularza Coach Views + pojedyncze Angular Elements wymaga osobnej decyzji po testach.

---

_Dokument przygotowany przez ChatGPT na podstawie dyskusji architektonicznej. Powiązane zadanie: #2._
