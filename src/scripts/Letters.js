import { getRequests, getAuthors, getTopics, getRecipients, getRequestTopics } from "./dataAccess.js"
const requests = getRequests()

export const Requests = () => {
    const authors = getAuthors()
    const recipients = getRecipients()
    const requestTopics = getRequestTopics()
    const topics = getTopics()
    const requests = getRequests()

    let html = `<div class="letterOutput">`

    let date = new Date().toLocaleDateString();

    for (const request of requests) {

        for (const author of authors) {
            if (request.author === author.id) (
                html += `<section class="letters"> <h3>Dear ${author.name} <i>(${author.email})</i>,</h3>`
            )

        }
        html += `<p>${request.letter} </p>`

        for (const recipient of recipients) {
            if (request.recipient === recipient.id) (
                html += `<p>Sincerely, ${recipient.name} <i>(${recipient.email})</i></p>`
            )

        }

        html += `<p id="time">Sent on ${date} </p>`

        html += `<div class="topicStyle">`

        for (const requestTopic of requestTopics) {
            if (requestTopic.requestId === request.id) {
                for (const topic of topics) {
                    if (topic.id === requestTopic.topicId) (
                    html += `<p class="topicText">${topic.name}</p>`
                    )
                }
            }

        }

    }


    html += `</div></section></div>`
    //debugger
    return html

}





