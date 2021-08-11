const url = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes';

const createQuizz = () => {
    document.querySelector('.container').classList.add('hidden')
    document.querySelector('.quizzCreation').classList.remove('hidden')
}

const questionsPage = () => {
    const title = document.querySelector('#title').value;
    const img = document.querySelector('#quizz-img-url').value;
    const quantity = Number(document.querySelector('#quantity').value);
    const levels = Number(document.querySelector('#levels').value);

    if (title === "" || img === "" || quantity === "" || levels === "" || isNaN(quantity)|| isNaN(levels)) {
        document.querySelector('.alert').classList.remove('hidden')
        return
    }
    document.querySelector('.start').classList.add('hidden')

    for(let i = 1; i <= quantity; i++) {
        const pergunta = `<div class="question" id='question${i}'>
            <strong>Pergunta ${i}</strong>
            <textarea class="text" rows="1" placeholder="Texto da pergunta"></textarea>
            <textarea class="back-color" rows="1" placeholder="Cor de fundo da pergunta"></textarea>
            <strong>Resposta Correta</strong>
            <textarea class="correct" rows="1" placeholder="Resposta correta"></textarea>
            <textarea class="url1" rows="1" placeholder="URL da imagem"></textarea>
            <strong>Resposta Incorreta</strong>
            <textarea class="incorrect" rows="1" placeholder="Resposta incorreta 1"></textarea>
            <textarea class="url2" rows="1" placeholder="URL da imagem 1"></textarea>
            <textarea class="incorrect" rows="1" placeholder="Resposta incorreta 2"></textarea>
            <textarea class="url3" rows="1" placeholder="URL da imagem 2"></textarea>
            <textarea class="incorrect" rows="1" placeholder="Resposta incorreta 3"></textarea>
            <textarea class="url4" rows="1" placeholder="URL da imagem 3"></textarea>
        </div>`

        document.querySelector('.questionsCreation').innerHTML += pergunta
    }
}