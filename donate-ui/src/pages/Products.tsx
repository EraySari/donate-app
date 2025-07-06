import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import ProductFilter from "../ui/ProductFilter";
import ProductList from "../ui/ProductsList";
import {
  getAllDonatedProducts,
  getAllProducts,
  searchProduct,
} from "../store/ProductStore/Products/thunks";
import Button from "../ui/Button";
import { hasPermission } from "../utils/permissionUtils";
import { SuccesNotafication } from "../Toast-Notification/SuccesNotification";

const Products = () => {
  const dispatch = useAppDispatch();

  // normal product ve searchin loading vs ayir
  const {
    productsArr,
    searchProducts,
    loading,
    number,
    size,
    totalPages,
    totalElements,
  } = useAppSelector((state: any) => state.Product);
  const { role, token, isLogged } = useAppSelector((state) => state.Auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [donateProducts, setDonateProducts] = useState(false);

  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  console.log(donateProducts);
  useEffect(() => {
    if (
      debouncedSearchTerm.trim() !== "" &&
      hasPermission(role, "view:products")
    ) {
      dispatch(searchProduct(debouncedSearchTerm));
    } else {
      {
        if (
          hasPermission(role, "view:donateProducts") &&
          !hasPermission(role, "view:products")
        ) {
          // Bu sadece BENEFACTOR için geçerli: sadece bağış ürünlerini görebilir
          dispatch(getAllDonatedProducts({ page: pageNumber }));
        } else if (hasPermission(role, "view:products")) {
          // USER burada olacak: donateProducts kontrolüne göre yönlendir
          if (donateProducts) {
            dispatch(getAllDonatedProducts({ page: pageNumber }));
          } else {
            dispatch(getAllProducts({ page: pageNumber }));
          }
        }
      }
    }
  }, [dispatch, pageNumber, size, debouncedSearchTerm, donateProducts, role]);

  const showResults = searchTerm ? searchProducts : productsArr;

  return (
    <div className="group-data-[sidebar-size=lg]:ltr:md:ml-vertical-menu group-data-[sidebar-size=lg]:rtl:md:mr-vertical-menu group-data-[sidebar-size=md]:ltr:ml-vertical-menu-md group-data-[sidebar-size=md]:rtl:mr-vertical-menu-md group-data-[sidebar-size=sm]:ltr:ml-vertical-menu-sm group-data-[sidebar-size=sm]:rtl:mr-vertical-menu-sm pt-[calc(theme('spacing.header')_*_1)] pb-[calc(theme('spacing.header')_*_0.8)] px-4 group-data-[navbar=bordered]:pt-[calc(theme('spacing.header')_*_1.3)] group-data-[navbar=hidden]:pt-0 group-data-[layout=horizontal]:mx-auto group-data-[layout=horizontal]:max-w-screen-2xl group-data-[layout=horizontal]:px-0 group-data-[layout=horizontal]:group-data-[sidebar-size=lg]:ltr:md:ml-auto group-data-[layout=horizontal]:group-data-[sidebar-size=lg]:rtl:md:mr-auto group-data-[layout=horizontal]:md:pt-[calc(theme('spacing.header')_*_1.8)] group-data-[layout=horizontal]:px-3 group-data-[layout=horizontal]:group-data-[navbar=hidden]:pt-[calc(theme('spacing.header')_*_0.9)]">
      <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto my-16 flex flex-col gap-5">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
          <div className="xl:col-span-3">
            <ProductFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setDonateProducts={setDonateProducts}
              donateProducts={donateProducts}
            />
          </div>

          <div className="xl:col-span-9 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="grow text-lg font-semibold text-gray-600">
                Showing{" "}
                <b className="text-xl text-gray-700">
                  {size * pageNumber} -{" "}
                  {size * pageNumber + size >= totalElements
                    ? totalElements
                    : size * pageNumber + size}
                </b>{" "}
                products out of {totalElements}
              </p>
            </div>
            {loading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-3 border-green-900 mx-auto" />
            ) : (
              <ProductList products={showResults} />
            )}
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          {Array.from({ length: totalPages }, (_, index) => {
            return (
              <Button
                variation="pagination"
                onClick={() => setPageNumber(index)}
                disabled={index === pageNumber}
              >
                {index + 1}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
