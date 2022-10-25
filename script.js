const holes = document.querySelectorAll('.hole');
const scr_brd = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const high_score = document.querySelector('.hs');
let lastHole;
let timeUp = false;
let score = 0;
let tmout;
let mout;
let high=0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];


    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1200);
    const hole = randomHole(holes);
    hole.classList.add('show');
    tmout=setTimeout(() => {
        hole.classList.remove('show');
        if(!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
	clearTimeout(tmout);
	clearTimeout(mout);
	if(score>high){
		high=score;
	}
	high_score.textContent = high;
    scr_brd.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    mout=setTimeout(() => {timeUp = true;
	                       if(score>high){
								high=score;
								}
							high_score.textContent = high;
							}, 20000) //show random moles for 20 seconds
}

function whack(e){
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('show');
    scr_brd.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack))

