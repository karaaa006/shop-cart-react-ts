import React from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import styled from "styled-components";
import { TCartItem } from "../api/api";
import { CartItem } from "./CartItem";

interface IWrapper {
  isOpen: boolean;
}

const Wrapper = styled.div<IWrapper>`
  position: fixed;
  top: 0;
  right: 0;
  transform: ${({ isOpen }) => !isOpen && "translateX(100%)"};
  z-index: 1;

  width: 450px;
  max-width: 90%;
  height: 100vh;

  padding: 25px;

  box-shadow: -5px 0 5px rgba(0, 0, 100, 0.15);
  background-color: #fc8086;

  transition: transform ease 300ms;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  transform: translateX(-100%);

  padding: 10px 10px 10px 15px;
  border-radius: 50px 0 0 50px;

  box-shadow: -3px 0 5px rgba(0, 0, 100, 0.15);
  background-color: #fc8086;

  cursor: pointer;
`;

const StyledCartIcon = styled(RiShoppingCartLine)`
  fill: #ffffff;
`;

const CartItemsCount = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 20px;

  border-radius: 50px;

  background-color: #ffffff;
  color: #fc8086;
`;

const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  overflow-y: auto;

  font-family: "Source Sans Pro", sans-serif;
  color: #ffffff;
`;

const CartTitle = styled.h2`
  margin: 0;
`;

const EmptyCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const CartItems = styled.ul`
  display: flex;
  flex-direction: column;

  list-style: none;

  gap: 10px;
  margin: 0;
  padding: 0;
`;

const TotalPrice = styled.div`
  margin-top: auto;

  font-size: 25px;
`;

type TProps = {
  isOpen: boolean;
  setIsOpen: (isOpenState: React.SetStateAction<boolean>) => void;
  cartItems: TCartItem[];
  handleSetAmount: (id: number, amount: number) => void;
  handleRemoveFromCart: (id: number) => void;
};

export const Cart = ({
  isOpen,
  setIsOpen,
  cartItems,
  handleSetAmount,
  handleRemoveFromCart,
}: TProps) => {
  const totalPrice = cartItems.reduce(
    (acc, item) => (acc += item.price * item.amount),
    0
  );

  return (
    <Wrapper isOpen={isOpen}>
      <IconWrapper onClick={() => setIsOpen(!isOpen)}>
        <StyledCartIcon />
        <CartItemsCount>
          {cartItems.length > 0 && cartItems.length}
        </CartItemsCount>
      </IconWrapper>
      <CartWrapper>
        <CartTitle>Your shopping cart</CartTitle>
        {cartItems.length > 0 ? (
          <>
            <CartItems>
              {cartItems.map((item) => (
                <CartItem
                  product={item}
                  key={item.id}
                  handleSetAmount={handleSetAmount}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))}
            </CartItems>
            <TotalPrice>Total: ${totalPrice.toFixed(2)}</TotalPrice>
          </>
        ) : (
          <EmptyCart>Cart is empty...</EmptyCart>
        )}
      </CartWrapper>
    </Wrapper>
  );
};
