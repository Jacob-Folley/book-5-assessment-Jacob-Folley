import { penpal } from "./penpal.js"
import { fetchRequestAuthors, fetchRequestTopics, fetchRequestRecipients, fetchRequestRequests, fetchRequestTopicRequests } from "./dataAccess.js"




export const mainContainer = document.querySelector("#container")


//Listens for the state to change
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

// Renders the whole page
const render = () => {
    fetchRequestAuthors().then(
        () => {
            return fetchRequestTopics()
        }
    ).then(
        () => {
            return fetchRequestRecipients()
        }
    ).then(
        () => {
            return fetchRequestRequests()
        }
    ).then(
        () => {
            return fetchRequestTopicRequests()
        }
    ).then(
        () => {
            mainContainer.innerHTML = penpal()
        }
       )
}

render()


