import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Nav } from './mol-nav'
import { Home } from './pages/home'
import { Dummy } from './atoms/dummy'
import { ROUTES} from "./routes"

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Nav/>
					<Switch>
						<Route exact path={ROUTES.home} render={() => <Home workspace={this.props.workspace} />} />
						<Route exact path={ROUTES.inventory} render={() => <Dummy name={'inventory'}/>} />
						<Route path={ROUTES.character} render={() => <Dummy name={'char'}/>} />
						<Route render={() => <p>Not Found</p>} />
					</Switch>
				</div>
			</Router>
		)
	}
}

export {
	App,
}
