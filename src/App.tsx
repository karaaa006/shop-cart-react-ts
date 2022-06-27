import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import type { TCartItem } from "./api/api";
import productsApi from "./api/api";
import { Cart } from "./components/Cart";
import { ProductCard } from "./components/ProductCard";

const Wrapper = styled.div`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
`;

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 20px;
  padding: 0;
  margin: 0;

  font-family: "Source Sans Pro", sans-serif;

  list-style: none;
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);

  const { data, isLoading, error } = useQuery<TCartItem[]>(
    "products",
    productsApi.getProducts
  );

  const handleAddToCart = (clickedItem: TCartItem) =>
    setCartItems((prevState) => [...prevState, { ...clickedItem, amount: 1 }]);

  const handleRemoveFromCart = (id: number) =>
    setCartItems((prevState) => prevState.filter((item) => item.id !== id));

  const handleSetAmount = (id: number, amount: number) => {
    if (amount > 0)
      setCartItems((prevState) => {
        const newState = prevState.map((item) => {
          if (item.id === id) return { ...item, amount };

          return item;
        });

        return newState;
      });
  };

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error :(</>;

  return (
    <Wrapper>
      <Cart
        cartItems={cartItems}
        isOpen={cartOpen}
        setIsOpen={setCartOpen}
        handleSetAmount={handleSetAmount}
        handleRemoveFromCart={handleRemoveFromCart}
      />

      <ProductList>
        {data?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
            isInCart={cartItems.some((item) => item.id === product.id)}
          />
        ))}
      </ProductList>
    </Wrapper>
  );
};

export default App;
