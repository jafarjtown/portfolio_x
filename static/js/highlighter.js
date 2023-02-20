
class Highligter{
    constructor(selectors, labels){
        this.selectors = selectors
        this.labels = labels
        this.index = 0
        this.current = document.querySelector(selectors[this.index])
        this.tag = document.createElement('div')
        this.tag.className = 'highlighter'
        this.label = document.createElement('p')
        this.label.innerText = this.labels[0]
        let n = document.createElement('button')
        n.innerText = 'next'
        n.onclick = () => this.next()
        this.tag.append(this.label, n)
        document.body.append(this.tag)
    }
    run(){
        let curr = this.current.getBoundingClientRect()
        
        // let x = curr.top - document.documentElement.scrollTop
        let x = this.current.offsetTop
        let y = this.current.offsetLeft
        this.tag.style.top = `${x-6}px`
        this.tag.style.left = `${y-6}px`
        this.tag.style.width = `${curr.width+8}px`
        this.tag.style.height = `${curr.height+8}px`

        if(x<100){
            this.label.style.top = `${x + 10}px`
        }
        else this.label.style.bottom = `${curr.height + 10}px`
        if(y < 100){
            this.label.style.left = `${y + 10}px`
        }else this.label.style.right = `${curr.width + 10}px`
        
    }
    next(){
        this.index++
        if(this.index == this.selectors.length){
            document.body.removeChild(this.tag)
            window.removeEventListener('scroll', () => this.update())
            this.index = 0
            this.current = null
            localStorage.setItem('highlight', true)
            return
        }
        this.current = document.querySelector(this.selectors[this.index])
        this.label.innerText = this.labels[this.index]
        
        this.run()
    }
    previous(){}
    update(){
        this.run()
    }

}


if(!localStorage.getItem('highlight')){
    const highlighter = new Highligter(['[nav]', '[links]', '[wall]'],['place to change your theme','navigate the site here', 'this is my picture...'])
    window.addEventListener('scroll', ()=> highlighter.update())
    highlighter.run()
}