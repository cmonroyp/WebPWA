// Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_carlos_monroy_pwa';

//Ficheros a cachear en la aplicacion
let urlsToCache = [
    './',//cachea todos los archivo del directorio
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/favicon-16.png',
    './img/favicon-32.png',
    './img/favicon-64.png',
    './img/favicon-96.png',
    './img/favicon-128.png',
    './img/favicon-192.png',
    './img/favicon-256.png',
    './img/favicon-384.png',
    './img/favicon-512.png',
    './img/favicon-1024.png',
    './img/twitter.png',
    './img/instagram.png'
];

// Evento install
/*Permite instalar la aplicacion*/
/*Instalacion del service worker y guarda en cache los recursos estaticos*/
self.addEventListener('install', e =>{

    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache =>{
                  return cache.addAll(urlsToCache)
                              .then(()=>{
                                  self.skipWaiting();
                              });                              
              })
              .catch(err =>{
                console.log('No se ha registrado el cache', err)
            })
    )
});

//Evento activate
/* permite activar la aplicacion y que la app funcione sin conexion */
self.addEventListener('activate',e =>{
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
              .then(cacheNames =>{
                  return Promise.all(
                      //recorre el objeto cache y busca la palabra clave
                      cacheNames.map(cacheName =>{

                        if(cacheWhiteList.indexOf(cacheName)=== -1){
                            //Borra los elementos de la cahce que no se necesitan.
                            return caches.delete(cacheName);
                        }
                      })
                  );
              })
              .then(()=>{
                  //Activa cache actual en el disposito 
                  self.clients.claim();
              })
    );
})

//Evento fetch
/* permite conseguir la informacion original, desde el servidor o desde la web que hay en internet */
/*Este metodo permite recuperar la informacion que hay en cache y en caso de no existir, la cachea, un eejmplo puede ser
cuando cambiamos de vistas en la aplicacion.*/
self.addEventListener('fetch', e =>{

    e.respondWith(
        caches.match(e.request)
              .then(res =>{
                  if(res){
                      //devuelvo datos desde el cache
                      return res;
                  }
                  //si no esta en cache la recupero de la web o el servidor.
                  return fetch(e.request);
              })
    )
})
