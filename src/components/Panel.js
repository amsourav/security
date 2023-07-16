import styled from "styled-components";

export const Tile = styled("div")`
  flex: 1 1 100%;
  margin: 1rem;
  padding: 1.5rem;
  min-width: 12rem;
  border: 2px solid black;
  border-radius: 5px;
`;

export const HeroNumber = styled("div")`
  font-size: 5rem;
  color: ${(props) => (props.error ? "rgb(220 38 37)" : "rgb(217 119 4)")};
  padding-bottom: 1rem;
`;

export const TextMessage = styled("div")`
  font-size: 1.25rem;
  line-height: 1.5;
  font-weight: ${(props) => (props.bold ? "bold" : "")};
  text-align: ${(props) => (props.alignLeft ? "left" : "")};
`;

function Panel({ error = false, label, count = 0 }) {
  return (
    <Tile>
      <HeroNumber error={error}>{count}</HeroNumber>
      <TextMessage>{label}</TextMessage>
    </Tile>
  );
}

export default Panel;
