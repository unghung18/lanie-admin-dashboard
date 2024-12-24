import { Card, CardContent } from "@/components/ui/card";

import { getAccounts } from "@/api/lanieApi";
import Breadcumb from "@/components/Breadcumb";
import { Colors } from "@/types/types";
import { AccountDataTable } from "./AccountDataTable";
import { columns } from "./columns";

async function getData(): Promise<Colors[]> {
  // Fetch data from your API here.

  const res = await getAccounts();
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
      <Breadcumb prevPage={prevPage} currentPage="Accounts" />
      <h2 className="text-3xl font-bold tracking-tight my-4">Accounts</h2>
      <Card>
        <CardContent className="py-6 w-full">
          <AccountDataTable
            data={data}
            columns={columns}
            filterBy="name"
            inputPlaceholder="Filter Account"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
