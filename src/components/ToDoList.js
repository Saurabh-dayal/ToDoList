import React, { Component } from "react";
import "../css/ToDoList.css";
import { NameModal } from "./NameModal.js";

export default class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      tableData: [],
      completed: [],
      show: true,
      name: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.addItems = this.addItems.bind(this);
    this.completedToggle = this.completedToggle.bind(this);
    this.notcompletedToggle = this.notcompletedToggle.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  completedToggle(action) {
    action === "add"
      ? document
          .querySelectorAll(".completed")
          .forEach((ele) => ele.classList.add("displayNone"))
      : document
          .querySelectorAll(".completed")
          .forEach((ele) => ele.classList.remove("displayNone"));
  }

  notcompletedToggle(action) {
    action === "add"
      ? document
          .querySelectorAll(".notcompleted")
          .forEach((ele) => ele.classList.add("displayNone"))
      : document
          .querySelectorAll(".notcompleted")
          .forEach((ele) => ele.classList.remove("displayNone"));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  addItems(event) {
    event.preventDefault();
    this.completedToggle("remove");
    this.notcompletedToggle("remove");
    this.setState({ tableData: [...this.state.tableData, this.state.value] });
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  updateName(val) {
    this.setState({ name: val });
  }

  render() {
    return (
      <>
        <h1 className="mt-4 mb-1">
          {this.state.name === ""
            ? "TODO List"
            : this.state.name + "'s TODO List"}
        </h1>
        <NameModal
          show={this.state.show}
          handleClose={this.hideModal}
          updateName={this.updateName}
        />
        <form>
          <div className="row justify-content-center">
            <input
              type="text"
              className="col-lg-11 col-md-10 col-sm-8 col-8 form-control taskInput"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="New Task"
            />
            <button
              onClick={this.addItems}
              className="btn btn-success col-lg-1 col-md-2 col-sm-4 col-4"
            >
              Submit
            </button>
          </div>
          <div className="my-3">
            <button
              onClick={(event) => {
                event.preventDefault();
                this.completedToggle("add");
                this.notcompletedToggle("remove");
              }}
              className="btn btn-secondary mx-2 width50"
            >
              Remaining Tasks
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                this.completedToggle("remove");
                this.notcompletedToggle("add");
              }}
              className="btn btn-secondary mx-2 width50"
            >
              Completed Tasks
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                this.completedToggle("remove");
                this.notcompletedToggle("remove");
              }}
              className="btn btn-secondary mx-2 width50"
            >
              All Tasks
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                let tempTableData = [];
                let noofele = this.state.tableData.length;
                for (let i = 0; i < noofele; i++) {
                  if (!this.state.completed.includes(i)) {
                    tempTableData.push(this.state.tableData[i]);
                  }
                }
                this.setState({ tableData: tempTableData, completed: [] });
              }}
              className="btn btn-danger mx-2 width50"
            >
              Delete Completed
            </button>
          </div>
        </form>
        <table className="center taskTable">
          <thead>
            <tr>
              <th className="displayNoneCol">S.No.</th>
              <th>Task</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map((value, key) => {
              return (
                <tr
                  key={key}
                  className={
                    this.state.completed.includes(key)
                      ? "completed"
                      : "notcompleted"
                  }
                >
                  <td className="displayNoneCol">{key + 1}</td>
                  <td>{value}</td>
                  <td>
                    <input
                      type="checkbox"
                      id="completed"
                      name="completed"
                      value="completed"
                      onClick={(event) => {
                        this.setState({
                          completed: [...this.state.completed, key],
                        });
                      }}
                    />
                  </td>
                  <td>
                    <i
                      className="fa fa-trash"
                      onClick={(event) => {
                        let tabData = this.state.tableData;
                        tabData.splice(key, 1);
                        this.setState({ tableData: tabData });
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
