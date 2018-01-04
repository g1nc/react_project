import { connect } from 'react-redux'

import UserList from '../components/users/UserList'
import { getUsers } from '../actions/users';

const mapStateToProps = state => {
    return {
        users: state.users.collection
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMount: users => dispatch(getUsers(users))
    }
};

const UsersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);

export default UsersContainer


