function startQuiz(quizType){
    alert(`Starting ${quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz!`);
    // redirecting to the corresponding quiz page based on the selected type 
    window.location.href=`./${quizType}.html`;
}       