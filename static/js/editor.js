const editor = document.querySelector('.view')
let linesinput = []
class Input{
    constructor(){
        this.nextLine = null
        this.previousLine = null
        this.wdiv = document.createElement('div')
        this.label = document.createElement('div')
        this.label.className ='number'
        this.lineNumber = 0 
        this.input = document.createElement('p')
        this.input.className = 'input'
        this.input.contentEditable = true

        this.wdiv.append(this.label, this.input)
    }

    line = (a) => {
        this.lineNumber = a 
        this.label.innerText = a
    }
    setAttribute = (name, value) => {
        this.input.setAttribute(name, value)
    }
    getAttribute = (name) => {
        return this.input.getAttribute(name)
    }
    getHTML = () => {
        return this.wdiv
    }
    focus = () => this.input.focus()
}
let inp = new Input()
linesinput.push(inp)
inp.line(1)
inp.setAttribute('line', 1)
inp.setAttribute('focus', true)
editor.appendChild(inp.getHTML())
inp.focus()

const loading = document.querySelector('.loading')

setTimeout(()=> loading.style.display = 'none', 5000)



editor.addEventListener('keydown', (e) => {
    // console.log(e.keyCode)
    switch (e.keyCode) {
        case 13:
            e.preventDefault()
            newInputField()
            break;
        case 38:    
            goUp() 
            break; 
        case 40: 
            goDown() 
            break;   
        default:
            break;
    }

})

function newInputField(){
    let allInput = editor.querySelectorAll('.input')
    curr = editor.querySelector('[focus=true]')
    allInput.forEach(i => i.setAttribute('focus', false))
    // allInput = Array(allInput)
    // allInput
    let number = allInput.length
    let p = new Input()
    
    // console.log(curr)
    line = 1
    if (curr) {
        line = curr.getAttribute('line')
        } 
    if (line < number) {

        linesinput = appendInput(p, line, linesinput)
        }
    else{
        linesinput.push(p)
    }
    p.line(number+1)
    p.setAttribute('line', number+1)
    p.setAttribute('focus', true)
    let n = 1 
    for (const a of linesinput) {
        a.line(n)
        a.setAttribute('line', n)
        editor.appendChild(a.getHTML())
        n++
        } 
    p.focus()

    // newInput.focus()
}
function goUp(){
    // let allInput = editor.querySelectorAll('.input')
    curr = editor.querySelector('[focus=true]')
    line = curr.getAttribute('line')
    toLine = editor.querySelector(`[line="${Number(line)-1}"]`)
    if (toLine) {
        toLine.setAttribute('focus', true)
        curr.setAttribute('focus', false)
        toLine.focus()
    }
}
function goDown(){
    // let allInput = editor.querySelectorAll('.input')
    curr = editor.querySelector('[focus=true]')
    line = curr.getAttribute('line')
    toLine = editor.querySelector(`[line="${Number(line)+1}"]`)
    // console.log(line+1, toLine)
    if (toLine) {
        toLine.setAttribute('focus', true)
        curr.setAttribute('focus', false)
        toLine.focus()
    }
   
}

function appendInput(input, index, arr){
    let n = []
    f = arr.slice(0, index)
    p = arr.slice(index)
    // console.log(arr)
    f[index] = input
    arr = [...f, ...p]
    return arr
}


const runbtn = document.querySelector('[run]')
const clearbtn = document.querySelector('[clear]')
const copybtn = document.querySelector('[copy]')
const preview = document.querySelector('.pview')
runbtn.onclick = async () => {
    let allInput = editor.querySelectorAll('.input')
    let code = []
    allInput.forEach(element => {
        code.push(element.innerText)
    });
    let formdata = new FormData()
    
    formdata.append('code', code.join('_'))
    runbtn.innerText = 'running ...'
    const response = await fetch('/api_v1/code', {
        method : 'POST',
        body : formdata
    })
    const data = await response.json()
    for (const d of data) {
        addtopreview(d)
        
    }
    addtopreview('[Program finished]')
    runbtn.innerText = 'run'
}

clearbtn.onclick = () => clearEditor()
copybtn.onclick = () => copycode()
function addtopreview(data){
    let p = document.createElement('p')
    p.innerText = data
    preview.appendChild(p)
}


function clearEditor(){
    editor.innerHTML = ''
    preview.innerHTML = ''
    linesinput = []
    let inp = new Input()
linesinput.push(inp)
inp.line(1)
inp.setAttribute('line', 1)
inp.setAttribute('focus', true)
editor.appendChild(inp.getHTML())
inp.focus()
}

function copycode(){
    let allInput = editor.querySelectorAll('.input')
    let code = ''
    for (const inp of allInput) {
        let v = inp.innerText
        code += '\n' + v
    }
    window.navigator.clipboard.writeText(code)
    copybtn.innerText = 'copied'
    setTimeout(()=> copybtn.innerText = 'copy', 500) 
}