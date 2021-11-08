import { penpal } from "./penpal.js"
import { fetchRequestAuthors, fetchRequestTopics, fetchRequestRecipients, fetchRequestRequests, fetchRequestTopicRequests } from "./dataAccess.js"




export const mainContainer = document.querySelector("#container")


//Listens for the state to change
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        // Renders the document if state is changed
        render()
    }
)

// Renders the whole page
const render = () => {
    // retrieves permanent api Data
    fetchRequestAuthors().then(
        () => {
            // Gets the Topics
            return fetchRequestTopics()
        }
    ).then(
        () => {
            // Gets the Recipients
            return fetchRequestRecipients()
        }
    ).then(
        () => {
            // Gets the Requests
            return fetchRequestRequests()
        }
    ).then(
        () => {
            // Get the topic Requests
            return fetchRequestTopicRequests()
        }
    ).then(
        () => {
            // Sets the HTML to the value of the penpal function
            mainContainer.innerHTML = penpal()
        }
    )
}

render()


