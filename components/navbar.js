import Link from 'next/link'
import { withRouter } from 'next/router'
import {
    Menu
} from "semantic-ui-react"

const Navbar = ({ router: { pathname } }) => (
    <Menu fluid widths={2}>
        <Link href="/signin">
            <Menu.Item active={pathname === '/signin' ? true : false} link as="signin">
                Signin
            </Menu.Item>
        </Link>
        <Link href="/signup">
            <Menu.Item active={pathname === '/signup' ? true : false} link as="signup">
                Signup
            </Menu.Item>
        </Link>
    </Menu>
)

export default withRouter(Navbar)