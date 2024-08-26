document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const chapters = document.querySelectorAll('.chapter-list li');

    // Recuperar o tempo salvo ao carregar a página
    const savedTime = localStorage.getItem('videoTime');
    if (savedTime) {
        video.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${savedTime}, true]}`, '*');
    }

    // Salvar o tempo do vídeo no localStorage quando for pausado ou antes de sair da página
    window.addEventListener('beforeunload', () => {
        video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        video.contentWindow.postMessage('{"event":"command","func":"getCurrentTime","args":""}', '*');
    });

    // Ouvir as mensagens do iframe do YouTube
    window.addEventListener('message', (event) => {
        if (event.data && event.data.event === 'infoDelivery' && event.data.info !== undefined) {
            localStorage.setItem('videoTime', event.data.info);
        }
    });

    // Navegar para o tempo correto quando um capítulo for clicado
    chapters.forEach(chapter => {
        chapter.addEventListener('click', () => {
            const time = chapter.getAttribute('data-time');
            video.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${time}, true]}`, '*');
        });
    });
});
