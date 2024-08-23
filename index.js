document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');  // Seleciona o iframe do vídeo
    const chapters = document.querySelectorAll('.chapter-list li');  // Seleciona todos os itens da lista

    chapters.forEach(chapter => {
        chapter.addEventListener('click', () => {
            const time = chapter.getAttribute('data-time');  // Obtém o tempo do capítulo
            video.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${time}, true]}`, '*');
        });
    });
});
