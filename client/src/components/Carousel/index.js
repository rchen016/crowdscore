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
        listOfPath: []
    }

    componentDidMount(){
        console.log("Find User ", this.props);
        var contentImageList = [];
        var contentPath = [];

        //Populate image slide show on profile page
        axios.post('/api/users/getData', this.props)
        .then(res=>{
            for(var i=0; i< res.data.contentList.length;i++){
                contentImageList.push(res.data.contentList[i][1]);
                contentPath.push(res.data.contentList[i][0]);
            }
            this.setState({listOfContent:contentImageList, listOfPath: contentPath });
        })
        .catch(err=>{
            console.log(err);
        });
	}

    render(){
        const { listOfContent, listOfPath } = this.state;
        console.log("Count ",Object.keys(listOfContent).length);
        var responsive = {
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
        if(Object.keys(listOfContent).length<3){
            //ensure for no contents for slideshow
            switch(Object.keys(listOfContent).length){
                case 0:
                    console.log("0");
                    responsive.superLargeDesktop.items = 1;
                    responsive.desktop.items = 1;
                    responsive.tablet.items = 1;
                    responsive.mobile.items = 1;
                    break;
                case 1:
                    console.log("1");
                    responsive.superLargeDesktop.items = 1;
                    responsive.desktop.items = 1;
                    responsive.tablet.items = 1;
                    responsive.mobile.items = 1;
                    break;
                case 2:
                    console.log("2");
                    responsive.superLargeDesktop.items = 2;
                    responsive.desktop.items = 2;
                    responsive.tablet.items = 2;
                    responsive.mobile.items = 2;
                    break;
                default:
                    console.log("Default");
                    break;
            }
        }

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
                        <Link key={index} to={listOfPath[index]}>
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
