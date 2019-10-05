import React, { Component } from 'react';
import Modal from 'react-modal';
import "./index.css";
import { changePassword } from "../../actions/userActions";
// import { removeContent } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import axios from 'axios';


const customStyles = {
    content : {
        top         : '50%',
        left        : '50%',
        right       : 'auto',
        bottom      : 'auto',
        marginRight : '-50%',
        transform   : 'translate(-50%, -50%)'
    }
};

class Settings extends Component{
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            newPassword: "",
            confirmNewPassword: "",
            errors: {},
            contentList: {}
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    displayContentList = e => {
        var temp = [];
        console.log("Start Retrieval",this);
        //this.props.retrieveContentList(this.props.auth, this.props.history);
        axios.post('/api/users/getContentList', this.props.auth)
            .then(res=>{
                // for(var i=0; i< res.data.contentList.length;i++){
                //     contentImageList.push(res.data.contentList[i][1]);
                //     contentPath.push(res.data.contentList[i][0]);
                // }
                // this.setState({listOfContent:contentImageList, listOfPath: contentPath });
                console.log("Rezzy: ",res.data);
                for(var i = 0; i< res.data.length;i++){
                    temp.push(res.data[i][1]);
                }
                this.setState({contentList:temp});
                console.log(this.state.contentList);
            })
            .catch(err=>{
                console.log(err);
            });
    }
    onChangePWSubmits = e => {
        console.log("Changing Password");
        e.preventDefault();
        const newPassword = {
            newPassword: this.state.newPassword,
            confirmNewPassword: this.state.confirmNewPassword,
            user: this.props.auth.user
        }
        console.log("New P, ", newPassword );
        console.log("This ", this);
        this.props.changePassword(newPassword, this.props.history);
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    removeContent = e =>{
        //remove content from Content List
        var temp= {};
        temp.auth = this.props.auth;
        temp.toRemove = e;
        console.log("people check",temp);
        axios.post("/api/users/removeContent",temp)
            .then(res=>console.log("removed"))
            .catch(err=>console.log(err));
        window.location.reload();
    }

    render(){

        const { newPassword, confirmNewPassword, errors, contentList } = this.state;
        return(

            <div>
                <button onClick={this.displayContentList}>Edit Content List</button>
                <ul>
                    {
                        Object.keys(contentList).length!==0
                        &&
                        contentList.map(((item,index)=>(
                            <li>
                                <img
                                  key={item}
                                  className="settingImg"
                                  src={item}
                                  alt="First slide"
                                  />
                                  <button onClick={()=>this.removeContent(item)}>X</button>
                              </li>
                        )))
                    }
                </ul>

                <form onSubmit={this.onChangePWSubmits}>
                    <div className="form-group">
                        <input
                            className={classnames("form-control", {
                                invalid: errors.newPassword || errors.newPasswordincorrect
                            })}
                            type="password"
                            placeholder="New Password"
                            id="newPassword"
                            value={newPassword}
                            onChange={this.onChange}/>
                    </div>
                    <span className="red-text">
	                     {errors.newPassword}
	                     {errors.newPasswordincorrect}
	                </span>
                    <div className="form-group">
                        <input
                            className={classnames("form-control", {
                                invalid: errors.confirmNewPassword || errors.confirmNewPasswordincorrect
                            })}
                            type="password"
                            placeholder="Confirm New Password"
                            id="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={this.onChange}/>
                    </div>
                    <span className="red-text">
	                     {errors.confirmNewPassword}
	                     {errors.confirmNewPasswordincorrect}
	                </span>
                    <div className="form-group">
						<button type="Submit" className="btn btn-lg btn-info btn-block">Change Password</button>
					</div>
                </form>
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <button onClick={this.closeModal}>X</button>
                    <h2 ref={subtitle => this.subtitle = subtitle}>Settings</h2>

                    <div>
                        <ul className="list-group">
                            <li className="list-group-item">Change Password</li>
                            <li className="list-group-item">Edit Content List</li>
                            <li className="list-group-item">Filler Settings Option 1</li>
                            <li className="list-group-item">Filler Settings Option 2</li>
                            <li className="list-group-item">Filler Settings Option 3</li>
                            <li className="list-group-item">Filler Settings Option 4</li>
                            <li className="list-group-item">Filler Settings Option 5</li>
                            <li className="list-group-item">Filler Settings Option 6</li>
                        </ul>
                    </div>
                </Modal>
            </div>
        );
    }
}

Settings.propTypes = {
    auth: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});
const mapDispatchToProps = {
    changePassword
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Settings));
