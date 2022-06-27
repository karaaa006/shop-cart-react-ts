// types
export type TCartItem = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  amount: number;
};

interface fetchProducts {
  getProducts: () => Promise<TCartItem[]>;
}

const productsApi: fetchProducts = {
  getProducts: async () => {
    const products = await (
      await fetch("https://fakestoreapi.com/products")
    ).json();

    return products;
  },
};

export default productsApi;
