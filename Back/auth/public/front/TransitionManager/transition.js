class TransitionManager {
    static start(nextPageUrl) {
        const transitionDiv = document.createElement('div');
        transitionDiv.className = 'transition';
        transitionDiv.innerHTML = '<img src="../../../../img/LogoVarCar.svg" alt="Logo">';
        document.body.appendChild(transitionDiv);

        transitionDiv.style.animation = 'fadeIn 1s forwards';
        setTimeout(() => {
            transitionDiv.style.animation = 'fadeOut 1s forwards';
            setTimeout(() => {
                document.body.removeChild(transitionDiv);
                window.location.href = nextPageUrl;
            }, 1000);
        }, 2000);
    }
}

export default TransitionManager;