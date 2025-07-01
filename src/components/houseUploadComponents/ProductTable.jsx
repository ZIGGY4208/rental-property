import React from "react";
import ProductTableRow from "./ProductTableRow";

const ProductTable = ({ products, showing }) => (
  <div className="overflow-x-auto rounded-xl">
    <table className="min-w-full bg-white">
      <thead>
        <tr className="text-left text-gray-400 text-sm bg-gray-50">
          <th className="py-3 px-4 font-medium">Product Name</th>
          <th className="py-3 px-4 font-medium">Product ID</th>
          <th className="py-3 px-4 font-medium">Price</th>
          <th className="py-3 px-4 font-medium">Stock</th>
          <th className="py-3 px-4 font-medium">Type</th>
          <th className="py-3 px-4 font-medium">Status</th>
          <th className="py-3 px-4 font-medium">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.slice(0, showing).map((product) => (
          <ProductTableRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
