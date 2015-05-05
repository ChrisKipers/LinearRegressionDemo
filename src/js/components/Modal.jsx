var React = require('react');

var Modal = React.createClass({
  render() {
    return (
      <div className="modalmask">
        <div className="modal">
          <h1 className="modal__header">
            {this.props.header}
            <span class="modal__close" onClick={this.props.onClose}/>
          </h1>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Modal;