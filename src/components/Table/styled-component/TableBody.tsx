import styled from "styled-components";

const TableBody = styled.tbody`
  & tr {
    /* border-bottom: 2px solid #2471ffab; */
    & td {
      padding: 16px 0;
      text-align: center;
      min-width: 200px;
      max-width: 500px;
    }
  }
`;

export default TableBody;
