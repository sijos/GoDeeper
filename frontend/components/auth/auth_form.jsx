import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './auth_modal_style';

const defaultState = {
  username: "",
  password: "",
  modalOpen: false,
  modalType: "login"
};

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(modalType) {
    this.setState({modalOpen: true, modalType});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  swapForm() {
    if (this.state.modalType === "login") {
      return (<button onClick={this.openModal.bind(this, "signup")}
        >Sign Up Here!</button>);
    } else {
      return (<button onClick={this.openModal.bind(this, "login")}
        >Log In Here!</button>);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    if (this.state.modalType === 'login') {
      this.props.login(user);
    } else {
      this.props.signup(user);
    }
  }

  update(field) {
    return (e) => (
      this.setState({[field]: e.target.value})
    );
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((err, idx) => (
          <li key={`error-${idx}`}>{err}</li>
        ))}
      </ul>
    );
  }

  render() {
    const formText = this.state.modalType === "login" ? "Log In" : "Sign Up";
    return(
      <div>
        <ul className="login-signup">
          <li>
            <button className="header-button"
              onClick={this.openModal.bind(this, 'login')}
              >Log In</button>
          </li>
          <li>
            <button className="header-button"
              onClick={this.openModal.bind(this, 'signup')}
              >Sign Up</button>
          </li>
        </ul>

        <Modal
          contentLabel="Modal"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={ModalStyle}>
          <h2> Welcome!</h2>
          <div>Please {formText} below or {this.swapForm()}</div>
          <form onSubmit={this.handleSubmit}>
            {this.renderErrors}
            <div className="login-form">
              <label>Username:
                <input type="text"
                  value={this.state.username}
                  onChange={this.update("username")}
                  className="login-field">
                </input>
              </label>
              <br />
              <label>Password:
                <input type="password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  className="login-field">
                </input>
              </label>
              <br />
              <input type="submit" value={formText}></input>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AuthForm;