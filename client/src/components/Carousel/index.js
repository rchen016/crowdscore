import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addContent } from "../../actions/userActions";
import Mongoose from 'mongoose';
import axios from 'axios';

class Caro extends Component{
    state = {
        listOfMovies: []
    }

    componentDidMount(){
        console.log("Find User ", this.props);
        const contentImageList = [];
        axios.post('/api/users/getData', this.props)
        .then(res=>{
            console.log("????");
            console.log(res.data.contentList[1]);
            for(var i=0; i< res.data.contentList.length;i++){
                console.log(res.data.contentList[i][1]);
                contentImageList.push(res.data.contentList[i][1]);
            }
            this.setState({listOfMovies:contentImageList});
        })
        .catch(err=>{
            console.log(err);
        });
	//	 this.setState({ listOfMovies: ["https://picsum.photos/200","https://picsum.photos/201","https://picsum.photos/202","https://picsum.photos/204"]})
	}

    render(){
        const { listOfMovies } = this.state;
        return(
            <div>
                <Carousel>
                    {listOfMovies.map(item=>(
                        <Carousel.Item key={item}>
                            <img
                              className="d-block w-100"
                              src={item}
                              alt="First slide"
                              />
                            <Carousel.Caption>
                                {item}
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        )
    }
}

Caro.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Caro);
