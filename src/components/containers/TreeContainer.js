import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/treeActions';
import Tree from '../Tree';
import Modal from 'react-modal';
import FactoryForm from '../FactoryForm'

//Modal.setAppElement('#modal');

const modalStyle = {
  content: {
    width: '300px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '8px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
    backgroundColor: '#1e1f42',
    color: '#fff'
  }
};

export class TreeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createFactory = this.createFactory.bind(this);
    this.editFactory = this.editFactory.bind(this);
    this.updateFactory = this.updateFactory.bind(this);
    this.synchCurrentFactory = this.synchCurrentFactory.bind(this);
    this.processErrors = this.processErrors.bind(this);
  }

  showModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  createFactory = event => {
    this.props.actions.createFactory(event);
    this.props.actions.resetCurrentFactory();
    this.closeModal();
  };

  synchCurrentFactory = (target, value) => {
    this.props.actions.synchCurrentFactory(target, value);
  };

  updateFactory = factory => {
    this.props.actions.updateFactory(factory);
    this.props.actions.resetCurrentFactory();
    this.closeModal();
  };

  editFactory = factory => {
    this.props.actions.editFactory(factory);
    this.showModal();
  };

  processErrors = errors =>{
    this.props.actions.processErrors(errors);
  };

  render() {
    let {tree} = this.props;
    return (
      <div className={this.props.className}>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={modalStyle}>
          <FactoryForm currentFactory={tree.currentFactory} createFactory={this.createFactory}
                       updateFactory={this.updateFactory} dataChange={this.synchCurrentFactory} exitModal={this.closeModal} processErrors={this.processErrors}/>
        </Modal>
        <Tree
          onShowModal={this.showModal}
          onShowEditModal={this.editFactory}
          tree={tree}
          onReset = {this.props.actions.resetSystem}
        />
      </div>
    );
  }
}

TreeContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  tree: PropTypes.object.isRequired,
  className: PropTypes.string
};

function mapStateToProps(state) {
  return {
    tree: state.tree
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeContainer);
