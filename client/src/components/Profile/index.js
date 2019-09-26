import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Caro from '../Carousel';

const ShowSlideShow = () => (
    <div>Slide Show Module </div>
)

class Profile extends Component{

    render(){
        const { user } = this.props.auth;


        return(
            <>
                Welcome { user.name }!

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
