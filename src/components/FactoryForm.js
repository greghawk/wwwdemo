import React from "react";
import PropTypes from "prop-types";

class FactoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  validateEntries(candidate) {
    let errors = [];
    const ub = parseInt(candidate.upperbound);
    const lb = parseInt(candidate.lowerbound);
    const cc = parseInt(candidate.childcount);

    if (ub - lb < 0){
      errors.push(`Upper Bound cannot be lower than Lower Bound.  `);
      return errors;
    }

    if ((1 + ub - lb) - cc < 0)
      errors.push(`Cannot create the number of children asked for. Max for these bounds is ${ub - lb + 1}.`);

    return errors;
  }

  handleSubmit(event) {
    const validationResult = this.validateEntries(this.props.currentFactory);

    if (validationResult.length === 0) {
      const isEdit = this.props.currentFactory.id.length > 0;
      isEdit ? this.props.updateFactory(this.props.currentFactory) : this.props.createFactory(this.props.currentFactory);
    } else {
      this.props.processErrors(validationResult);
    }

    event.preventDefault();
  }

  handleInputChange(event) {
    this.props.dataChange(event.target.id, event.target.value);
  }

  render() {
    let {currentFactory} = this.props;

    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <h2>{currentFactory.id.length > 0 ? `Edit ${currentFactory.name}` : `Add New Factory`}</h2>
        <input id="id" value={currentFactory.id} style={{display: 'none'}} onChange={this.handleInputChange}/>
        <p>
          <label htmlFor="factoryName">Factory Name</label>
          <input id="name" required value={currentFactory.name} onChange={this.handleInputChange}/></p>
        <p><label htmlFor="upperbound">Upper Bound</label>
          <input id="upperbound" type="number" min="1" required value={currentFactory.upperbound}
                 onChange={this.handleInputChange}/></p>
        <p><label htmlFor="lowerbound">Lower Bound</label>
          <input id="lowerbound" type="number" min="0" required value={currentFactory.lowerbound}
                 onChange={this.handleInputChange}/></p>
        <p><label htmlFor="childcount">Number of Children</label>
          <input id="childcount" type="number" required min="1" max="15" value={currentFactory.childcount}
                 onChange={this.handleInputChange}/></p>
        <p>
          <input type="submit" value="Save" className="button"/>
          <button onClick={this.props.exitModal} className="button cancel">Cancel</button>
        </p>
        <div className="errorText">{currentFactory.errors.concat()}</div>
      </form>
    );
  }
}

FactoryForm.propTypes = {
  createFactory: PropTypes.func.isRequired,
  updateFactory: PropTypes.func.isRequired,
  dataChange: PropTypes.func.isRequired,
  processErrors: PropTypes.func.isRequired,
  exitModal: PropTypes.func.isRequired,
  currentFactory: PropTypes.object.isRequired
};

export default FactoryForm
