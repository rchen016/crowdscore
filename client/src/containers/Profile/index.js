import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Caro from '../../components/Carousel';
import "./index.css";
import { Button } from 'react-bootstrap';

class Profile extends Component{

    render(){
        const { user } = this.props.auth;

        return(
            <>
                <img
                    className="profilePic"
                    src="https://picsum.photos/210"
                    alt="None"
                />
                <div className="nameContainer">
                    <span className="userNameText">{ user.name }!</span>
                    <br />
                    Your Movie List:
                </div>
                <Caro />
                <Button href="/settings"> Settings </Button>
            </>
        )
    }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Profile);
