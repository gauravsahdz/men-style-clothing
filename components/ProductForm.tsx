import Image from "next/image";
import React, { useEffect, useState } from "react";
import productList from "@/app/api/products.json";

type ProductFormProps = {
  id?: string;
  task?: string;
};

const ProductForm = ({ id, task }: ProductFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [price, setPrice] = useState(0);
  const [sizes, setSizes] = useState<string[]>([]);
  const [hovered, setHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imageList, setImageList] = useState<File[]>([]);

  const handleImageInputChange = (event: any) => {
    event.preventDefault();
    const file = event.target.files[0];
    setImageList([...imageList, file]);
    event.target.value = null; // Reset the input field to allow selecting the same file again
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    setHovered(true);
  };

  const handleDragLeave = () => {
    setHovered(false);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    setHovered(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      title,
      description,
      thumbnail,
      brand,
      category,
      stock,
      discountPercentage,
      price,
      sizes,
      images: imageList,
    };

    if (task === "Update" && id) {
    } else {
    }
  };

  useEffect(() => {
    if (id) {
      // Fetch product details by id
      const product = productList.find((product) => product.id === id);
      if (product) {
        setTitle(product.title);
        setThumbnail(product.thumbnail);
        setBrand(product.brand);
        setCategory(product.category);
        setStock(product.stock);
        setDescription(product.description);
        setSizes(product.sizes);
        setPrice(product.price);
        setDiscountPercentage(
          product.discountPercentage ? product.discountPercentage : 0
        );
        setImageList(product.images.map((image) => new File([], image)));
        setSelectedFile(new File([], product.thumbnail));
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">{task} Product</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-screen-xl w-full mt-6 mb-6"
      >
        {/* title section  */}
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter the product title"
            required
          />
        </div>

        {/* description section  */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter the product description"
            required
          />
        </div>

        {/* brand section  */}
        <div className="mb-4">
          <label htmlFor="brand" className="block font-medium text-gray-700">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        {/* category section  */}
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Select a category</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Hoodie">Hoodie</option>
            <option value="Sweatshirt">Sweatshirt</option>
          </select>
        </div>

        {/* stock section  */}
        <div className="mb-4">
          <label htmlFor="stock" className="block font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={stock}
            onChange={(event) => setStock(parseInt(event.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        {/* discount section  */}
        <div className="mb-4">
          <label
            htmlFor="discountPercentage"
            className="block font-medium text-gray-700"
          >
            Discount Percentage
          </label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={discountPercentage}
            onChange={(event) =>
              setDiscountPercentage(parseInt(event.target.value))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        {/* price section  */}
        <div className="mb-4">
          <label htmlFor="price" className="block font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(event) => setPrice(parseInt(event.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        {/* sizes section  */}
        <div className="mb-4">
          <label htmlFor="sizes" className="block font-medium text-gray-700">
            Sizes <span className="text-gray-400">(comma separated)</span>
          </label>
          <input
            type="text"
            id="sizes"
            name="sizes"
            value={sizes}
            onChange={(event) => setSizes(event.target.value.split(","))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        {/* thumbnail section  */}
        <div className="mb-4">
          <label
            htmlFor="thumbnail"
            className="block font-medium text-gray-700"
          >
            Thumbnail
          </label>
          <div className="flex flex-row justify-center items-center">
            <label
              className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none 
              ${hovered ? "border-blue-400" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="w-1/2 p-2 text-center">
                {selectedFile ? (
                  <p className="text-gray-600 md:text-sm text-xs truncate sm:text-base">
                    {selectedFile.name}
                  </p>
                ) : (
                  <span className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="font-medium text-gray-600">
                      Drop files to Attach, or
                      <span className="text-blue-600 underline"> browse</span>
                    </span>
                  </span>
                )}
                <input
                  type="file"
                  name="file_upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </label>
            <div className="w-1/2 p-2">
              {thumbnail && (
                <Image
                  src={thumbnail}
                  alt="Thumbnail"
                  className="max-w-full max-h-32"
                  width={100}
                  height={100}
                />
              )}
            </div>
          </div>
        </div>

        {/* add more images section  */}
        <div className="mb-4">
          {imageList.length > 0 && (
            <div>
              <p className="font-medium text-gray-700 md:text-sm text-xs sm:text-base">
                Added Images:
              </p>
              <ul>
                {imageList.map((image, index) => (
                  <li key={index}>
                    <span className="text-gray-600 md:text-sm text-xs truncate sm:text-base mr-2">
                      {image.name}
                    </span>
                    {id ? (
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => {
                          setImageList(imageList.filter((_, i) => i !== index));
                        }}
                      >
                        Remove
                      </button>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mb-4">
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              const newInput = document.createElement("input");
              newInput.type = "file";
              newInput.name = "images";
              newInput.className =
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2";
              newInput.onchange = handleImageInputChange;
              newInput.click();
            }}
          >
            Add More Images
          </button>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {task} Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
