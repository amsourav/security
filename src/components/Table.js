import styled from "styled-components";
import { TextMessage, Tile } from "./Panel";

const FullWidthTable = styled("table")`
  width: 100%;

  th:first-child {
    text-align: left;
  }

  td:first-child {
    text-align: left;
  }

  th {
    text-align: right;
  }

  td {
    text-align: right;
  }
`;

function Table({ header, columns = [], rows = [] }) {
  return (
    <Tile>
      <TextMessage alignLeft bold>
        {header}
      </TextMessage>

      <FullWidthTable>
        <thead>
          <tr>
            {columns.map((col) => {
              return <th key={col.id}>{col.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <tr>
                {columns.map((col) => {
                  return <td key={row[col.id]}>{row[col.id]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </FullWidthTable>
    </Tile>
  );
}

export default Table;
