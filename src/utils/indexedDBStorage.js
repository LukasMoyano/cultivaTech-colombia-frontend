/**
 * Adaptador Soberano IndexedDB para CultivaTech ColombIA
 * Permite persistir alertas de blockchain, lotes anclados y telemetría en segundo plano.
 */

const DB_NAME = "CultivaTechDB";
const DB_VERSION = 1;
const STORE_ALERTAS = "alertas_blockchain";

export function abrirDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB no soportado en este entorno"));
      return;
    }

    const req = window.indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_ALERTAS)) {
        const store = db.createObjectStore(STORE_ALERTAS, { keyPath: "hash" });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function guardarAlertasDB(alertas) {
  try {
    const db = await abrirDB();
    const tx = db.transaction(STORE_ALERTAS, "readwrite");
    const store = tx.objectStore(STORE_ALERTAS);

    for (const alerta of alertas) {
      if (alerta && alerta.hash) {
        store.put(alerta);
      }
    }

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn("[IndexedDB] Error al persistir alertas:", err.message);
    return false;
  }
}

export async function obtenerAlertasDB(limite = 15) {
  try {
    const db = await abrirDB();
    const tx = db.transaction(STORE_ALERTAS, "readonly");
    const store = tx.objectStore(STORE_ALERTAS);
    const index = store.index("timestamp");

    return new Promise((resolve) => {
      const alertas = [];
      const req = index.openCursor(null, "prev"); // Orden descendente cronológico

      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor && alertas.length < limite) {
          alertas.push(cursor.value);
          cursor.continue();
        } else {
          resolve(alertas);
        }
      };

      req.onerror = () => resolve([]);
    });
  } catch (err) {
    console.warn("[IndexedDB] Error al recuperar alertas:", err.message);
    return [];
  }
}
