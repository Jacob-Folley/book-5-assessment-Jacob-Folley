import { mainContainer } from "./main.js"

// Transient Database
export const applicationState = {
    requests: [],
    authors: [],
    topics: [],
    recipients: [],
    requestTopics: [],
    transient: {
        topicIds: new Set()
    }
}

const API = "http://localhost:8088"

// Function that gets Authors Table from JSON Database
export const fetchRequestAuthors = () => {
    return fetch(`${API}/authors`)
        .then(response => response.json())
        .then(
            (authors) => {
                applicationState.authors = authors
            }
        )

}
// Function that gets Topics Table from JSON Database
export const fetchRequestTopics = () => {
    // Retrieves JSON Table
    return fetch(`${API}/topics`)
        .then(response => response.json())
        .then(
            (topics) => {
                // Sets transient table equal to JSON Table
                applicationState.topics = topics
            }
        )

}
// Function that gets Recipients Table from JSON Database
export const fetchRequestRecipients = () => {
    return fetch(`${API}/recipients`)
        .then(response => response.json())
        .then(
            (recipients) => {
                applicationState.recipients = recipients
            }
        )

}
// Function that gets Requests Table from JSON Database
export const fetchRequestRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (requests) => {
                applicationState.requests = requests
            }
        )

}
// Function that gets TopicRequests Table from JSON Database
export const fetchRequestTopicRequests = () => {
    return fetch(`${API}/requestTopics`)
        .then(response => response.json())
        .then(
            (requestTopics) => {
                applicationState.requestTopics = requestTopics
            }
        )

}


const createRequestTopics = (requestObj) => {
    // Set empty array
    const fetchArray = []

    // Loop through the table
    applicationState.transient.topicIds.forEach(
        (topic) => {
            // Push each value in the table into the empty array
            fetchArray.push(
                fetch(`${API}/requestTopics`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        topicId: topic,
                        requestId: requestObj.id
                    })
                })
                    .then(response => response.json())
                    .then(() => {
                        console.log("Fetch call done")
                    })
            )
        }
    )

    // This is where all the fetches (Promises) all run and resolve
    Promise.all(fetchArray)
        .then(
            () => {
                console.log("All fetches complete")
                applicationState.transient.topicIds.clear()
            }
        )
}

// Copies of data to be used in other modules

export const getRequests = () => {
    return applicationState.requests.map(requests => ({ ...requests }))
}

export const getAuthors = () => {
    return applicationState.authors.map(authors => ({ ...authors }))
}

export const getTopics = () => {
    return applicationState.topics.map(topics => ({ ...topics }))
}

export const getRecipients = () => {
    return applicationState.recipients.map(recipients => ({ ...recipients }))
}

export const getRequestTopics = () => {
    return applicationState.requestTopics.map(requestTopics => ({ ...requestTopics }))
}

export const getTransientState = () => {
    return { ...applicationState.transient }
}



// Functions that set the transient state

export const setAuthor = (id) => {
    applicationState.transient.authorId = id
}

export const setRecipient = (id) => {
    applicationState.transient.recipientId = id
}

export const setTopic = (id) => {
    // Does the set contain the id?
    // Ternary statement
    applicationState.transient.topicIds.has(id)
        ? applicationState.transient.topicIds.delete(id)  // Yes? Remove it
        : applicationState.transient.topicIds.add(id)     // No? Add it
}



export const sendLetters = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(


            (newRequestObject) => {
                createRequestTopics(newRequestObject)
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}