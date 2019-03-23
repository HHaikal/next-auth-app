import { Grid, Card, Form, Input, Button } from "semantic-ui-react"

const signup = () => {
    return (
        <Grid centered>
            <Grid.Row style={{ paddingTop: "10em" }}>
                <Card>
                    <Card.Content>
                        <Card.Header>Signup</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Form>
                            <Form.Field>
                                <Input type="text" placeholder="Name" />
                            </Form.Field>
                            <Form.Field>
                                <Input type="text" placeholder="Email" />
                            </Form.Field>
                            <Form.Field>
                                <Input type="password" placeholder="Password" />
                            </Form.Field>
                            <Form.Field>
                                <Input type="password" placeholder="Password Confirmation" />
                            </Form.Field>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </Card.Content>
                </Card>
            </Grid.Row>
        </Grid>
    )
}

export default signup