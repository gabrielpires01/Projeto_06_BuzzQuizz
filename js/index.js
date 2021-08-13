const url = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes';
let title;
let img;
let quantity;
let levels;
let questions;
let levelsArr;
let hex = /^#([0-9a-f]{3}){1,2}$/i;

const createQuizz = () => {
    document.querySelector('.list').classList.add('hidden')
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

    if ((title === "" || !isNaN(title)) || !isValidHttpUrl(img) || (levels === ""  || isNaN(levels)) || (quantity === "" ||isNaN(quantity)) ) {
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
            <p class="alert2 hidden">Preencha todos os campos necessarios</p>
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
    element.classList.add('hidden')
    answer.classList.toggle('hidden')
}

const getQuestionsValues = () => {
    questions = [];
    for (let i=1; i <= quantity; i++) {
        let answers = [];
        const questTxt = document.querySelector(`.text${i}`).value === "" ? false: document.querySelector(`.text${i}`).value;
        const color = document.querySelector(`.back-color${i}`).value === "" ? false: document.querySelector(`.back-color${i}`).value;
        const text = document.querySelector(`.correct${i}`).value  === "" ? false: document.querySelector(`.correct${i}`).value;
        const questionImgUrl = document.querySelector(`.url${i}`).value   === "" ? false: document.querySelector(`.url${i}`).value;
        
        answers.push({
            text,
            image: questionImgUrl,
            isCorrectAnswer:true
        })
        answers = incorrectAnswers(answers,i);
        if (!questTxt || !color || !hex.test(color) || !text || !url || !answers || !isValidHttpUrl(questionImgUrl)){
            document.querySelector('.alert2').classList.remove('hidden')
            return
        }
        let question = {
            title:questTxt,
            color,
            answers
        }
        questions.push(question)
    }

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
                    <input id="level-text${i}" minlength="10" type="text" placeholder="Título do nível"></input>
                    <input id="level-percent${i}" type="number" max="100" placeholder="% de acerto mínima"></input>
                    <input id="level-img-url${i}" type="url" placeholder="URL da imagem do nível"></input>
                    <input id="level-descrip${i}" minlength="30" type="text" placeholder="Descrição do nível"></input>
                </div>
            </div>`
        document.querySelector('.levelsCreation').innerHTML += level
    }
}

const getLevelsValues = () => {
    levelsArr = [];
    for (let i= 1; i <= levels; i++) {
        const text = document.getElementById(`level-text${i}`).value;
        const percent = document.getElementById(`level-percent${i}`).value;
        const imgUrl = document.getElementById(`level-img-url${i}`).value;
        const descript = document.getElementById(`level-descrip${i}`).value;

        let level = {
            title: text,
            image: imgUrl,
            text: descript,
            minValue: Number(percent)
        }
        levelsArr.push(level)
    }
    renderPostforQuizz()
}

const renderPostforQuizz = () => {
    const quizz = {
        title,
        image: img,
        questions,
        levels: levelsArr
    }
    finalScreen(quizz)
    postQuizz(quizz)
}

const finalScreen = quizz => {
    document.querySelector('.third-step').classList.add('hidden');
    document.querySelector('.final-step').classList.remove('hidden');

    const quizzImg = `
        <img src=${quizz.image}>
        <div class="quizzTitle">${quizz.title}</div>
    `;
    document.querySelector('.final-step .yourQuizz').innerHTML = quizzImg;
    //document.querySelector('.yourQuizzes').innerHTML += `<li class="yourQuizz quizz">${quizzImg}</li>`;
}

const getHomeScreem = () => {
    document.querySelector('.final-step').classList.add('hidden');
    document.querySelector('.none').classList.add('hidden');
    document.querySelector('.list').classList.remove('hidden');
    document.querySelector('.created').classList.remove('hidden');
    document.querySelector('.quizzesList').classList.remove('hidden');
    document.querySelector('.userQuizzes').style.border = 'none'
}

const yourQuizzesList = response => {
    let itemList = JSON.parse(localStorage.getItem('id'));
    if (!itemList) {
        itemList = [];
    }
    itemList.push(response.data.id)
    localStorage.setItem('id',JSON.stringify(itemList));
    getQuizz(renderYourQuizzes)
}

/*Maybe Useful functions (can be adapted) */
const incorrectAnswers = (answers, index) => {
    for (let i = 1; i <= 3; i++ ) {
        const text = document.querySelector(`#incorrect${i}-${index}`).value;
        const url = document.querySelector(`#url${i}-${index}`).value;
        if (i === 1 && (text === "" || url === "")){
            document.querySelector('.alert2').classList.remove('hidden')
            return false
        }
        if (text != "" || url != "") {
            answers.push({
                text,
                image: url,
                isCorrectAnswer:false
            })
        }
    }
    return answers
}

function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
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

const quizzesRenderer = (res) => {
    let quizz = res.data
    const localArr = JSON.parse(localStorage.getItem('id'));
    for (let i = 0; i < quizz.length; i++){
        if (!localArr.includes(quizz[i].id)) {
            const quizzes = `<div class="quizz">
            <img src=${quizz[i].image}>
            <div class="quizzTitle"><strong>${quizz[i].title}</strong></div>
        </div>`
            document.querySelector(".quizzes").innerHTML += quizzes;
        }
        
    };
    
};

/*Requests */
const getQuizz = (func) =>{
    const promisse = axios.get(url)
    promisse.then(func).catch(alert)
}
const postQuizz = obj => {
    const promise = axios.post(url,obj)
    promise.then(yourQuizzesList).catch(alert)
}


const renderYourQuizzes = response => {
    const quizzArr = response.data;
    const localArr = JSON.parse(localStorage.getItem('id'));
    
    if((localArr != [] || localArr != undefined) && localArr != null) {
        document.querySelector('.none').classList.add('hidden');
        document.querySelector('.quizzesList').classList.remove('hidden');
        document.querySelector('.userQuizzes').style.border = 'none'
    } else {
        return
    }
    for(let i =0;i < localArr.length; i++) {
        const isMatch = quizzArr.find(element => element.id === localArr[i])
        if(isMatch != undefined) {
            const quizzImg = `
                <img src=${isMatch.image}>
                <div class="quizzTitle">${isMatch.title}</div>
            `;
            document.querySelector('.yourQuizzes').innerHTML += `<li class="yourQuizz quizz">${quizzImg}</li>`;
        }
    }
}

getQuizz(renderYourQuizzes)
getQuizz(quizzesRenderer)