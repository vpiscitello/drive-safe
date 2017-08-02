(function initEventListeners() {
    var menuButton = document.querySelector('header .menu');

    menuButton.addEventListener('click', openMenuModule, false);

})();

function openMenuModule() {
    var nav = document.getElementsByTagName('nav')[0];

    if (this.classList.contains('open')) {
        this.classList.remove('open');
        nav.classList.remove('open');
        setTimeout(function() {
            nav.classList.remove('visible');
            nav.classList.add('hidden');
        }, 400, nav);
    } else {
        this.classList.add('open');
        nav.classList.remove('hidden');
        nav.classList.add('visible');
        setTimeout(function() {
            nav.classList.add('open');
        }, 10, nav);
    }
}
