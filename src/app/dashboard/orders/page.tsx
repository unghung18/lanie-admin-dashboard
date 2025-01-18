"use client";

import { Card, CardContent } from "@/components/ui/card";

import { getOrders } from "@/api/lanieApi";
import Breadcumb from "@/components/Breadcumb";
import { useEffect, useState } from "react";
import { OrderDataTable } from "./OrderDataTable";
import { columns } from "./columns";

const prevPage = [
  {
    title: "Home",
    href: "/dashboard",
  },
];

const Page = () => {
  const [dataValue, setDataValue] = useState<any>([]);

  async function getData() {
    try {
      const { data } = await getOrders();
      setDataValue(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Breadcumb prevPage={prevPage} currentPage="Orders" />
      <h2 className="text-3xl font-bold tracking-tight my-4">Orders</h2>
      <Card>
        <CardContent className="py-6 w-full">
          <OrderDataTable
            data={dataValue ?? []}
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
