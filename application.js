window.application = {
    blocks: {},
    screens: {},
    currentDifficulty: 'easy',
    renderScreen: (screen) => {
        if (window.application.currentScreen === screen) {
            return;
        }
        clearElement(app);

        window.application.currentScreen = screen;

        window.application.screens[screen]();
    },
    renderBlock: (blockName, container) => block[blockName](container),
};