import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from "apollo-link-ws";
import fetch from 'isomorphic-unfetch'
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import ws from 'websocket'

let apolloClient = null
const ssrMode = !process.browser

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

function create(initialState, { getToken }) {
    const httpLink = createHttpLink({
        uri: 'http://localhost:4000',
        credentials: 'same-origin'
    })

    let link = httpLink
    if (!ssrMode) {
        // Create a WebSocket link:
        const wsLink = new WebSocketLink({
            uri: 'ws://localhost:4000/',
            options: {
                reconnect: true,
            },
            webSocketImpl: ws.client,
        })

        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        link = split(
            // split based on operation type
            ({ query }) => {
                const { kind, operation } = getMainDefinition(query)
                return kind === 'OperationDefinition' && operation === 'subscription'
            },
            wsLink,
            httpLink
        )
    }

    const authLink = setContext((_, { headers }) => {
        const token = getToken()
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        }
    })

    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: authLink.concat(link),
        cache: new InMemoryCache().restore(initialState || {})
    })
}

export default function initApollo(initialState, options) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState, options)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState, options)
    }

    return apolloClient
}
