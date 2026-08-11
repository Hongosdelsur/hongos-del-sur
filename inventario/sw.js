/* ============================================================
   Service worker — Hongos del Sur
   Solo sirve para que la app abra sin señal y se pueda instalar.
   Los datos no pasan por aquí: viven en el navegador del dispositivo.

   Al publicar una versión nueva de la app, subir CACHE una unidad.
   ============================================================ */

var CACHE = "hds-inv-v1";
var BASE = [
  "./",
  "./manifest.json",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable.png"
];

self.addEventListener("install", function(ev){
  ev.waitUntil(
    caches.open(CACHE).then(function(c){
      // Si algún archivo falla, la instalación sigue: mejor media caché que ninguna.
      return Promise.all(BASE.map(function(u){
        return c.add(new Request(u, {cache:"reload"})).catch(function(){});
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(ev){
  ev.waitUntil(
    caches.keys().then(function(ks){
      return Promise.all(ks.map(function(k){ return k === CACHE ? null : caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(ev){
  var req = ev.request;
  if(req.method !== "GET") return;

  // La app es un solo HTML: se pide siempre a la red primero, así una versión
  // nueva llega apenas hay señal. Sin señal, sale la copia guardada.
  if(req.mode === "navigate"){
    ev.respondWith(
      fetch(req).then(function(res){
        var copia = res.clone();
        caches.open(CACHE).then(function(c){ c.put("./", copia); });
        return res;
      }).catch(function(){
        return caches.match("./", {ignoreSearch:true}).then(function(r){
          return r || new Response("Sin conexión y sin copia guardada todavía.",
            {status:503, headers:{"Content-Type":"text/plain; charset=utf-8"}});
        });
      })
    );
    return;
  }

  // Íconos y manifiesto: primero la copia, y se refresca por detrás.
  ev.respondWith(
    caches.match(req).then(function(hit){
      var red = fetch(req).then(function(res){
        if(res && res.status === 200 && res.type === "basic"){
          var copia = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copia); });
        }
        return res;
      }).catch(function(){ return hit; });
      return hit || red;
    })
  );
});
