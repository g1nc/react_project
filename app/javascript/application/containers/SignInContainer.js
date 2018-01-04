import { connect } from 'react-redux'

import UserSignIn from '../components/users/UserSignIn'
import {getUser} from "../actions/users";

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: user => {
            dispatch(getUser(user))
        }
    }
};

const SignInContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserSignIn);

export default SignInContainer


