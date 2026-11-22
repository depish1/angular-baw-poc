import { selectDevForm } from '../../../libs/form-runtime/src/dev-form';
import { defaultFormType, fixtures } from './dev/fixtures';
import { init } from './main';

const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Brak elementu #root dla formularza Angular.');

try {
  const { formType, fixture } = selectDevForm(window.location.search, fixtures, defaultFormType);

  // Wykorzystujemy dokładnie ten sam punkt wejścia, z którego korzysta BAW.
  await init(formType, root, fixture.binding, fixture.config, {
    complete: (result) => console.log(`[${formType}] Wynik formularza:`, result),
  });
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  root.replaceChildren();
  const alert = document.createElement('p');
  alert.setAttribute('role', 'alert');
  alert.textContent = `Nie udało się uruchomić formularza: ${message}`;
  root.appendChild(alert);
  console.error('Błąd uruchamiania formularza:', error);
}
