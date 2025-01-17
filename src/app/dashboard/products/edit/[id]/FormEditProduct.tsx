"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { z } from "zod";

import { updateProduct } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Colors, addProductProps } from "@/types/types";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import ColorSelect from "../../add/ColorSelect";

const formSchema = z.object({
  title: z.string().min(1, { message: "Trường này là bắt buộc" }),
  sizes: z.any().array().nonempty({ message: "Trường này là bắt buộc" }),
  description: z.string().min(1, { message: "Trường này là bắt buộc" }),
  price: z.string().min(1, { message: "Trường này là bắt buộc" }),
  totalQuantity: z.string().min(1, { message: "Trường này là bắt buộc" }),
  category: z.string().min(1, { message: "Trường này là bắt buộc" }),
  colors: z.any().array().nonempty({ message: "Trường này là bắt buộc" }),
  tags: z.string().min(1, { message: "Trường này là bắt buộc" }),
  sale: z.string(),
});

const options = [
  { label: "S", value: "s" },
  { label: "M", value: "m" },
  { label: "L", value: "l" },
  { label: "XL", value: "xl" },
];

interface ImagesDataProps {
  filename: string;
  image: string;
}

export function FormEditProduct({
  data,
  id,
}: {
  data: addProductProps;
  id: string;
}) {
  const oldSizeSelects = data?.sizes.map((item: any) => {
    return {
      label: item.name.toUpperCase(),
      value: item.name,
    };
  });

  const oldColorSelects = data?.colors.map((item: Colors) => {
    return item;
  });

  const oldImageSelects: ImagesDataProps[] = data?.images.map(
    (item: string, i: number) => {
      return {
        filename: `image-${i}.jpg`,
        image: item,
      };
    }
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      sizes: oldSizeSelects,
      description: data.description,
      price: data.price.toString(),
      totalQuantity: data.totalQuantity.toString(),
      colors: oldColorSelects,
      tags: data.tags.toString(),
      sale: data.sale.toString(),
      category: data.category.toString(),
    },
  });

  const [isMounted, setIsMounted] = useState(false);
  const [imagesData, setImagesData] =
    useState<Array<ImagesDataProps>>(oldImageSelects);
  const [loading, setLoading] = useState<Boolean>(false);

  const dragProductItem = useRef<number>(0);
  const dragOverProductItem = useRef<number>(0);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const sizeData = values.sizes.map((item: any) => ({
      name: `${item.value}`,
      quantity: 10,
    }));

    const productImages = imagesData.map((item: any) => `${item.image}`);

    const colorData = values.colors.map((item: any) => `${item._id}`);

    const newData = {
      title: values?.title,
      description: values?.description,
      sizes: sizeData,
      price: Number(values?.price),
      totalQuantity: Number(values?.totalQuantity),
      sale: Number(values?.sale),
      tags: values.tags.split(","),
      colors: colorData,
      images: productImages,
      category: values.category,
    };

    console.log(newData);
    const res = await updateProduct(id, newData);
    console.log(res);
    if (res.error) {
      toast.error(res.error.message, {
        theme: "colored",
      });
    } else {
      toast.success(res.message, {
        theme: "colored",
      });
      router.push("/dashboard/products");
    }
    setLoading(false);
  }

  const onupload = (result: any) => {
    const image = imagesData;
    image.push({
      filename: result.info.original_filename + "." + result.info.format,
      image: result.info.secure_url,
    });
    setImagesData([...image]);
  };

  const handleDeleteFile = (i: ImagesDataProps) => {
    const image = imagesData;
    const filteredItems = image.filter((item) => item !== i);
    setImagesData([...filteredItems]);
  };

  const handleSortImage = () => {
    const imagesClone = [...imagesData];
    const temp = imagesClone[dragProductItem.current];
    imagesClone[dragProductItem.current] =
      imagesClone[dragOverProductItem.current];
    imagesClone[dragOverProductItem.current] = temp;
    setImagesData(imagesClone);
  };

  useEffect(() => setIsMounted(true), []);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Title <span className="text-[red]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="eg: Đầm xuông" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Description <span className="text-[red]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your description here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }: { field: any }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Sizes <span className="text-[red]">*</span>
                  </FormLabel>
                  <FormControl>
                    {isMounted && (
                      <Select
                        isMulti
                        options={options}
                        {...field}
                        placeholder="Select ..."
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Price <span className="text-[red]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="eg: 3000000" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalQuantity"
              render={({ field }: { field: any }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Quantity <span className="text-[red]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="eg: 10" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Color <span className="text-[red]">*</span>
                  </FormLabel>
                  <FormControl>
                    {isMounted && <ColorSelect field={field} />}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Tags <span className="text-[red]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="eg: dam xuong, đầm xuông" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sale"
              render={({ field }: { field: any }) => (
                <FormItem className="w-full">
                  <FormLabel>SALE</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: 10%" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }: { field: any }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Category <span className="text-[red]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="eg: Dress" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Card>
            <CardContent className="py-6 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                <CldUploadWidget uploadPreset="ze0kziqp" onUpload={onupload}>
                  {({ open }: { open: any }) => {
                    function handleOnclick(e: React.MouseEvent<HTMLElement>) {
                      e.preventDefault();
                      open();
                    }
                    return (
                      <div className="flex items-center justify-center border-[2px] border-gray-400 border-dashed w-full h-full min-h-[100px]">
                        <Button
                          variant={"destructive"}
                          onClick={handleOnclick}
                          className="max-w-[200px]"
                        >
                          <FaCloudUploadAlt size={20} className="mr-1" />
                          <span>Upload file</span>
                        </Button>
                      </div>
                    );
                  }}
                </CldUploadWidget>
                <div className="h-[300px] overflow-auto space-y-4">
                  {imagesData?.map((image: any, i: number) => (
                    <div
                      key={i}
                      className="grid grid-cols-3 items-center gap-2 rounded-[5px] overflow-hidden border-[1px] border-gray-300"
                      draggable
                      onDragStart={() => (dragProductItem.current = i)}
                      onDragEnter={() => (dragOverProductItem.current = i)}
                      onDragEnd={handleSortImage}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <img
                        src={image.image}
                        alt="product image"
                        className="w-[50px] md:w-[70px]"
                      />
                      <span className="flex-1">
                        {image.filename.charAt(0).toUpperCase() +
                          image.filename.slice(1)}
                      </span>
                      <div
                        className="w-[30px] h-[30px] flex justify-center items-center border-[2px] border-gray-400 mr-2 rounded-sm"
                        onClick={() => handleDeleteFile(image)}
                      >
                        <MdDelete
                          size={20}
                          color=""
                          className="cursor-pointer text-red-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <Button disabled={true}>
              <span className="loader"></span>
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
    </>
  );
}
