import '../../dist/documents-element/main.js';

const events = document.querySelector('#events');
const initializeButton = document.querySelector('#initialize');
const instances = new Map();
const configurations = [
  { key: 'a', repository: 'A', synchronizationMode: 'DEFERRED' },
  { key: 'b', repository: 'B', synchronizationMode: 'IMMEDIATE' },
];

function log(message) {
  const entry = new Date().toLocaleTimeString('pl-PL') + ' ' + message;
  events.textContent = events.textContent === 'Brak zdarzeń.' ? entry : entry + '\n' + events.textContent;
}

function showState(panel, element) {
  panel.querySelector('[data-output]').textContent = JSON.stringify({
    isValid: element.isValid,
    isSynchronized: element.isSynchronized,
    documents: element.getData(),
  }, null, 2);
}

async function initialize() {
  initializeButton.disabled = true;
  try {
    // Import bundle nie inicjalizuje Angulara: uruchamiamy go jawnie.
    await globalThis.initDocumentsElement();
    await Promise.all(configurations.map(async (configuration) => {
      const panel = document.querySelector('[data-demo="' + configuration.key + '"]');
      const element = document.createElement('baw-documents');
      const ready = element.init({
        repository: configuration.repository,
        synchronizationMode: configuration.synchronizationMode,
        title: 'Dokumenty — repozytorium ' + configuration.repository,
        initialData: [],
        onChange: (data) => {
          log('[' + configuration.repository + '] onChange: ' + JSON.stringify(data));
          showState(panel, element);
        },
      });
      panel.querySelector('[data-mount]').append(element);
      await ready;
      instances.set(configuration.key, element);
      panel.querySelectorAll('[data-action]').forEach((button) => {
        button.disabled = false;
      });
      showState(panel, element);
      log('[' + configuration.repository + '] komponent gotowy');
    }));
  } catch (error) {
    log('Błąd inicjalizacji: ' + (error instanceof Error ? error.message : String(error)));
  }
}

async function handleOperation(event) {
  const button = event.target.closest('button[data-action]');
  if (!button || button.disabled) return;
  const panel = button.closest('[data-demo]');
  const element = instances.get(panel.dataset.demo);
  if (!element) return;
  const action = button.dataset.action;
  button.disabled = true;
  try {
    switch (action) {
      case 'set-data': {
        const documents = JSON.parse(panel.querySelector('[data-documents]').value);
        if (!Array.isArray(documents)) throw new Error('setData() wymaga tablicy metadanych.');
        element.setData(documents);
        break;
      }
      case 'get-data':
        log('[' + panel.dataset.demo + '] getData: ' + JSON.stringify(element.getData()));
        break;
      case 'set-invalid':
        element.setValid(false, 'Błąd walidacji ustawiony przez hosta');
        break;
      case 'set-valid':
        element.setValid(true);
        break;
      case 'commit':
        await element.commit();
        log('[' + panel.dataset.demo + '] commit zakończony');
        break;
      case 'status':
        log('[' + panel.dataset.demo + '] isValid=' + element.isValid + ', isSynchronized=' + element.isSynchronized);
        break;
    }
    showState(panel, element);
  } catch (error) {
    log('[' + panel.dataset.demo + '] ' + action + ': ' + (error instanceof Error ? error.message : String(error)));
  } finally {
    button.disabled = false;
  }
}

initializeButton.addEventListener('click', initialize, { once: true });
document.querySelector('.instances').addEventListener('click', handleOperation);
