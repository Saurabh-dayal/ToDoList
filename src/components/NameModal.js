import React, { Component } from "react";
import "../css/NameModal.css";

export class NameModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    const showHideClassName = this.props.show
      ? "modal display-block"
      : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="row">
            <i
              className="fa fa-times col-12 close-btn"
              onClick={this.props.handleClose}
            ></i>
          </div>
          <div className="row justify-content-center width100 mt-2">
            <label htmlFor="name" className="col-2 pt-2 disappear">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control col-10"
              value={this.state.value}
              onChange={this.handleChange}
              style={{ width: "45%" }}
              placeholder="Enter Name"
            />
          </div>
          <button
            className="btn btn-success mt-3"
            onClick={(event) => {
              event.preventDefault();
              this.props.updateName(this.state.name);
              this.props.handleClose();
            }}
          >
            Submit
          </button>
        </section>
      </div>
    );
  }
}
