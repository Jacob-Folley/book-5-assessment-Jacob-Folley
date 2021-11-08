import { getRequests, getAuthors, getTopics, getRecipients, getRequestTopics } from "./dataAccess.js"
const requests = getRequests()

export const Requests = () => {
    // Set data to variables
    const authors = getAuthors()
    const recipients = getRecipients()
    const requestTopics = getRequestTopics()
    const topics = getTopics()
    const requests = getRequests()

    // Create a HTML Varible that will store all the HTML
    let html = `<div class="letterOutput">`

    // Method that gets the current date
    let date = new Date().toLocaleDateString();

    // Loops through the request array
    for (const request of requests) {
        // Loop through each Author in the Authors array
        for (const author of authors) {
            // If there is a requested Author we match the foreign key with the primary key to link it
            if (request.author === author.id) (
                // Linking them allows us to print out the HTML
                html += `<section class="letters"> <h3>Dear ${author.name} <i>(${author.email})</i>,</h3>`
            )

        }

        // Prints the letter body
        html += `<p>${request.letter} </p>`

        // Loop through each Recipient in the Recipients array
        for (const recipient of recipients) {
            // If there is a requested Recipient we match the foreign key with the primary key to link it
            if (request.recipient === recipient.id) (
                // Linking them allows us to print out the HTML
                html += `<p>Sincerely, ${recipient.name} <i>(${recipient.email})</i></p>`
            )

        }

        // Calling the date varible that we declare at the top of the page
        html += `<p id="time">Sent on ${date} </p>`

        html += `<div class="topicStyle">`

        // Loop through each topic in the requested topics array
        for (const requestTopic of requestTopics) {
            // Link the foreign key to the primary key
            if (requestTopic.requestId === request.id) {
                // Loop through each topic in the topics table
                for (const topic of topics) {
                    // Link the foreign key to the primary key
                    if (topic.id === requestTopic.topicId) (
                        // Prints out the topics
                        html += `<p class="topicText">${topic.name}</p>`
                    )
                }
            }

        }

    }


    html += `</div></section></div>`

    // Returns the whole string in the HTML
    return html

}





