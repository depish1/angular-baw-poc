import { provideHttpClient } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import {
  bindDocumentsElementHost,
  copyDocuments,
  DocumentsElementAdapter,
  DocumentsElementOptions,
  unbindDocumentsElementHost,
} from './documents/documents-element/documents-element-adapter';
import { DocumentMetadata } from './documents/documents-component/documents.types';

interface GeneratedElement extends HTMLElement {
  connectedCallback(): void;
  disconnectedCallback(): void;
}

const tagName = 'baw-documents';
const registration = Symbol.for('web-component-poc.baw-documents.registration');

async function registerDocumentsElement(): Promise<void> {
  if (customElements.get(tagName)) return;

  const application = await createApplication({ providers: [provideHttpClient()] });
  const AngularElement = createCustomElement(DocumentsElementAdapter, {
    injector: application.injector,
  }) as unknown as new () => GeneratedElement;

  class DocumentsElement extends AngularElement {
    #adapter?: DocumentsElementAdapter;
    #initialized = false;
    #destroyed = false;
    #connectionCompleted = false;
    #resolveReady?: () => void;
    #rejectReady?: (reason: unknown) => void;

    override connectedCallback(): void {
      if (!this.#initialized || this.#destroyed) return;

      try {
        super.connectedCallback();
        this.#connectionCompleted = true;
        if (this.#adapter) this.resolveInitialization();
      } catch (error) {
        this.#destroyed = true;
        this.#adapter = undefined;
        unbindDocumentsElementHost(this);
        this.#rejectReady?.(error);
        this.#resolveReady = undefined;
        this.#rejectReady = undefined;
      }
    }

    override disconnectedCallback(): void {
      if (this.#initialized && !this.#destroyed) super.disconnectedCallback();
    }

    async init(options: DocumentsElementOptions = {}): Promise<void> {
      if (this.#initialized) throw new Error('The documents element is already initialized.');

      const initialData = options.initialData ? copyDocuments(options.initialData) : undefined;

      this.#initialized = true;
      const ready = new Promise<void>((resolve, reject) => {
        this.#resolveReady = resolve;
        this.#rejectReady = reject;
      });

      bindDocumentsElementHost(this, {
        options: {
          ...options,
          initialData,
        },
        onReady: (adapter) => {
          this.#adapter = adapter;
          if (this.#connectionCompleted) this.resolveInitialization();
        },
        onDestroyed: (adapter) => {
          if (this.#adapter && this.#adapter !== adapter) return;
          this.#adapter = undefined;
          this.#destroyed = true;
          unbindDocumentsElementHost(this);
          this.#rejectReady?.(new Error('The documents element was destroyed before initialization.'));
          this.#resolveReady = undefined;
          this.#rejectReady = undefined;
        },
      });

      if (this.isConnected) this.connectedCallback();
      return ready;
    }

    setData(documents: DocumentMetadata[]): void {
      this.requireAdapter().setData(documents);
    }

    getData(): DocumentMetadata[] {
      return this.requireAdapter().getData();
    }

    get isValid(): boolean {
      return this.requireAdapter().isValid;
    }

    setValid(isValid: boolean, errMsg?: string): void {
      this.requireAdapter().setValid(isValid, errMsg);
    }

    get isSynchronized(): boolean {
      return this.isConnected && !this.#destroyed ? (this.#adapter?.isSynchronized ?? false) : false;
    }

    async commit(): Promise<void> {
      await this.requireAdapter().commit();
    }

    private resolveInitialization(): void {
      this.#resolveReady?.();
      this.#resolveReady = undefined;
      this.#rejectReady = undefined;
    }

    private requireAdapter(): DocumentsElementAdapter {
      if (!this.#initialized) throw new Error('Call init() on the documents element first.');
      if (!this.isConnected || this.#destroyed || !this.#adapter) {
        throw new Error('Connect the initialized documents element and await init() before using its API.');
      }
      return this.#adapter;
    }
  }

  customElements.define(tagName, DocumentsElement);
}

export function initDocumentsElement(): Promise<void> {
  const existing = Reflect.get(globalThis, registration) as Promise<void> | undefined;
  if (existing) return existing;

  const pending = registerDocumentsElement().catch((error) => {
    if (Reflect.get(globalThis, registration) === pending) {
      Reflect.deleteProperty(globalThis, registration);
    }
    throw error;
  });

  Reflect.set(globalThis, registration, pending);
  return pending;
}

// Loading the bundle only exposes the entry point; BAW decides when to initialize Angular.
Object.assign(globalThis, { initDocumentsElement });
