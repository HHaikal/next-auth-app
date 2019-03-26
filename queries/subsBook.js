import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

export default () => {
    const subscription = gql`
    subscription onBookAdded{
        bookAdded{
            id
            name
            description
        }
    }  
    `


    return (
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
}