import gql from 'graphql-tag'

const getUser = gql`
    query getUser{
        user {
            id
        name
        }   
    }
`

export default getUser