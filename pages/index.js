import React from 'react'
import Head from 'next/head'

class Index extends React.Component {
    static async getInitialProps({ pathname }) {
        console.log('SLUG', pathname)
        return {}
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Home</title>
                </Head>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt repudiandae amet inventore quae ex, necessitatibus distinctio reprehenderit harum ut. Libero dignissimos facere iusto quo corrupti maxime sint necessitatibus vitae iure?
            </div>
        )
    }
}

export default Index