const url = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes';
let title;
let img;
let quantity;
let levels;
let questions;

const createQuizz = () => {
    document.querySelector('.container').classList.add('hidden')
    document.querySelector('.quizzCreation').classList.remove('hidden')
}

const questionsPage = () => {
    title = document.querySelector('#title').value;
    img = document.querySelector('#quizz-img-url').value;
    quantity = Number(document.querySelector('#quantity').value);
    levels = Number(document.querySelector('#levels').value);

    if ((title === "" || !isNaN(title)) || img === "" || quantity === "" || levels === "" || isNaN(quantity)|| isNaN(levels)) {
        document.querySelector('.alert').classList.remove('hidden')
        return
    }
    document.querySelector('.start').classList.add('hidden')
    document.querySelector('.second-step').classList.remove('hidden')

    for(let i = 1; i <= quantity; i++) {
        const pergunta = `
        <div class="question" id='question${i}'>
            <div class="pop"><strong>Pergunta ${i}</strong> <ion-icon name="open-outline" onclick="questionSelect(this)"></ion-icon></div>
            <div class="answers hidden">
                <textarea class="text${i}" rows="1" placeholder="Texto da pergunta"></textarea>
                <textarea class="back-color${i}" rows="1" placeholder="Cor de fundo da pergunta"></textarea>
                <strong>Resposta Correta</strong>
                <textarea class="correct-${i}" rows="1" placeholder="Resposta correta"></textarea>
                <textarea class="url${i}" rows="1" placeholder="URL da imagem"></textarea>
                <strong>Resposta Incorreta</strong>
                <textarea class="incorrect1-${i}" rows="1" placeholder="Resposta incorreta 1"></textarea>
                <textarea class="url2-${i}" rows="1" placeholder="URL da imagem 1"></textarea>
                <textarea class="incorrect2-${i}" rows="1" placeholder="Resposta incorreta 2"></textarea>
                <textarea class="url3-${i}" rows="1" placeholder="URL da imagem 2"></textarea>
                <textarea class="incorrect3-${i}" rows="1" placeholder="Resposta incorreta 3"></textarea>
                <textarea class="url4-${i}" rows="1" placeholder="URL da imagem 3"></textarea>
            </div>
        </div>`

        document.querySelector('.questionsCreation').innerHTML += pergunta
    }
}

const questionSelect = element => {
    const parentelement = element.parentElement.parentElement;
    const answer = parentelement.querySelector('.answers');
    answer.classList.toggle('hidden')
}

const levelsPage = () => {
    questions = []
    for (let i=1; i <= quantity; i++) {
        const questTxt = document.querySelector(`.text${i}`).value;
        const backColor = document.querySelector(`.back-color${i}`).value;
        const correct = document.querySelector(`.correct${i}`).value;
        const url = document.querySelector(`.url${i}`).value;
        const incorrect1 = document.querySelector(`.incorrect1-${i}`).value;
        const url1 = document.querySelector(`.url1-${i}`).value;
        const incorrect2 = document.querySelector(`.incorrect2-${i}`).value;
        const url2 = document.querySelector(`.url2-${i}`).value;
        const incorrect3 = document.querySelector(`.incorrect3-${i}`).value;
        const url3 = document.querySelector(`.url3-${i}`).value;
        let question = {
            title:questTxt,
            image:backColor,
            answers: [
                {
                    text: correct,
                    image: url,
                    isCorrextAnswer:true
                },
                {
                    text: incorrect1,
                    image: url1,
                    isCorrextAnswer:false
                },
                {
                    text: incorrect2,
                    image: url2,
                    isCorrextAnswer:false
                },
                {
                    text: incorrect3,
                    image: url3,
                    isCorrextAnswer:false
                }
            ]
        }
        questions.push(question)
    }


}

const quizz = {
    title,
    image: img,
    questions,
    levels: []
}