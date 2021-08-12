const url = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes';
let title;
let img;
let quantity;
let levels;
let questions;

const createQuizz = () => {
    document.querySelector('.container').classList.add('hidden')
    document.querySelector('.quizzCreation').classList.remove('hidden')
    title;
    img;
    quantity;
    levels;
    questions;
}

/*Initial Quizz Creation */
const getFirstValues = () => {
    title = document.querySelector('#title').value;
    img = document.querySelector('#quizz-img-url').value;
    quantity = Number(document.querySelector('#quantity').value);
    levels = Number(document.querySelector('#levels').value);

    if ((title === "" || !isNaN(title)) || (img === "" || !isNaN(img)) || (levels === ""  || isNaN(levels)) || (quantity === "" ||isNaN(quantity)) ) {
        document.querySelector('.alert').classList.remove('hidden')
        return
    }
    document.querySelector('.start').classList.add('hidden')
    document.querySelector('.second-step').classList.remove('hidden')

    questionsPage()
}
/*Questions Page Creation */
const questionsPage = () => {
    for(let i = 1; i <= quantity; i++) {
        const pergunta = `
        <div class="question" id='question${i}'>
            <p class="alert2 hidden">Preencha todos os campos</p>
            <div class="pop"><strong>Pergunta ${i}</strong> <ion-icon name="open-outline" onclick="questionSelect(this)"></ion-icon></div>
            <div class="answers hidden">
                <input class="text${i}" placeholder="Texto da pergunta"></input>
                <input class="back-color${i}" placeholder="Cor de fundo da pergunta"></input>
                <strong>Resposta Correta</strong>
                <input class="correct${i}" placeholder="Resposta correta"></input>
                <input class="url${i}" placeholder="URL da imagem"></input>
                <strong>Resposta Incorreta</strong>
                ${creatingInputs('questions',i)}
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

const getQuestionsValues = () => {
    questions = [];
    for (let i=1; i <= quantity; i++) {
        let answers = [];
        const questTxt = document.querySelector(`.text${i}`).value;
        const color = document.querySelector(`.back-color${i}`).value;
        const text = document.querySelector(`.correct${i}`).value;
        const url = document.querySelector(`.url${i}`).value;
        answers.push({
            text,
            image: url,
            isCorrextAnswer:true
        })
        answers = incorrectAnswers(answers,i)
        let question = {
            title:questTxt,
            color,
            answers
        }
        questions.push(question)
    }
    console.log(questions)

    levelsPage()
}

/*Levels Page Creation */
const levelsPage = () => {
    document.querySelector('.second-step').classList.add('hidden')
    document.querySelector('.third-step').classList.remove('hidden')

    for (let i = 1; i <= levels; i++) {
        const level = `
            <div class="level">
                <div class="pop"><strong>Nível ${i}</strong> <ion-icon name="open-outline" onclick="questionSelect(this)"></ion-icon></div>
                <div class="answers hidden">
                    <input id="level-text${i}" minlength="20" maxlength="65" type="text" placeholder="Título do seu quizz"></input>
                    <input id="level-percent${i}" type="number" placeholder="URL da imagem do quizz"></input>
                    <input id="level-img-url${i}" type="url" placeholder="Título do seu quizz"></input>
                    <input id="level-descrip${i}" type="text" placeholder="URL da imagem do quizz"></input>
                </div>
            </div>`

        document.querySelector('.levelsCreation').innerHTML += level
    }
}

/*Maybe Useful functions (can be adapted) */
const incorrectAnswers = (answers, index) => {
    for (let i = 1; i <= 3; i++ ) {
        const text = document.querySelector(`#incorrect${i}-${index}`).value;
        const url = document.querySelector(`#url${i}-${index}`).value;
        if (text != "" || url != "") {
            answers.push({
                text,
                image: url,
                isCorrextAnswer:false
            })
        }
    } 
    return answers
}

const creatingInputs = (inputType ,index) => {
    let inputs = '';
    for (let i = 1; i < 4; i++) {
        if (inputType === "questions") {
            inputs += `
                <input id="incorrect${i}-${index}" minlength="20" maxlength="65" type="text" placeholder="Resposta incorreta ${i}"></input>
                <input id="url${i}-${index}" type="url" placeholder="URL da imagem ${i}"></input>
            `
        }
    }
    return inputs
}

const checkingValues = () => {

}

const quizz = {
    title,
    image: img,
    questions,
    levels: []
}

const quizzesRenderer = (res) => {
    for (let i = 0; i > res.data.length; i++){
        const quizzes = `<div class="quizz">
        <img src=${res.data.image}>
        <div class="quizzTitle"><strong>${res.data.title}</strong></div>
    </div>`
        document.querySelector(".quizzes").innerHTML += quizzes;
    };
    
};
