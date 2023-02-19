const nav = document.getElementById('nav')
const wa = document.getElementById('wa')

window.onscroll = (e) => {
    let y = wa.getBoundingClientRect().y
    if(y <= 1){
        nav.classList.add('stick')
    }
    else{
        nav.classList.remove('stick')
    }
}

const links = document.querySelectorAll('.link-code') 

links.forEach(element => {
    let btn = element.querySelector('button')
    let a = element.querySelector('a')
    btn.onclick = () => {
        window.navigator.clipboard.writeText(a.href)
        btn.classList.add('copied')
        btn.innerText = 'copied'
        setTimeout(()=> {
            btn.classList.remove('copied')
            btn.innerText = 'copy'
        }, 1000)
    }
});

const boxWrapper = document.querySelector('.boxs-wrapper')
let _ = 1
let n = 2
let m = 3
let a = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,_,2,3,4,5,_,0,0,0,0,0,0,0],
    [0,0,0,0,_,4,0,0,0,0,4,_,0,0,0,0,0,0],
    [0,0,0,0,_,0,0,0,0,0,0,0,_,0,0,0,0,0],
    [0,0,0,_,0,0,0,0,0,0,0,0,0,_,0,0,0,0],
    [0,0,_,0,0,0,0,0,0,0,0,0,0,2,_,0,0,0],
    [0,0,_,0,0,0,0,0,0,0,0,0,0,0,0,0,_,0],
    [0,0,_,0,0,0,0,0,0,0,0,0,0,0,0,_,0,0],
    [0,0,_,0,0,0,0,0,0,0,0,0,0,0,0,_,0,0],
    [0,0,0,_,0,0,0,0,0,0,0,0,0,0,_,0,0,0],
    [0,0,0,0,_,7,0,0,0,0,0,0,0,0,_,0,0,0],
    [0,0,0,0,0,0,_,0,0,0,0,0,0,_,0,0,0,0],
    [0,0,0,0,0,0,_,0,0,0,0,0,0,_,0,0,0,0],
    [0,0,0,0,0,0,_,0,0,0,0,0,_,0,0,0,0,0],
    [0,0,0,0,0,0,_,0,0,0,0,0,_,0,0,0,0,0],
    [0,0,0,0,0,0,0,_,0,0,0,0,_,0,0,0,0,0],
    [0,0,0,0,0,0,0,_,0,0,0,0,_,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,_,0,0,_,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]
if (boxWrapper) {
a.forEach(row => {
    let r = document.createElement('div')
    r.className = 'row'
    let f = false;
    row.forEach(d => {
        let dot = document.createElement('div')
        dot.className = 'mp-dot'
        if(d == 1){
            dot.classList.add("cl")
            f = !f

        }
        // if
        
        if (!f){
            dot.classList.add('cl')
        }
        // if(d == 2) dot.classList.add("n")
        // if(d == 3) dot.classList.add("m")
        r.appendChild(dot)
    });
    boxWrapper.appendChild(r)
    
});
}


const loading = document.querySelector('.loading')

setTimeout(()=> loading.style.display = 'none', 5000)

