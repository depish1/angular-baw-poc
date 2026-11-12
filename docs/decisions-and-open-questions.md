# Decyzje i pytania otwarte

## Ustalone kierunki

| Temat | Ustalenie / uzasadnienie |
|---|---|
| Strategia migracji | Formularz/dashboard migrowany w całości; bez mieszania Angulara i Coach Views w jednym formularzu. |
| Jednostka wdrożenia | Jeden bundle JS na aplikację BAW, zawierający jej formularze; niezależne wersje między aplikacjami. |
| Repozytorium | Wiele niezależnych projektów Angular CLI w `apps/`; bez Nx i npm workspaces. |
| Biblioteki współdzielone | Docelowo paczki npm z firmowego registry; `packages/` to tymczasowe miejsce na POC. |
| Granica technologii | Angular operuje na plain JS i bridge; nie używa bezpośrednio API BAW. |
| Usługi w pierwszym POC | Usługi z opcji Coach View; wrapper `onSuccess/onError` → Promise, wynik przez adapter. |
| Osadzenie | Element hostujący w Custom HTML istniejącego Coach View, bez osobnego Host CV. |
| Testy | `xTest/` pozostaje wersjonowany. |

## Rozważone alternatywy

- **Angular Elements:** możliwe technicznie i użyteczne punktowo, lecz nieprzyjęte jako główny model uruchamiania całych formularzy. Mogą wrócić w szczególnym przypadku współdzielonych widoków osadzanych obok Coach Views; byłby to odrębny scenariusz.
- **Nx/monorepo z jednym workspace:** rozważane wcześniej, ostatecznie zastąpione niezależnymi projektami Angular CLI, aby nie wiązać zależności i buildów różnych aplikacji.
- **Jeden runtime Angular współdzielony między aplikacjami:** odrzucony ze względu na izolację i niezależne wersjonowanie.
- **Wspólny bootstrap w bibliotece:** nieprzesądzone; redukuje powielanie kodu, ale może silnie związać bibliotekę z wersją Angulara.

## Otwarte decyzje

1. **Właściciel bootstrapu:** aplikacja czy wspólna biblioteka? Jak ograniczyć powielanie kodu bez wymuszania jednej wersji Angulara?
2. **Wybór formularza:** `App` z selekcją po `formType`, rejestr fabryk czy bezpośredni bootstrap komponentu? Aktualne bootstrapowanie `RegistrationForm` to tylko test.
3. **Ostateczny kontrakt bridge'a:** typy, DI, aktualizacje bindingu, zdarzenia, obsługa błędów, cykl życia i sprzątanie zasobów.
4. **Adapter BAW:** typy specjalne, listy, obiekty z metodami `get/set`, obsługa `null` i synchronizacja zmian.
5. **Style UI:** lokalne nadpisywanie stylów komponentów z biblioteki bez dokładania wariantów dla pojedynczych aplikacji.
6. **Routing:** czy wieloetapowe formularze potrzebują Angular Router i jak ma działać URL w iframe.
7. **Współdzielone widoki toolkitów:** ewentualne wyjątki od reguły niemieszania technologii wymagają osobnej analizy.

## Zasada dla implementacji

Nie traktować otwartych pytań jako zatwierdzonych decyzji. Przed wdrożeniem rozwiązania rozstrzygnąć je w POC i uaktualnić ten dokument.
