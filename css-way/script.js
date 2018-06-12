const _C = document.querySelector('.container'),
    N = _C.children.length;

let x0 = null;
let i = 0;


let locked = false;
let w;

function size() { w = window.innerWidth };

function lock(e) {
    x0 = unify(e).clientX;
    _C.classList.toggle('smooth', !(locked = true))
};

function move(e) {
    if(locked) {
        let dx = unify(e).clientX - x0,//horizontal offset in pixels
            s = Math.sign(dx),
            f = +(s*dx/w).toFixed(2);//horizontal offset as part of the whole item width

        if((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > .2) {
            _C.style.setProperty('--i', i -= s);//change index if next item exist and if offset via X not less than 20%
            f = 1 - f; //for next usage to configure the animation speed
        }

        _C.style.setProperty('--tx', '0px');
        _C.style.setProperty('--f', f); //uses for animation speed
        _C.classList.toggle('smooth', !(locked = false));//enable smooth animation via transform
        x0 = null
    }
};

size();

addEventListener('resize', size, false);

function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

function drag(e) {
    e.preventDefault();
    if(locked) {
        _C.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`)//horizontal offset in pixels
    }
};

_C.style.setProperty('--n', N);

_C.addEventListener('mousedown', lock, false);
_C.addEventListener('touchstart', lock, false);

_C.addEventListener('mousemove', drag, false);
_C.addEventListener('touchmove', drag, false);

_C.addEventListener('mouseup', move, false);
_C.addEventListener('touchend', move, false);

