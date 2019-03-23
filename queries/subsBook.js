import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

export default () => {
    const booksQuery = gql`
        subscription onBookStream{
            bookAdded{
                id
                name
                description
                author{
                id
                name
                bio
                }
            }
        }
    `


    return (
        <Subscription subscription={booksQuery}>
            {({ data }) => {
                return <h3>Newest Book: {!data ? "waiting..." : data.bookAdded}</h3>
            }}
        </Subscription>
    )
}