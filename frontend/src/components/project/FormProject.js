import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import "../Modal.css";

import APIService from "../../APIService";

function FormProject(props) {
  const [ProjectIncidentId, setProjectIncidentId] = useState("");
  const [ProjectDeadline, setProjectDeadline] = useState("");
  const [ProjectDescription, setProjectDescription] = useState("");
  const [ProjectPriority, setProjectPriority] = useState("");
  const [ProjectClosedStatus, setProjectClosedStatus] = useState("");

  const [clients, setClients] = useState([]);

  const [token, setToken] = useCookies(["loginToken"]);

  useEffect(() => {
    // setProjectName(props.ProjectInstance.name);
    setProjectDeadline(props.ProjectInstance.deadline);
    setProjectDescription(props.ProjectInstance.description);
    setProjectPriority(props.ProjectInstance.priority);
    setProjectClosedStatus(props.ProjectInstance.closed_status);
  }, [props.ProjectInstance]);

  // FETCH THE CLIENTS HERE TO BE RENDERED FOR THE DROPDOWN MENU IN THE FORM
  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/client", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${token["loginToken"]}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((response) => setClients(response))
  //     .catch((error) => console.log(error));
  // }, [token]);

  const updateProject = () => {
    APIService.UpdateProject(
      props.ProjectInstance.id,
      {
        incident_id: ProjectIncidentId,
        deadline: ProjectDeadline,
        description: ProjectDescription,
        priority: ProjectPriority,
        closed_status: ProjectClosedStatus,
      },
      token["loginToken"]
    ).then((response) => props.updatedProjects(response));
  };

  const createProject = () => {
    APIService.CreateProject(
      {
        deadline: ProjectDeadline,
        description: ProjectDescription,
        priority: ProjectPriority,
        closed_status: ProjectClosedStatus,
      },
      token["loginToken"]
    ).then((response) => props.createdProject(response));
  };

  return (
    <div className="overlay">
      {props.ProjectInstance ? (
        <div className="mb-3 text-light modal-card">
          <button
            onClick={() => props.setProjectInstance(null)}
            className="btn btn-primary close-btn"
          >
            x
          </button>
          <label htmlFor="description" className="form-label">
            Project Description
          </label>
          <textarea
            className="form-control"
            rows="4"
            id="description"
            placeholder="Enter project's name..."
            value={ProjectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <br />
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            onChange={(e) => setProjectPriority(e.target.value)}
            className="form-select"
            name="priority"
            id="priority"
            value={ProjectPriority}
            // placeholder="Enter Priority"
          >
            <option value="none" selected disabled hidden>
              Select a priority...
            </option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <br />

          <label htmlFor="closed_status" className="form-label">
            Closed Status
          </label>
          <select
            onChange={(e) => setProjectClosedStatus(e.target.value)}
            className="form-select"
            name="closed_status"
            id="closed_status"
            value={ProjectClosedStatus}

          >
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
          <br />


          {/* <select
            onChange={(e) => setProjectClosedStatus(e.target.value)}
            className="form-select"
            name="closed_status"
            id="closed_status"
          >
            <option value="none" selected disabled hidden>
              Select a close status...
            </option>
            {clients.map((client) => {
              return <option value={client.name}>{client.name}</option>;
            })}
          </select>
          <br /> */}

          {props.ProjectInstance.id ? (
            <button onClick={updateProject} className="btn btn-primary">
              Update Project
            </button>
          ) : (
            <button onClick={createProject} className="btn btn-primary">
              Create Project
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default FormProject;
