import React from "react";
import styled from "styled-components";
import dateFormat from "dateformat";

const StyledProjectDetail = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);

  .project-detail-card {
    background-color: rgb(20, 26, 31);
    width: 400px;
    padding: 1em 2em;
    position: relative;
  }
`;

const DetailProject = (props) => {
  return (
    <StyledProjectDetail>
      <div className="project-detail-card text-white">
        <div className="project-detail">
          <div className="project-detail-header d-flex align-items-center justify-content-between">
            <h3>Incident Details</h3>
            <button
              onClick={() => props.setActiveProject(null)}
              className="btn btn-primary"
            >
              x
            </button>
          </div>
          <hr />
          <h5><strong>Incident ID: </strong>{props.ActiveProject.incident_id}</h5>
          <h5><strong>Incident priority: </strong>{props.ActiveProject.priority}</h5>
          <h5>
            <strong>Status: </strong>{String(props.ActiveProject.closed_status)}
          </h5>
          <h5><strong>Reported Date: </strong>{dateFormat(props.ActiveProject.reported_on, "mmmm dS, yyyy")}</h5>
          <h5><strong>Incident Details: </strong>{props.ActiveProject.description}</h5>
        </div>
        <br />
        <br />
       
      </div>
    </StyledProjectDetail>
  );
};

export default DetailProject;
