import React, { Component,useState } from 'react';
import { Carousel } from 'react-bootstrap';

class Caro extends Component{
    constructor(props){
        super(props);
    }
    state = {
        listOfMovies: []
    }

    componentDidMount(){
		 this.setState({ listOfMovies: ["https://picsum.photos/200","https://picsum.photos/201","https://picsum.photos/202","https://picsum.photos/204"]})
	}

    render(){
        const { listOfMovies } = this.state;
        return(
            <div>
                <Carousel>
                    {listOfMovies.map(item=>(
                        <Carousel.Item>
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

export default Caro;
