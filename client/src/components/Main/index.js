import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Content from '../../containers/Content';
import SingleContent from '../../containers/SingleContent';
import SingleEpisode from '../../containers/SingleEpisode';
import Login from '../Login';

const Main = props => (
	<Switch>
		<Route exact path="/" component={Content} />
		<Route path="/series/:id" component={SingleContent} />
		<Route path="/episode/:id" component={SingleEpisode} />
		<Route path="/movie/:id" component={SingleContent} />
		<Route path="/login" component={Login} />
		<Route path="/:" component={Content} />
	</Switch>
)

export default Main;
