import React from 'react'
import App, { Container } from 'next/app'
import "semantic-ui-css/semantic.min.css"
import { ApolloProvider } from "react-apollo"
import withApolloClient from '../lib/with-apollo-client'

import Navbar from "../components/navbar"

class MyApp extends App {
    render() {
        const { Component, pageProps, apolloClient } = this.props

        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <Navbar />
                    <Component {...pageProps} />
                </ApolloProvider>
            </Container>
        )
    }
}

export default withApolloClient(MyApp)