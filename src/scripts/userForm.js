import { sendLetters } from "./dataAccess.js"
import { getAuthors, getTopics, getRecipients } from "./dataAccess.js"
import { setAuthor, setTopic, setRecipient } from "./dataAccess.js"
import { getTransientState } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")



export const UserForm = () => {
    const authors = getAuthors()
    const topics = getTopics()
    const recipients = getRecipients()
    

    let html = `
        <div class="field">
            <label class="label" for="author">Choose Author</label>
            <select name="author" id="author"> 
            <option/>Choose Author...</option>`
    for (const author of authors) {
        html += `<option value="${author.id}">${author.name}</option>`
    }      
    html += `</select>
    </div>`   
                
    html += `       
        <div class="field">
            <label class="label" for="letter">Letter</label>
            <textarea name="letter" class="input"></textarea>
        </div> `

    html += `<div class="radio">`

    for (const topic of topics) {
        html += `<input type="checkbox" value="${topic.id}" name="topic" id="${topic.id}"> ${topic.name}`
    }
        
     html += "</div>"      
       
     html += `<div class="field">
            <label class="label" for="recipient">Recipient</label>
            <select name="recipient" id="recipient">
            <option/>Choose Recipients...</option>`

    for (const recipient of recipients) {
        html += `<option value="${recipient.id}">${recipient.name}</option>`
        
    }
        
    html += ` </select>
            </div>`  

    html +=  `<button class="button" id="submitRequest">Send Letter</button>`

    return html
}

document.addEventListener(
    "change",
    (event) => {
        const authors = getAuthors()
        if (event.target.name === "author") {
            setAuthor(parseInt(event.target.value))
        }
        // for (const author of authors) {
        //     if (author.id === event.target.value) {
        //         setAuthorEmail(author.email)
        //     }
        // }

    }
)

document.addEventListener(
    "click",
    evt => {
        if (evt.target.type === "checkbox") {
            const topic = evt.target.value

            setTopic(parseInt(topic))
        }
    }
)

// document.addEventListener(
//     "change",
//     (event) => {
//         if (event.target.name === "topic") {
//             setTopic(event.target.value)
//         }
//     }
// )

document.addEventListener(
    "change",
    (event) => {
        const recipients = getRecipients()
        if (event.target.name === "recipient") {
            setRecipient(parseInt(event.target.value))
        }
        // for (const recipient of recipients) {
        //     if (recipient.name === event.target.value) {
        //         setRecipientEmail(recipient.email)
        //     }
        // }
    }
)

// Listen for the Click
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const transient = getTransientState()
        const userAuthor = transient.authorId
        const userLetter = document.querySelector("textarea[name='letter']").value
        const userRecipient = transient.recipientId


        // Make an object out of the user input
        const dataToSendToAPI = {
            author: userAuthor,
            letter: userLetter,
            recipient: userRecipient,
        }

        // Send the data to the API for permanent storage
        sendLetters(dataToSendToAPI)
    }
})