import { getOneProduct } from "@/api/lanieApi";
import Breadcumb from "@/components/Breadcumb";
import { Card, CardContent } from "@/components/ui/card";
import { addProductProps } from "@/types/types";
import { FormEditProduct } from "./FormEditProduct";

const Page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  async function getData(): Promise<addProductProps> {
    const res = await getOneProduct(params.id);
    return res.data;
  }

  const data = await getData();

  const prevPage = [
    {
      title: "Home",
      href: "/dashboard",
    },
    {
      title: "Product",
      href: "/dashboard/products",
    },
  ];

  return (
    <>
      <Breadcumb prevPage={prevPage} currentPage="Edit Product" />
      <h2 className="text-3xl font-bold tracking-tight my-4">Edit Product</h2>
      <Card>
        <CardContent className="py-6 w-full">
          <FormEditProduct data={data} id={params.id} />
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
