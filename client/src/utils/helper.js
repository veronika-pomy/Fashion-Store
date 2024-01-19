export function indexedDBStore(storeName, method, object) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('e-shop', 1);
        let db, tx, store;
        request.onupgradeneeded = function(e) {
            const newObjectStore = request.result;
            newObjectStore.createObjectStore('products', { keyPath: '_id' });
            newObjectStore.createObjectStore('categories', { keyPath: '_id' });
            newObjectStore.createObjectStore('cart', { keyPath: '_id' });
        };

        request.onerror = function(e) {
            console.log('Unexpected error.');
        };

        request.onsuccess = function(e) {
            db = request.result;
            tx = db.transaction(storeName, 'readwrite');
            store = tx.objectStore(storeName);
        
            db.onerror = function(e) {
              console.log('Unexpected error.', e);
            };

            switch (method) {
                case 'put':
                    store.put(object);
                    resolve(object);
                    break;
                  case 'get':
                    const all = store.getAll();
                    all.onsuccess = function() {
                      resolve(all.result);
                    };
                    break;
                  case 'delete':
                    store.delete(object._id);
                    break;
                  default:
                    console.log('Error. Not a valid method.');
                    break;
            };

            tx.oncomplete = function() {
                db.close();
            };
        };
    });
};

export function mult(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
};