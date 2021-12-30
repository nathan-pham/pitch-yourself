// export Editor class
export default class Editor {
    
    // constructor
    constructor({ $editorCode, $editorType }) {

        this.$editorCode = document.querySelector($editorCode)
        this.$editorType = document.querySelector($editorType)

        // add syntax highlighting to the editor
        this.$editorCode.innerHTML = this.parseJSON(this.$editorCode.innerHTML)

        // add typing effect
        this.typingEffect()
        
    }

    async typingEffect() {

        const jobs = ["a mathematicician", "a designer", "a farmer", "a student", "an engineer"]
        const sleep = ms => new Promise((res) => setTimeout(() => res(ms), ms))
        let i = 0

        while(true) {

            const job = jobs[i]

            for(let char of job) {
                await sleep(Math.random() * 100)
                this.$editorType.textContent += char
            }

            await sleep(3500)

            for(let char of job) {
                await sleep(Math.random() * 100)
                this.$editorType.textContent = this.$editorType.textContent.slice(0, -1)
            }

            await sleep(1500)
            
            i = (i + 1) % jobs.length
            
        }

        
    }

    // TODO: make a real JSON parser instead of doing jank stuff
    parseJSON(_editorCode, level=1) {

        let editorCode = typeof _editorCode == "string" ? JSON.parse(_editorCode) : _editorCode
        let json = ``

        if(Array.isArray(editorCode)) {

            if(editorCode.every(s => typeof s == "string")) {

                json += "[ "
                json += editorCode.map(s => `<span class="token__value">"${s}"</span>`).join(", ")
                json += " ],"
                
            } else {

                json += "[\n"
                json += editorCode.map(s => this.parseJSON(s, level + 1)).join(",\n")
                json += `\n${" ".repeat((level - 1) * 4)}],`
                
            }
            
        } else {

            json += `${" ".repeat((level - 1) * 4)}{\n`

            const entries = Object.entries(editorCode)
            for(const [key, value] of entries) {

                // check if current key is last to ommit comma
                let comma = key == entries[entries.length - 1][0] ? "" : ","

                json += `${" ".repeat(level * 4)}<span class="token__key">"${key}"</span>: `
                json += typeof value == "string"
                    ? `<span class="token__value">"${value}"</span>${comma}\n`
                    : `${this.parseJSON(value, level + 1)}\n`

            }

            json += `${" ".repeat((level - 1) * 4)}}`
            
        } 
        
        return json

    }
    
}
