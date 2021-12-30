import "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
import Editor from "./components/Editor.js"

const editor = new Editor({
    $editorCode: ".editor__content__list code",
    $editorType: ".editor__content__type"
})

