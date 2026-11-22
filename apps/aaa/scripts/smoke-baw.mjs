import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const bundle = await readFile(new URL('../dist/baw/aaa.js', import.meta.url), 'utf8');

async function check(formType, binding, config, expectedText, expectedResult) {
  const dom = new JSDOM('<!doctype html><html><head></head><body><div id="root"></div></body></html>', {
    url: 'http://localhost/',
    runScripts: 'outside-only',
    pretendToBeVisual: true,
  });
  const { window } = dom;
  try {
    window.eval(bundle);
    assert.equal(typeof window.AngularForm.init, 'function');
    const results = [];
    const instance = await window.AngularForm.init(formType, window.document.querySelector('#root'), binding, config, {
      complete: (result) => results.push(result),
    });

    // Angular propaguje setInput do widoku asynchronicznie.
    await new Promise((resolve) => window.setTimeout(resolve, 30));
    assert.match(window.document.querySelector('#root').textContent, expectedText);
    window.document.querySelector('#root button').click();
    assert.deepEqual(JSON.parse(JSON.stringify(results)), [expectedResult]);

    instance.destroy();
  } finally {
    window.close();
  }
}

await check(
  'CUSTOMER',
  { firstName: 'Anna', lastName: 'Nowak' },
  { title: 'Klient testowy' },
  /Anna Nowak/,
  { fullName: 'Anna Nowak' },
);

await check(
  'REQUEST',
  { requestId: 7, amount: 123 },
  { currency: 'PLN', allowApproval: true },
  /123 PLN/,
  { requestId: 7, approved: true },
);

console.log('OK: bundle BAW — wybór formularza i przekazanie danych');
