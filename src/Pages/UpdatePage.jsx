import React from "react";
import ProductForm from "../components/ProductForm";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function UpdatePage() {
  const { productId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/products/${productId}`
      );
      const parsed = await response.json();
      setProduct(parsed);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <ProductForm
      productTitle={product.title}
      productPrice={product.price}
      isUpdating
      productId={productId}
    />
  );
}
