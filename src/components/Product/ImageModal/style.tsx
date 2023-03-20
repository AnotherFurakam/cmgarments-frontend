import styled from "styled-components";

interface StyleInterface {
  addStyle: boolean;
}

const StyleButton = styled.button`
  padding: 3px 16px;
  display: block;
  margin: auto;
  font-size: 14px;
  border: 0;
  outline: none;
  color: #fff;
  background-color: ${(props: StyleInterface) =>
    props.addStyle === true ? "#0dcaf0" : "#111D13"};
  cursor: pointer;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
`;

const StyleDivIcon = styled.div`
  font-size: 95px;
`;

const StyleDivDrop = styled.div`
  background-color: #fff;
  border: ${(props: StyleInterface) =>
    props.addStyle === true ? "5px dashed #bfecf5" : "5px dashed #ddd"};
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
`;

const SDivContainerCarga = styled.div`
  max-height: 220px;
  min-height: 100px;
  padding-left: 30px;
  padding-right: 30px;
`;

const SDivContentForm = styled.div`
  height: 100%;
  border-radius: 16px;
  background-color: #faf8f7;
  box-shadow: 0px 0px 19px 4px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 0px 19px 4px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 19px 4px rgba(0, 0, 0, 0.1);
`;

export {
  StyleButton,
  StyleDivIcon,
  StyleDivDrop,
  SDivContainerCarga,
  SDivContentForm,
};
