import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Caro from '../Carousel';
import "./index.css";

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
                Welcome { user.name }!
                <br />
                Your Movie List:
                <Caro />
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
