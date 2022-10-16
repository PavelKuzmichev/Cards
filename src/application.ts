const app: Element | null = document.querySelector('.app');
const clearElement = (element: Element) => {
    element.textContent = '';
};
window.application = {
    blocks: {},
    screens: {},
    currentDifficulty: 'easy',
    currentRound: [],
    renderScreen: (screen: string) => {
        // eslint-disable-next-line no-undef
        if (!app) {
            return;
        }
        clearElement(app);
        window.application.timers.forEach((timer: string) => {
            console.log(timer);
            clearInterval(timer);
        });
        window.application.currentScreen = screen;

        window.application.screens[screen]();
    },
    renderBlock: (blockName: string, container: string) =>
        window.application.blocks[blockName](container),
    timers: [],
};
