import Subs from '../queries/subsBook'
import Query from '../queries/realTimeBooks'
import Stream from '../queries/realTimeBooks'
import Trigger from '../queries/triggerBooks'
import Create from '../queries/createBooks'
import { Grid } from 'semantic-ui-react'

export default () => {
    return (
        <Grid columns={2} centered>
            {/* <Subs /> */}
            <Grid.Row>
                <Create />
            </Grid.Row>
            <Grid.Row>
                <Stream />
            </Grid.Row>

            {/* <Trigger /> */}
        </Grid>
    )
}