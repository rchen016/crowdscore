import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Content from '../../containers/Content';
import SingleContent from '../../containers/SingleContent';
import SingleEpisode from '../../containers/SingleEpisode';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Landing from '../Layout';
import Profile from '../../containers/Profile';
import PrivateRoutes from '../PrivateRoutes';
import Settings from '../../containers/Settings';

const Main = props => (
	<Switch>
		<Route exact path="/" component={Content} />
		<Route path="/series/:id" component={SingleContent} />
		<Route path="/episode/:id" component={SingleEpisode} />
		<Route path="/movie/:id" component={SingleContent} />
		<Route path="/login" component={Login} />
		<Route path="/register" component={Register} />
		<Route path="/landing" component={Landing} />
		<Route path="/settings" component={Settings} />
		<PrivateRoutes path="/profile" component={Profile} />
		<Route path="/:" component={Content} />
	</Switch>
)

export default Main;
