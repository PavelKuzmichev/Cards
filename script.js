const app = document.querySelector('.app');
const block = window.application.blocks;
const screen = window.application.screens;
/*const clearElement = (element) => {
    element.textContent = '';
};*/
//функция создатель-блока
const createElement = (tag, name, textContent, container, callback) => {
    const element = document.createElement(tag);
    element.classList.add(`app__${name}`);
    element.textContent = textContent;
    if (tag === 'button' || name === 'back' || name === 'front') {
        element.addEventListener('click', callback);
    }

    container.appendChild(element);
    return element;
};
const choiceDifLevel = (event) => {
    window.application.currentDifficulty = event.target.value;
};
const startGame = () => {
    window.application.renderScreen('game');
    setTimeout(() => {
        const cards = app.querySelectorAll('.app__card');
        cards.forEach((card) => {
            card.classList.add('transform');
        });
    }, 5000);
};
const flipCard = (event) => {
    event.target.parentElement.classList.remove('transform');
};

const renderPopup = (container) => createElement('div', 'popup', '', container);
const renderDifficultyLevelTitle = (container) =>
    createElement('h1', 'difficultyLevelTitle', 'Выбери сложность', container);
const renderDifficultyLevelStartButton = (container) =>
    createElement('button', 'button_start', 'Старт', container, startGame);
const renderRestartButton = (container) =>
    createElement(
        'button',
        'button_start',
        'Начать заново',
        container,
        startGame
    );
const renderDifficultyLeveChoiceButtons = (container) => {
    const boxButtons = createElement('div', 'buttons', '', container);
    boxButtons.addEventListener('click', (event) => {
        if (!event.target.classList.contains('app__button_choice')) {
            return;
        }
        const buttons = event.target.parentElement.querySelectorAll('button');
        buttons.forEach((button) => {
            button.classList.remove('app__button_choice_active');
        });
        event.target.classList.add('app__button_choice_active');
    });
    const buttonFirst = createElement(
        'button',
        'button_choice',
        '1',
        boxButtons,
        choiceDifLevel
    );
    const buttonSecond = createElement(
        'button',
        'button_choice',
        '2',
        boxButtons,
        choiceDifLevel
    );
    const buttonThird = createElement(
        'button',
        'button_choice',
        '3',
        boxButtons,
        choiceDifLevel
    );
    buttonFirst.value = 'easy';
    buttonSecond.value = 'average';
    buttonThird.value = 'hard';
};
const renderGameScreenCards = (container) => {
    const cards = createElement('div', 'cards', '', container);
    for (let i = 0; i < 36; i++) {
        const card = createElement('div', 'card', '', cards);
        /*const front = */ createElement('div', 'front', '', card);
        /*const back = */ createElement('div', 'back', '', card, flipCard);
    }
};
const renderGameScreenHeader = (container) =>
    createElement('div', 'header', '', container);
const renderGameScreenTimer = (container) => {
    const box = createElement('div', 'timer', '', container);
    const headerTimer = createElement('div', 'timer-header', '', box);
    createElement('div', 'timer_min', 'min', headerTimer);
    createElement('div', 'timer_sec', 'sec', headerTimer);
    createElement('div', 'timer_value', '00.00', box);
};
const renderDifficultyLevelScreen = () => {
    const popup = window.application.renderBlock('popup', app);
    window.application.renderBlock('difficultyLevelTitle', popup);
    window.application.renderBlock('difficultyLeveChoiceButtons', popup);
    window.application.renderBlock('difficultyLevelStartButton', popup);
};

const renderGameScreen = () => {
    const header = window.application.renderBlock('gameScreenHeader', app);
    window.application.renderBlock('gameScreenTimer', header);
    window.application.renderBlock('restartButton', header);
    window.application.renderBlock('gameScreenCards', app);
};
//блоки
block['popup'] = renderPopup;
block['difficultyLevelTitle'] = renderDifficultyLevelTitle;
block['difficultyLeveChoiceButtons'] = renderDifficultyLeveChoiceButtons;
block['difficultyLevelStartButton'] = renderDifficultyLevelStartButton;
block['restartButton'] = renderRestartButton;
block['gameScreenTimer'] = renderGameScreenTimer;
block['gameScreenHeader'] = renderGameScreenHeader;
block['gameScreenCards'] = renderGameScreenCards;
//экраны
screen['difficultyLevel'] = renderDifficultyLevelScreen;
screen['game'] = renderGameScreen;
//стартовый рендер
/*const cards = {
    suit: [spades, clubs, diamonds, hearts],
    rank: ['A','K','Q','J', 10, 9, 8, 7, 6 ] 
}*/
window.application.renderScreen('difficultyLevel');
