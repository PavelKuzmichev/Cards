import './styles/style.css';
import './application';
import { cardsImages } from './importImgCards';
import { container } from 'webpack';
import winImage from '../images/winImage.png';
import loseImage from '../images/loseImage.png';
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
    let cardsForGame: string[] = [];
    const difficult =
        window.application.currentDifficulty[
            window.application.currentDifficulty.length - 1
        ];
    for (let i = 0; i < difficult; i++) {
        const suit: string =
            cards.suit[Math.floor(Math.random() * cards.suit.length)];
        const rank: string = String(
            cards.rank[Math.floor(Math.random() * cards.rank.length)]
        );

        if (!cardsForGame.includes(suit + rank)) {
            cardsForGame.push(suit + rank);
        } else {
            i--;
        }
    }
    cardsForGame = cardsForGame.concat(cardsForGame);
    return cardsForGame.sort(() => Math.random() - 0.5);
};

const setTimer = (interval: number, func: () => void) => {
    window.application.timers.push(
        setInterval(() => {
            func();
        }, interval)
    );
};
const stopTimer = () => {
    window.application.timers.forEach((timer: string) => {
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
        window.application.currentRoundResult = 'lose';
        stopTimer();
        loseGame();
    } else {
        if (!app) {
            return;
        }
        const cards = app.querySelectorAll('.transform');
        if (cards.length === 0) {
            stopTimer();
            window.application.currentRoundResult = 'win';
            setTimeout(() => {
                winGame();
            }, 500);
        }
    }

    window.application.currentRound = [];
};

const startingTimer = (start: number) => {
    const interval = Math.floor((Date.now() - start) / 1000);
    const seconds = interval % 60 < 10 ? `0${interval % 60}` : interval % 60;
    const minutes =
        Math.floor(interval / 60) < 10
            ? `0${Math.floor(interval / 60)}`
            : Math.floor(interval / 60);
    const currentTime = `${minutes}.${seconds}`;

    const timerValue = document.querySelector('.app__timer_value');
    if (!timerValue) {
        return;
    }
    timerValue.textContent = currentTime;
    window.application.currentTime = currentTime;
};

//функция создатель-блока
const createElement = (
    tag: string,
    name: string,
    textContent: string,
    container: Element,
    callback?: any
) => {
    const element = document.createElement(tag);
    element.classList.add(`app__${name}`);
    element.textContent = textContent;
    if (tag === 'button' || name === 'back' || name === 'front') {
        element.addEventListener('click', callback);
    }

    container.appendChild(element);
    return element;
};
const choiceDifLevel = (event: MouseEvent) => {
    const target = event.target as HTMLTextAreaElement | null;
    window.application.currentDifficulty = target?.dataset.value;
};
const hideCards = () => {
    window.application.hideCardsTimer;
    if (!app) {
        return;
    }
    window.application.hideCardsTimer = setTimeout(() => {
        const start: number = Date.now();
        setTimer(1000, () => startingTimer(start));
        const cards = app.querySelectorAll('.app__card');
        cards.forEach((card) => {
            card.classList.add('transform');
        });
    }, 5000);
};

const startGame = () => {
    window.application.renderScreen('game');
    const wall = document.querySelector('.app__wall');
    wall?.classList.add('app__wall_non-active');
    clearInterval(window.application.hideCardsTimer);
    hideCards();
};

const flipCard = (event: MouseEvent, value: string) => {
    const target = event.target as HTMLElement;
    target.parentElement?.classList.remove('transform');
    window.application.currentRound.push(value);
    gameRound();
};

const winGame = () => {
    renderEndGameScreen('win');
    const imageWin = document.querySelector(
        '.app__endGameImageWin'
    ) as HTMLImageElement;
    if (imageWin) {
        imageWin.src = winImage;
    }
    const wall = document.querySelector('.app__wall')
    wall?.classList.remove('app__wall_non-active')
};
const loseGame = () => {
    if (!app) {
        return;
    }

    renderEndGameScreen('lose');
    const imageLose = document.querySelector(
        '.app__endGameImageLose'
    ) as HTMLImageElement;
    if (imageLose) {
        imageLose.src = loseImage;
    }
    const cards = app.querySelectorAll('.transform');
    cards.forEach((card) => card.classList.remove('transform'));
    const wall = document.querySelector('.app__wall')
    
    wall?.classList.remove('app__wall_non-active')
};
const renderEndGameTitleLose = (container: Element) => {
    createElement('h1', 'endGameTitleLose', 'Вы проиграли!', container);
};
const renderEndGameTitleWin = (container: Element) => {
    createElement('h1', 'endGameTitleWin', 'Вы выиграли!', container);
};
const renderEndGameImageLose = (container: Element) => {
    createElement('img', 'endGameImageLose', '', container);
};
const renderEndGameImageWin = (container: Element) => {
    createElement('img', 'endGameImageWin', '', container);
};
const renderEndGameRestartButton = (container: Element) =>
    createElement(
        'button',
        'button_start',
        'Играть снова',
        container,
        restartGame
    );
const renderEndGameText = (container: Element) => {
    createElement('p', 'endGameText', 'Затраченное время:', container);
};
const renderEndGameTimer = (container: Element) => {
    createElement(
        'p',
        'endGameTimer',
        window.application.currentTime,
        container
    );
};
const renderWall = (container: Element) => {
    createElement('div', 'wall', '', container);
};
const renderPopup = (container: Element) =>
    createElement('div', 'popup', '', container);
const renderDifficultyLevelTitle = (container: Element) =>
    createElement('h1', 'difficultyLevelTitle', 'Выбери сложность', container);
const renderDifficultyLevelStartButton = (container: Element) =>
    createElement('button', 'button_start', 'Старт', container, startGame);
const renderRestartButton = (container: Element) =>
    createElement(
        'button',
        'button_start',
        'Начать заново',
        container,
        restartGame
    );
const renderDifficultyLeveChoiceButtons = (container: Element) => {
    const boxButtons = createElement('div', 'buttons', '', container);
    if (!boxButtons) {
        return;
    }
    boxButtons.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (!target.classList.contains('app__button_choice')) {
            return;
        }

        const buttons = target.parentElement?.querySelectorAll('button');
        buttons?.forEach((button) => {
            button.classList.remove('app__button_choice_active');
        });
        target.classList.add('app__button_choice_active');
    });
    const buttonFirst = createElement(
        'button',
        'button_choice',
        '1',
        boxButtons,
        choiceDifLevel
    ) as HTMLElement;
    const buttonSecond = createElement(
        'button',
        'button_choice',
        '2',
        boxButtons,
        choiceDifLevel
    ) as HTMLElement;
    const buttonThird = createElement(
        'button',
        'button_choice',
        '3',
        boxButtons,
        choiceDifLevel
    ) as HTMLElement;

    buttonFirst.dataset.value = 'easy-3';
    buttonSecond.dataset.value = 'average-6';
    buttonThird.dataset.value = 'hard-9';
};
const renderGameScreenCards = (container: Element) => {
    const cards = createElement('div', 'cards', '', container) as HTMLElement;
    const randomCards = createCardsForGame();
    const quantityCards =
        window.application.currentDifficulty[
            window.application.currentDifficulty.length - 1
        ] * 2;

    for (let i = 0; i < quantityCards; i++) {
        const card = createElement('div', 'card', '', cards) as HTMLElement;
        const front = createElement('div', 'front', ``, card);
        front.style.backgroundImage = `url(../images/${randomCards[i]}.png)`;
        const backSide = createElement(
            'div',
            'back',
            '',
            card,
            (event: MouseEvent) => flipCard(event, randomCards[i])
        ) as HTMLElement;
        backSide.style.backgroundImage = `url(${cardsImages[0]})`;
    }
};
const renderGameScreenHeader = (container: Element) =>
    createElement('div', 'header', '', container);
