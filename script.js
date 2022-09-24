const app = document.querySelector(".app");
const block = window.application.blocks;
const screen = window.application.screens;
const clearElement = (element) => {
    element.textContent = "";
};
//функция создатель-блока
const createElement = (tag, name, textContent, container, callback) => {
    const element = document.createElement(tag);
    element.classList.add(`app__${name}`);
    element.textContent = textContent;
    if (tag === "button") {
        element.addEventListener("click", callback);
    }

    container.appendChild(element);
    return element;
};
const choiceDifLevel = (event) => {
    window.application.currentDifficulty = event.target.value;
};
const startGame = () => {
    window.application.renderScreen("game");
};
const renderPopup = (container) => createElement("div", "popup", "", container);
const renderDifficultyLevelTitle = (container) => createElement("h1", "difficultyLevelTitle", "Выбери сложность", container);
const renderDifficultyLevelStartButton = (container) => createElement("button", "button_start", "Старт", container, startGame);
const renderDifficultyLeveChoiceButtons = (container) => {
    const boxButtons = createElement("div", "buttons", "", container);
    boxButtons.addEventListener('click',(event)=>{
      const buttons = event.target.parentElement.querySelectorAll('button')
      buttons.forEach(button => {
        button.classList.remove('active')
      });
      event.target.classList.add('active')
    })
    const buttonFirst = createElement("button", "button_choice", "1", boxButtons, choiceDifLevel);
    const buttonSecond = createElement("button", "button_choice", "2", boxButtons, choiceDifLevel);
    const buttonThird = createElement("button", "button_choice", "3", boxButtons, choiceDifLevel);
    buttonFirst.value = "easy";
    buttonSecond.value = "average";
    buttonThird.value = "hard";
};
const renderGameScreenTitle = (container) => createElement("h1", "gameScreenTitle", "Игровой экран", container);
const renderDifficultyLevelScreen = () => {
    const popup = window.application.renderBlock("popup", app);
    window.application.renderBlock("difficultyLevelTitle", popup);
    window.application.renderBlock("difficultyLeveChoiceButtons", popup);
    window.application.renderBlock("difficultyLevelStartButton", popup);
};
const renderGameScreen = () =>{
    window.application.renderBlock("gameScreenTitle", app);
}
//блоки
block["popup"] = renderPopup;
block["difficultyLevelTitle"] = renderDifficultyLevelTitle;
block["difficultyLeveChoiceButtons"] = renderDifficultyLeveChoiceButtons;
block["difficultyLevelStartButton"] = renderDifficultyLevelStartButton;
block["gameScreenTitle"] = renderGameScreenTitle;
//экраны
screen["difficultyLevel"] = renderDifficultyLevelScreen;
screen["game"] = renderGameScreen;
//стартовый рендер
window.application.renderScreen("difficultyLevel");
