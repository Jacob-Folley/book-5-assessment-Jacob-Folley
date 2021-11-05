import { sendRequest } from "./dataAccess.js"
import { getAuthors, getTopics, getRecipients } from "./dataAccess.js"
import { setAuthor, setTopic, setRecipient, setRecipientEmail, setAuthorEmail } from "./dataAccess.js"
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
        html += `<option value="${author.name}" Sacks"/>${author.name}</option>`
    }      
    html += `</select>
    </div>`   
                
    html += `       
        <div class="field">
            <label class="label" for="letter">Letter</label>
            <textarea name="letter" class="input" /></textarea>
        </div> `

    html += `<div class="radio">`

    for (const topic of topics) {
        html += `<input type="radio" value="${topic.name}" name="topic" id="${topic.id}" /><label class="label" for="${topic.name}">${topic.name}</label>`
    }
        
     html += "</div>"      
       
     html += `<div class="field">
            <label class="label" for="recipient">Recipient</label>
            <select name="recipient" id="recipient">
            <option/>Choose Recipients...</option>`

    for (const recipient of recipients) {
        html += `<option value="${recipient.name}"/>${recipient.name}</option>`
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
            setAuthor(event.target.value)
        }
        for (const author of authors) {
            if (author.name === event.target.value) {
                setAuthorEmail(author.email)
            }
        }

    }
)

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "topic") {
            setTopic(event.target.value)
        }

    }
)

document.addEventListener(
    "change",
    (event) => {
        const recipients = getRecipients()
        if (event.target.name === "recipient") {
            setRecipient(event.target.value)
        }
        for (const recipient of recipients) {
            if (recipient.name === event.target.value) {
                setRecipientEmail(recipient.email)
            }
        }
    }
)

// Listen for the Click
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const transient = getTransientState()
        const userAuthor = transient.authorName
        const userAuthorEmail = transient.authorEmail
        const userLetter = document.querySelector("textarea[name='letter']").value
        const userTopic = transient.topicName
        const userRecipient = transient.recipientName
        const userRecipientEmail = transient.recipientEmail


        // Make an object out of the user input
        const dataToSendToAPI = {
            author: userAuthor,
            authorEmail: userAuthorEmail,
            letter: userLetter,
            topic: userTopic,
            recipient: userRecipient,
            recipientEmail: userRecipientEmail
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})