const renderGameScreenTimer = (container: Element) => {
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
    const wall = window.application.renderBlock('wall', app);
};
const renderEndGameScreen = (result: string) => {
    const wall = document.querySelector('.app__wall');
    wall?.classList.remove('app_wall_non-active');
    const popup = window.application.renderBlock('popup', wall);
    if (result === 'win') {
        window.application.renderBlock('endGameImageWin', popup);
        window.application.renderBlock('endGameTitleWin', popup);
    } else if (result === 'lose') {
        window.application.renderBlock('endGameImageLose', popup);
        window.application.renderBlock('endGameTitleLose', popup);
    }
    window.application.renderBlock('endGameText', popup);
    window.application.renderBlock('endGameTimer', popup);
    window.application.renderBlock('endGameRestartButton', popup);
};
//блоки
block['popup'] = renderPopup;
block['wall'] = renderWall;
block['endGameTitleLose'] = renderEndGameTitleLose;
block['endGameTitleWin'] = renderEndGameTitleWin;
block['endGameImageLose'] = renderEndGameImageLose;
block['endGameImageWin'] = renderEndGameImageWin;
block['endGameRestartButton'] = renderEndGameRestartButton;
block['endGameText'] = renderEndGameText;
block['endGameTimer'] = renderEndGameTimer;
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
screen['endGame'] = renderEndGameScreen;
//стартовый рендер

window.application.renderScreen('difficultyLevel');
