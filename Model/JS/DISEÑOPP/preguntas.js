(function(){
    const Titulopreguntas = [...document.querySelectorAll('.titulo_pregunta')]

    Titulopreguntas.forEach(pregunta => {
        pregunta.addEventListener('click', () => {
            let height = 0;
            let respuesta = pregunta.nextElementSibling;
            let addPadding = pregunta.parentElement.parentElement

            addPadding.classList.toggle('preguntas_padding--add')
            pregunta.children[0].classList.toggle('preguntas_arrow--rotate');

            if(respuesta.clientHeight === 0)
            {
                height=respuesta.scrollHeight;
            }

            respuesta.style.height = `${height}px`;
        })
    })
})();