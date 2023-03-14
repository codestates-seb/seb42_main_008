import styled from 'styled-components';

const ListItems = () => {
  return (
    <ItemListsContainer>
      <ListItem>item</ListItem>
      <ListItem>item</ListItem>
      <ListItem>item</ListItem>
      <ListItem>item</ListItem>
      <ListItem>item</ListItem>
    </ItemListsContainer>
  );
};

const ItemListsContainer = styled.section`
  width: 80%;
  border: 3px dotted pink;
  height: fit-content;
  padding: 20px;
  padding-top: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding-top: 80px;
  }
  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ListItem = styled.article`
  width: 100%;
  border: 2px solid red;
`;

export default ListItems;
