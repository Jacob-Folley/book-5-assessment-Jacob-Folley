import { mainContainer } from "./main.js"

export const applicationState = {
    requests: [],
    authors: [],
    topics: [],
    recipients: [],
    transient: {}
}

const API = "http://localhost:8088"

export const fetchRequestAuthors = () => {
     return fetch(`${API}/authors` )
        .then(response => response.json())
        .then(
            (authors) => {
                applicationState.authors = authors
            }
        )
        
}
export const fetchRequestTopics = () => {
    return fetch(`${API}/topics` )
       .then(response => response.json())
       .then(
           (topics) => {
               applicationState.topics = topics
           }
       )
       
}
export const fetchRequestRecipients = () => {
    return fetch(`${API}/recipients` )
       .then(response => response.json())
       .then(
           (recipients) => {
               applicationState.recipients = recipients
           }
       )
       
}

export const fetchRequestRequests = () => {
    return fetch(`${API}/requests` )
       .then(response => response.json())
       .then(
           (requests) => {
               applicationState.requests = requests
           }
       )
       
}



export const getRequests = () => {
    return applicationState.requests.map(requests => ({...requests}))
}

export const getAuthors = () => {
    return applicationState.authors.map(authors => ({...authors}))
}

export const getTopics = () => {
    return applicationState.topics.map(topics => ({...topics}))
}

export const getRecipients = () => {
    return applicationState.recipients.map(recipients => ({...recipients}))
}

export const getTransientState = () => {
    return {...applicationState.transient}
}




export const setAuthor = (Name) => {
    applicationState.transient.authorName = Name
}
export const setAuthorEmail = (Name) => {
    applicationState.transient.authorEmail = Name
}
export const setTopic = (Name) => {
    applicationState.transient.topicName = Name
}
export const setRecipient = (Name) => {
    applicationState.transient.recipientName = Name
}
export const setRecipientEmail = (Name) => {
    applicationState.transient.recipientEmail = Name
}


export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}