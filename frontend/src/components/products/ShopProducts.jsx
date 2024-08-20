import React, { useState, useEffect } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_card,
  add_to_wishlist,
  messageClear,
} from "../../store/reducers/cardReducer";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ShopProducts = ({ styles, products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { errorMessage, successMessage } = useSelector((state) => state.card);

  const [selectedSizes, setSelectedSizes] = useState(
    products.map((p) => p.sizes[0])
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const handleSizeChange = (index, size) => {
    const newSizes = [...selectedSizes];
    newSizes[index] = size;
    setSelectedSizes(newSizes);
  };

  const add_wishlist = (product) => {
    if (userInfo) {
      dispatch(
        add_to_wishlist({
          userId: userInfo.id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          discount: product.discount,
          rating: product.rating,
          slug: product.slug,
          size: selectedSizes[products.indexOf(product)],
        })
      );
    } else {
      navigate("/login");
    }
  };

  const add_card = (product) => {
    const selectedSize = selectedSizes[products.indexOf(product)];
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity: 1,
          productId: product._id,
          size: selectedSize,
        })
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2"
      } gap-3 `}
    >
      {products.map((p, i) => (
        <div
          key={i}
          className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${
            styles === "grid"
              ? "flex-col justify-start items-start"
              : "justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start"
          } w-full gap-4 bg-white p-1 rounded-md`}
        >
          <div
            className={
              styles === "grid"
                ? "w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden"
                : "md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden"
            }
          >
            <img
              className="h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-cover"
              src={p.images[0]}
              alt=""
            />

            <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
              <li
                onClick={() => add_wishlist(p)}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaRegHeart />
              </li>

              <Link
                to={`/product/details/${p.slug}`}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaEye />
              </Link>
              <li
                onClick={() => add_card(p)}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <RiShoppingCartLine />
              </li>
            </ul>
          </div>
          <div className="flex justify-start items-start flex-col gap-1">
            <h2 className="font-bold">{p.name} </h2>
            <div className="flex justify-start items-center gap-3">
              <span className="text-md font-semibold">Rp{p.price}</span>
              <div className="flex">
                <Rating ratings={p.rating} />
              </div>
            </div>
            <select
              value={selectedSizes[i]}
              onChange={(e) => handleSizeChange(i, e.target.value)}
              className="mt-2 p-1 border rounded"
            >
              {p.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
