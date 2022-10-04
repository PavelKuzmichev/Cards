import './styles/style.css';
import '../application.js'
import '../importImgCards.js'
const app = document.querySelector('.app');
const block = window.application.blocks;
const screen = window.application.screens;

const cards = {
    suit: ['spades', 'diamonds', 'diamonds', 'hearts'],
    rank: ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6],
};
const restartGame = () => {
    window.application.renderScreen('difficultyLevel');
};
const createCardsForGame = () => {
    let cardsForGame = [];
    const difficult =
        window.application.currentDifficulty[
            window.application.currentDifficulty.length - 1
        ];
    for (let i = 0; i < difficult; i++) {
        const suit = cards.suit[Math.floor(Math.random() * cards.suit.length)];
        const rank = cards.rank[Math.floor(Math.random() * cards.rank.length)];
        if (!cardsForGame.includes(suit + rank)) {
            cardsForGame.push(suit + rank);
        } else {
            i--;
        }
    }
    cardsForGame = cardsForGame.concat(cardsForGame);
    return cardsForGame.sort(() => Math.random() - 0.5);
};


const setTimer = (interval, func) => {
    window.application.timers.push(
        setInterval(() => {
            func();
        }, interval)
    );
};
const stopTimer = () => {
    window.application.timers.forEach((timer) => {
        clearInterval(timer);
    });
};
const gameRound = () => {
    if (window.application.currentRound.length < 2) {
        return;
    }

    if (
        window.application.currentRound[0] !==
        window.application.currentRound[1]
    ) {
        stopTimer();
        loseGame();
    } else {
        const cards = app.querySelectorAll('.transform');
        if (cards.length === 0) {
            stopTimer();
            setTimeout(() => {
                winGame();
            }, 500);
        }
    }

    window.application.currentRound = [];
};
const startingTimer = (start) => {
    const interval = Math.floor((Date.now() - start) / 1000);
    const seconds = interval % 60 < 10 ? `0${interval % 60}` : interval % 60;
    const minutes =
        Math.floor(interval / 60) < 10
            ? `0${Math.floor(interval / 60)}`
            : Math.floor(interval / 60);
    const currentTime = `${minutes}.${seconds}`;

    document.querySelector('.app__timer_value').textContent = currentTime;
    window.application.currentTime = currentTime;
};
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
const hideCards = (time) => {
    setTimeout(() => {
        const cards = app.querySelectorAll('.app__card');
        cards.forEach((card) => {
            card.classList.add('transform');
        });
    }, time);
};
const startGame = () => {
    window.application.renderScreen('game');
    hideCards(5000);
    setTimeout(() => {
        const start = new Date();
        setTimer(1000, () => startingTimer(start));
    }, 5000);
};
const flipCard = (event, value) => {
    event.target.parentElement.classList.remove('transform');
    window.application.currentRound.push(value);
    gameRound();
};

const winGame = () => {
    alert(`Вы выиграли! время: ${window.application.currentTime}`);
};
const loseGame = () => {
    const cards = app.querySelectorAll('.transform');
    cards.forEach((card) => card.classList.remove('transform'));
    alert('Вы проиграли!');
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
        restartGame
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
    buttonFirst.value = 'easy-3';
    buttonSecond.value = 'average-6';
    buttonThird.value = 'hard-9';
};
const renderGameScreenCards = (container) => {
    const cards = createElement('div', 'cards', '', container);
    const randomCards = createCardsForGame();
    const quantityCards =
        window.application.currentDifficulty[
            window.application.currentDifficulty.length - 1
        ] * 2;

    for (let i = 0; i < quantityCards; i++) {
        const card = createElement('div', 'card', '', cards);
        const front = createElement('div', 'front', ``, card);
        front.style.backgroundImage = `url(../images/${randomCards[i]}.png)`;
        const back = createElement('div', 'back', '', card, (event) =>
            flipCard(event, randomCards[i])
        );
        back.style.backgroundImage = `url(../images/back.png)`;
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

window.application.renderScreen('difficultyLevel');
