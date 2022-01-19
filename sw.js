const cacheName = 'rental-template';
const fileNames = [
    '/',
    'index.html',
    'sw.js',
    'manifest.json',
    // 'css/all.min.css',
    'js/script.js',
    'images/livingroom.jpg',
    'images/offline-img.png'
]

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
}
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then((cach)=>{
            return cach.addAll(fileNames)
        })
    )
})

self.addEventListener('activate',(e)=>{
    console.log('data loaded',e);
})
self.addEventListener('fetch',(e)=>{
    e.respondWith(
        caches.match(e.request).then((res)=>{
            return res || fetch(e.request)
        }).catch((err)=>{
            return caches.match('./images/offline-img.png')
        })
    )
})