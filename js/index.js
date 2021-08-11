const URL_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes"
let allQuizzes = axios.get(URL_QUIZZES)
allQuizzes.then(loadQuizzes)
function loadQuizzes(res){
    const quizzes = res.data
    console.log(quizzes);
    for (let i = 0; i < quizzes.length; i++){

    }
    
}