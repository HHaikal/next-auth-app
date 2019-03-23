import React, { Component } from 'react'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import getBook from '../queries/getBook'

function Book({ id }) {
    const bookQuery = gql`
        query getBook($id: ID!){
            book(id: $id){
                id
                name
                description
            }
        }
    `

    const bookQueryVars = {
        id: id
    }

    return (
        <Query query={bookQuery} variables={bookQueryVars}>
            {({ loading, error, data }) => {
                if (loading) {
                    return (
                        <div>Loading...</div>
                    )
                }

                if (error) {
                    return (
                        <div>thereis no book with id {id} </div>
                    )
                }

                return (
                    <div>
                        {data.book.name}
                    </div>
                )
            }}
        </Query>
    )

}

Book.getInitialProps = async ({ query }) => {
    return { id: query.id }
}

export default Book