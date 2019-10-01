import React, { Component } from 'react';
// import { Carousel } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./index.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
        const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3,
      },
    };
        return(
            <div className="mainCaro">
                <Carousel
                    className="caroMain"
                    responsive={responsive}
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderDotsOutside={false}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {listOfContent.map((item,index)=>(
                        <Link to={listOfPath[index]}>
                            <img
                              className="caroImg"
                              src={item}
                              alt="First slide"
                              />
                         </Link>
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
