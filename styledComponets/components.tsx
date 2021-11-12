import styled from "styled-components";

export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 3px;
  color: #380B61;
`;

export const Subtitle = styled.div`
  cursor: pointer;
  font-size: 18px;
  margin-bottom: 20px;
  text-decoration: underline;
`;

export const ListItemLink = styled.div`
  cursor: pointer;
  padding: 12px;
  margin-bottom: 15px;
  background-color: #ECCFF4;
  border-radius: 16px;
  display: flex;
  align-items: center;
`;

export const Tag = styled.div`
  padding: 6px;
  background-color: #feffc7;
  border-radius: 12px;
  display: inline-block;
  font-size: 10px;
  margin-right: 4px;
  &:first-child {
    margin-left: 12px;
  }
`;

export const FilterGroup = styled.div`
  margin-bottom: 50px
`;

export const FilterWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
`;

export const FilterItem = styled.div`
  margin-right: 8px;
  margin-bottom: 8px;
  display: flex;
`;