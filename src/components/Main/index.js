import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Series from '../../containers/Series';
import SingleSeries from '../../containers/SingleSeries';
import SingleEpisode from '../../containers/SingleEpisode';

const Main = props => (
	<Switch>
		<Route exact path="/" component={Series} />
		<Route path="/series/:id" component={SingleSeries} />
		<Route path="/episode/:id" component={SingleEpisode} />
		<Route path="/movie/:id" component={SingleSeries} />
		<Route path="/:" component={Series} />
	</Switch>
)

export default Main;
