import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./index.css";

class Caro extends Component{
    state = {
        listOfContent: [],
        listOfPath: [],
        mainStorage: {}
    }

    componentDidMount(){
        console.log("Find User ", this.props);
        var contentImageList = [];
        var contentPath = [];
        var testHolder = {
            image: [],
            path: []
        };
        //Populate image slide show on profile page
        axios.post('/api/users/getData', this.props)
        .then(res=>{
            console.log("????");
            console.log(res.data.contentList[1]);
            for(var i=0; i< res.data.contentList.length;i++){
                console.log(res.data.contentList[i][1]);
                contentImageList.push(res.data.contentList[i][1]);
                contentPath.push(res.data.contentList[i][0]);
                testHolder.image.push(res.data.contentList[i][1]);
                testHolder.path.push(res.data.contentList[i][0]);
            }
            console.log("testHolder: ",testHolder);
            this.setState({listOfContent:contentImageList, listOfPath: contentPath, mainStorage: testHolder});
            console.log(this.state.mainStorage);
        })
        .catch(err=>{
            console.log(err);
        });
	}

    render(){
        const { listOfContent, listOfPath, mainStorage } = this.state;
        return(
            <div>
                <Carousel className="mainCaro">
                    {listOfContent.map((item,index)=>(
                        <Carousel.Item className="mainCaro">
                            <Link to={listOfPath[index]}>
                                <img
                                  className="d-block w-100"
                                  src={item}
                                  alt="First slide"
                                  />
                             </Link>
                            <Carousel.Caption>
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
