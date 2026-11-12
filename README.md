# Angular + IBM BAW — POC integracji

## Cel

Sprawdzić architekturę stopniowej migracji interfejsów IBM Business Automation Workflow (BAW 24.0.1) z Coach Views do Angulara. Docelowa skala to około 120 aplikacji, 1000 formularzy i 100 dashboardów; migracja będzie wieloletnia i realizowana niezależnie dla poszczególnych formularzy/dashboardów.

## Założenia

- Jeden formularz/dashboard jest w całości oparty na Angularze **albo** na Coach Views. Nie mieszamy technologii wewnątrz formularza.
- Angular jest uruchamiany wewnątrz formularza BAW, osadzonego w osobnej ramce (iframe); formularze otwierają się w nowych kartach.
- BAW udostępnia element hostujący (`<div id="root">`) w Custom HTML Coach View. Nie tworzymy osobnego „Host Coach View”.
- Angular nie powinien znać wewnętrznego API BAW; integrację zapewnia wspólna warstwa `baw-angular-core` / bridge i adapter danych.
- Jednostką budowania i wdrożenia jest aplikacja BAW: **jeden plik JavaScript na aplikację**, zawierający jej formularze. Aplikacje mają niezależne zależności i wersje Angulara.
- POC służy do weryfikacji technicznej. Kontrakty i implementacje oznaczone jako planowane nie są jeszcze ukończone.

## Dokumenty

- [Architektura](docs/architecture.md) — granica BAW/Angular, bridge, dane, usługi.
- [Repozytorium i build](docs/repository-and-build.md) — struktura, zależności, pakowanie.
- [Decyzje i pytania otwarte](docs/decisions-and-open-questions.md) — ustalenia, alternatywy i niewiadome.
- [Angular Web Components — koncepcja](docs/angular-web-components.md) — rozważany scenariusz współdzielonych komponentów biznesowych osadzanych w Coach Views.
- [Roadmapa](docs/roadmap.md) — co działa, co zweryfikować dalej.
- [Szybkie odtworzenie repozytorium](docs/setup-guide.md) — polecenia i minimalna konfiguracja.

**Zasada interpretacji:** „ustalone” = decyzja projektowa; „zaimplementowane” = obecny kod; „otwarte” i „planowane” nie stanowią wymagań dla implementacji bez dalszej decyzji.
