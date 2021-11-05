import { UserForm } from "./userForm.js"
import { Requests } from "./Letters.js"


export const penpal = () => {
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