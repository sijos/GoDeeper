import { connect } from 'react-redux';
import { signup, login, logout } from '../../actions/session_actions';
import Auth from './auth';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
