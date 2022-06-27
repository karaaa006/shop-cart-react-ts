import styled from "styled-components";
import { RiStarLine } from "react-icons/ri";

import type { TCartItem } from "../api/api";

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;

  padding: 10px;
  border-radius: 10px;

  box-shadow: 0 5px 10px rgba(0, 0, 100, 0.15);

  overflow: hidden;
`;

const Image = styled.img`
  display: block;

  width: 100%;
  height: 240px;
  object-fit: cover;
  object-position: top;

  margin-bottom: 5px;
`;

const Category = styled.div`
  width: fit-content;

  margin-bottom: 10px;

  color: #c0c0c0;
`;

const MainInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;

  gap: 10px;
`;

const Title = styled.h2`
  margin: 0;

  font-size: 18px;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 600;

  color: #fc8086;
`;

const Descr = styled.div`
  color: #c0c0c0;

  font-size: 14px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 3px;
  margin-bottom: 20px;
`;

const StyledStarIcon = styled(RiStarLine)``;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 20px;
  margin-top: auto;

  background-color: #fc8086;
  color: #ffffff;

  text-transform: uppercase;
  font-size: 16px;

  cursor: pointer;

  :disabled {
    opacity: 0.5;
  }
`;

type Props = {
  product: TCartItem;
  handleAddToCart: (product: TCartItem) => void;
  isInCart: boolean;
};

export const ProductCard = ({ product, isInCart, handleAddToCart }: Props) => {
  return (
    <Wrapper>
      <Image src={product.image} alt={product.title} />
      <Category>{product.category}</Category>
      <MainInfoWrap>
        <Title>{product.title}</Title>
        <Price>${product.price.toFixed(2)}</Price>
      </MainInfoWrap>
      <Descr>{product.description}</Descr>
      <Rating>
        <StyledStarIcon />
        {product.rating.rate} ({product.rating.count})
      </Rating>
      <Button onClick={() => handleAddToCart(product)} disabled={isInCart}>
        Add to cart
      </Button>
    </Wrapper>
  );
};
