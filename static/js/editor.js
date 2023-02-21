const editor = document.querySelector('.view')
let linesinput = []
let cursor = 0

class Word{
    constructor(word, id=1){
        console.log(word)
        this.word = word 
        this.id = id
        this.font = document.createElement('font') 
        
    }
    html(){
        if(this.word == 'import'){
            this.font.color = 'red'
        }
        this.font.innerText = this.word
        return this.font
    }
}

class Input {
    constructor() {
        this.nextLine = null
        this.previousLine = null
        this.wdiv = document.createElement('div')
        this.label = document.createElement('div')
        this.label.className = 'number'
        this.lineNumber = 0
        this.input = document.createElement('p')
        this.input.className = 'input'
        this.input.spellcheck = false
        this.input.contentEditable = true
        this.content_length = 0
        this.input.addEventListener('keydown', (e) => {
            cursor = cursor_position()
            this.content_length = this.input.innerText.length
        })
        this.input.addEventListener('focus', () => {
            for (let i of linesinput) {
                i.setAttribute('focus', false)
            }
            this.focus()
            this.setAttribute('focus', true)
        })

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
    focus = () => {
        this.input.focus()
    }
    format_code = () => {
        this.input.innerHTML = null
        for(let i = 0; i < this.nodes.length; i++){
            let node = this.nodes[i]
            console.log(this.words[i], node)
            node.word = this.words[i]
            this.input.append(node.html())
        } 
    }

}
let inp = new Input()
linesinput.push(inp)
inp.line(1)
inp.setAttribute('line', 1)
inp.setAttribute('focus', true)
editor.appendChild(inp.getHTML())
inp.focus()

const loading = document.querySelector('.loading')



editor.addEventListener('keydown', (e) => {
    cursor = cursor_position()
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

function newInputField() {
    let allInput = editor.querySelectorAll('.input')
    curr = editor.querySelector('[focus=true]')
    allInput.forEach(i => {
        i.setAttribute('focus', false)
    })
    let number = allInput.length
    let p = new Input()
    line = 1
    if (curr) {
        line = curr.getAttribute('line')
    }
    if (line <= number) {
        if (curr.innerText.length > cursor) {
            let code = curr.innerText
            let oldline = code.slice(0, cursor)
            let newline = code.slice(cursor)
            p.input.innerText = newline
            curr.innerText = oldline
        }
        linesinput = appendInput(p, line, linesinput)
    } else {
        linesinput.push(p)
    }
    p.line(number + 1)
    p.setAttribute('line', number + 1)
    let n = 1
    for (const a of linesinput) {
        a.line(n)
        a.setAttribute('line', n)
        a.setAttribute('focus', false)
        editor.appendChild(a.getHTML())
        n++
    }
    p.setAttribute('focus', true)
    p.focus()

}

function goUp() {
    curr = editor.querySelector('[focus=true]')
    line = curr.getAttribute('line')
    toLine = editor.querySelector(`[line="${Number(line)-1}"]`)
    if (toLine) {
        toLine.setAttribute('focus', true)
        curr.setAttribute('focus', false)
        toLine.focus()
    }
}

function goDown() {
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

function appendInput(input, index, arr) {
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
        method: 'POST',
        body: formdata
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

function addtopreview(data) {
    let p = document.createElement('p')
    p.innerText = data
    preview.appendChild(p)
}


function clearEditor() {
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

function copycode() {
    let allInput = editor.querySelectorAll('.input')
    let code = ''
    for (const inp of allInput) {
        let v = inp.innerText
        code += '\n' + v
    }
    window.navigator.clipboard.writeText(code)
    copybtn.innerText = 'copied'
    setTimeout(() => copybtn.innerText = 'copy', 500)
}

function cursor_position() {
    var sel = document.getSelection();
    sel.modify("extend", "backward", "paragraphboundary");
    var pos = sel.toString().length;
    if (sel.anchorNode != undefined) sel.collapseToEnd();

    return pos;
}