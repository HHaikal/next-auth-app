import React from 'react'
import { Subscription } from 'react-apollo'
import gql from 'graphql-tag'

const subscription = gql`
    subscription onBookAdded{
        bookAdded{
            id
            name
            description
        }
    }  
`

export default () => (
    <Subscription subscription={subscription}>
        {({ data, loading }) => {
            if (loading) {
                return (
                    <div>Loading</div>
                )
            }
            return (
                <div>{data.bookAdded.name}</div>
            )
        }}
    </Subscription>
)