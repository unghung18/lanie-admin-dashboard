import { Card, CardContent } from "@/components/ui/card";

import { getOrders } from "@/api/lanieApi";
import Breadcumb from "@/components/Breadcumb";
import { OrderDataTable } from "./OrderDataTable";
import { columns } from "./columns";

async function getData(): Promise<any[]> {
  // Fetch data from your API here.

  const res = await getOrders();
  return res.data;
}

const prevPage = [
  {
    title: "Home",
    href: "/dashboard",
  },
];

const Page = async () => {
  const data = await getData();
  return (
    <>
      <Breadcumb prevPage={prevPage} currentPage="Orders" />
      <h2 className="text-3xl font-bold tracking-tight my-4">Orders</h2>
      <Card>
        <CardContent className="py-6 w-full">
          <OrderDataTable
            data={data}
            columns={columns}
            filterBy="name"
            inputPlaceholder="Filter Order"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
