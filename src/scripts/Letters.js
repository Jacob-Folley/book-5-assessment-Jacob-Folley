import { getRequests } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()

    const convertRequestToListElement = (request) => {
        let date = new Date().toLocaleDateString();
            return `<section class="letters"> <h3>Dear ${request.author} <i>(${request.authorEmail})</i>,</h3>
            <p>${request.letter} </p>
            <p>Sincerely, ${request.recipient} <i>(${request.recipientEmail})</i></p>
            <p id="time">Sent on ${date} </p>
            <div id="topicStyle">
            <p id="topicText">${request.topic}</p>
            </div>
            </section>`
            
        }
    

    let html = `
        <p>
            ${
                requests.map(convertRequestToListElement).join("")
            }
        </p>
    `

    return html
}
