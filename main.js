// Service Worker

if('serviceWorker' in navigator){
    console.log('puedes usar los service woker');

    navigator.serviceWorker.register('./sw.js')
                        .then(res => console.log('Service worker cargado correctamente', res))
                        .catch(err => console.log('No se ha podido registrar service worker', err));
}else{
    console.log('NO puedes usar los service woker');
}


// scroll Suavizado
$(document).ready(function(){
    $("#menu a").click(function(e){
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        });

        return false;
    })
});