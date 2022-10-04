const app = document.querySelector('.app');
const block = window.application.blocks;
const screen = window.application.screens;

// eslint-disable-next-line no-unused-vars
const clearElement = (element) => {
    element.textContent = '';
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
const startGame = () => {
    window.application.renderScreen('game');
    setTimeout(() => {
        const cards = app.querySelectorAll('.app__card');
        cards.forEach((card) => {
            card.classList.add('transform');
        });
    }, 5000);
    const start = new Date();
    setInterval(() => {
        const currentTime = new Date();
        const gameTime = {
            minutes: currentTime.getSeconds() - start.getSeconds(),
            seconds: currentTime.getSeconds() - start.getSeconds(),
        };
        document.querySelector(
            '.app__timer_value'
        ).textContent = `00:${gameTime.seconds}`;
    }, 1000);
};
const flipCard = (event) => {
    event.target.parentElement.classList.remove('transform');
    window.application.currentRound.push(event.target.textContent);

    if (window.application.currentRound.length >= 2) {
        if (
            window.application.currentRound[0] !==
            window.application.currentRound[1]
        ) {
            alert('lose');
        } else {
            const cards = app.querySelectorAll('.transform');
            cards.length === 0 ? alert('win') : '';
        }

        window.application.currentRound = [];
    }
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
    const randomCards = createCardsForGame();
    const difficult =
        window.application.currentDifficulty === 'easy'
            ? 6
            : window.application.currentDifficulty === 'average'
            ? 12
            : 18;
    for (let i = 0; i < difficult; i++) {
        const card = createElement('div', 'card', '', cards);
        const front = createElement('div', 'front', ``, card);
        front.style.backgroundImage = `url(../images/${randomCards[i]}.png)`;
        /*const back = */ createElement(
            'div',
            'back',
            `${randomCards[i]}`,
            card,
            flipCard
        );
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
const cards = {
    suit: ['spades', 'clubs', 'diamonds', 'hearts'],
    rank: ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6],
};
const createCardsForGame = () => {
    let cardsForGame = [];
    const difficult =
        window.application.currentDifficulty === 'easy'
            ? 3
            : window.application.currentDifficulty === 'average'
            ? 6
            : 9;
    for (let i = 0; i < difficult; i++) {
        const suit = cards.suit[Math.floor(Math.random() * cards.suit.length)];
        const rank = cards.rank[Math.floor(Math.random() * cards.rank.length)];
        if (!cardsForGame.includes(suit + rank)) {
            cardsForGame.push(suit + rank);
            console.log(cardsForGame);
        } else {
            i--;
        }
    }
    cardsForGame = cardsForGame.concat(cardsForGame);
    return cardsForGame.sort(() => Math.random() - 0.5);
};
window.application.renderScreen('difficultyLevel');
