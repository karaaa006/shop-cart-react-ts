import styled from "styled-components";
import { TCartItem } from "../api/api";
import { CartItemCounter } from "./CartItemCounter";

const Wrapper = styled.li`
  display: grid;
  grid-template-columns: 2fr 1fr;

  border-radius: 5px;
  padding: 10px;
  gap: 10px;

  background-color: #ffffff;
  color: #000000;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin-bottom: 10px;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 10px;
`;

const PricePerOnce = styled.div`
  color: #c0c0c0;
`;

const RemoveBtn = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;

  cursor: pointer;
`;

const TotalPrice = styled.div``;

const Image = styled.img`
  width: 100%;
  height: 150px;

  object-fit: cover;
  object-position: top;
`;

interface IProps {
  product: TCartItem;
  handleSetAmount: (id: number, amount: number) => void;
  handleRemoveFromCart: (id: number) => void;
}

export const CartItem = ({
  product,
  handleSetAmount,
  handleRemoveFromCart,
}: IProps) => {
  return (
    <Wrapper>
      <Info>
        <Title>{product.title}</Title>
        <PriceWrapper>
          <PricePerOnce>Price: ${product.price.toFixed(2)}</PricePerOnce>
          <TotalPrice>
            Total: ${(product.price * product.amount).toFixed(2)}
          </TotalPrice>
        </PriceWrapper>
        <CartItemCounter
          count={product.amount}
          setCount={handleSetAmount}
          id={product.id}
        />
        <RemoveBtn onClick={() => handleRemoveFromCart(product.id)}>
          Remove
        </RemoveBtn>
      </Info>
      <Image src={product.image} alt={product.title} />
    </Wrapper>
  );
};
