const clearElement = (element) => {
    element.textContent = '';
};

window.application = {
    blocks: {},
    screens: {},
    currentDifficulty: 'easy',
    renderScreen: (screen) => {
        if (window.application.currentScreen === screen) {
            return;
        }
        // eslint-disable-next-line no-undef
        clearElement(app);

        window.application.currentScreen = screen;

        window.application.screens[screen]();
    },
    renderBlock: (blockName, container) =>
        window.application.blocks[blockName](container),
};
