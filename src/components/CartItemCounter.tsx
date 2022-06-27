import styled from "styled-components";

interface ICounter {
  id: number;
  count: number;
  setCount: (id: number, amount: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
`;

const CountBtn = styled.button`
  width: 60px;
  height: 30px;

  border: none;
  border-radius: 5px;

  cursor: pointer;
`;

export const CartItemCounter = ({ id, count, setCount }: ICounter) => {
  return (
    <Wrapper>
      <CountBtn onClick={() => setCount(id, count - 1)}>-</CountBtn>
      {count}
      <CountBtn onClick={() => setCount(id, count + 1)}>+</CountBtn>
    </Wrapper>
  );
};
