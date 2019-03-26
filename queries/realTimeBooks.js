import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Stream from './stream'

export default (id, client) => {
    const subscription = gql`
    subscription onBookAdded{
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

    const query = gql`
    {
        books{
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
        <Query query={query}>
            {({ loading, data, error, subscribeToMore }) => {
                if (loading) {
                    return (
                        <div>Loading ...</div>
                    )
                }

                if (error) {
                    return (
                        <div>Error</div>
                    )
                }

                const more = () => subscribeToMore({
                    document: subscription,
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;
                        const { bookAdded } = subscriptionData.data;
                        return Object.assign({}, prev, {
                            books: [...prev.books, bookAdded],
                        });
                    },
                });

                return <Stream data={data} subscribeToMore={more} />
            }}
        </Query>
    )
}