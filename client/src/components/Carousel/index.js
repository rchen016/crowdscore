import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { Link } from 'react-router-dom';

class Caro extends Component{
    state = {
        listOfContent: [],
        listOfPath: []
    }

    componentDidMount(){
        console.log("Find User ", this.props);
        const contentImageList = [];
        const contentPath = [];
        //Populate image slide show on profile page
        axios.post('/api/users/getData', this.props)
        .then(res=>{
            console.log("????");
            console.log(res.data.contentList[1]);
            for(var i=0; i< res.data.contentList.length;i++){
                console.log(res.data.contentList[i][1]);
                contentImageList.push(res.data.contentList[i][1]);
                contentPath.push(res.data.contentList[i][0]);
            }
            this.setState({listOfContent:contentImageList, listOfPath: contentPath});
        })
        .catch(err=>{
            console.log(err);
        });
	}

    render(){
        const { listOfContent, listOfPath } = this.state;
        return(
            <div>
                <Carousel>

                    {listOfContent.map(item=>(
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
