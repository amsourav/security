import styled from "styled-components";

const Spinner = styled("div")`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: ${(props) => (props.size ? props.size : "2rem")};
  height: ${(props) => (props.size ? props.size : "2rem")};
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
