import ProductItem from "./ProductItem";

interface ProductItem {
  id: number;
  name: string;
  productionDate: string;
  expiryDate: string;
  price: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  imageUrl: string | null;
  categoryResponse: any;
}

interface ProductListProps {
  products: ProductItem[];
  layout: "grid" | "list";
}

const ProductList: React.FC<ProductListProps> = ({ products, layout }) => {
  return (
    <div className={`group ${layout === "grid" ? "gridView" : "listView"}`}>
      <div
        className={`grid ${
          layout === "grid" &&
          "md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-5"
        } `}
        id="cardGridView"
      >
        {products.map((item) => {
          return (
            <ProductItem
              key={item.id}
              id={item.id}
              image={item.imageUrl}
              label={item.name}
              normalPrice={item.price}
              discountPrice={item.discountedPrice}
              expiryDate={item.expiryDate}
              layout={layout}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
