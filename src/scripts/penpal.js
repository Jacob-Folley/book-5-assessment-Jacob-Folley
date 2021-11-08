import { UserForm } from "./userForm.js"
import { Requests } from "./Letters.js"

// Is called when documet is rendered
export const penpal = () => {
    // returns all the HTML for the document
    return `
        <h1>Pen Pal Society</h1>
        <section class="userForm">
        ${UserForm()}
        </section>

        <section>
            <h1>Letters</h1>
            ${Requests()}
        </section>
    `
}