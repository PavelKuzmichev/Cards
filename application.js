const app = document.querySelector('.app');
const clearElement = (element) => {
    element.textContent = '';
};
window.application = {
    blocks: {},
    screens: {},
    currentDifficulty: 'easy',
    currentRound: [],
    renderScreen: (screen) => {
        // eslint-disable-next-line no-undef
        clearElement(app);
        window.application.timers.forEach((timer) => {
            clearInterval(timer);
        });
        window.application.currentScreen = screen;

        window.application.screens[screen]();
    },
    renderBlock: (blockName, container) =>
        window.application.blocks[blockName](container),
    timers: [],
};
