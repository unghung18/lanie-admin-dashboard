"use client";

import { changeStatusOrder, getOneOrder } from "@/api/lanieApi";
import Breadcumb from "@/components/Breadcumb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const [orderDetail, setOrderDetail] = useState<any>(null);

  async function getData(): Promise<any> {
    const { data } = await getOneOrder(params.id);
    setOrderDetail(data);
  }

  const prevPage = [
    {
      title: "Home",
      href: "/dashboard",
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const colorText = (text: string) => {
    if (text === "PENDING") {
      return <div>Chờ xác nhận</div>;
    } else if (text === "PROCESSING") {
      return <div>Đang xử lý</div>;
    } else if (text === "COMPLETED") {
      return <div>Đã giao</div>;
    } else if (text === "CANCELLED") {
      return <div>Hủy</div>;
    } else {
      return null;
    }
  };

  const updateStatusOrder = async (status: string) => {
    try {
      const res = await changeStatusOrder(params.id, {
        status,
      });
      if (res.error) {
        toast.error(res.error.message, {
          theme: "colored",
        });
      } else {
        toast.success(res.message, {
          theme: "colored",
        });
        getData();
      }
    } catch (error) {}
  };

  return (
    <>
      <Breadcumb prevPage={prevPage} currentPage="View Order" />
      <h2 className="text-3xl font-bold tracking-tight my-4">View Order</h2>
      <Card>
        <CardContent className="py-6 w-full h-full">
          <div className="text-center text-[20px] font-semibold uppercase font-mono mb-10">
            Chi tiết đơn hàng
          </div>

          <div className="grid grid-cols-2 gap-20 mb-10">
            <div className="flex flex-col space-y-2">
              <div className="text-[#5388c1] text-[18px] font-semibold mb-4">
                Thông tin mua hàng
              </div>
              <span>Ngày tạo: {orderDetail?.order_date}</span>
              <span>Tên người nhận: {orderDetail?.customer_name}</span>
              <span>Email: a@gmail.com</span>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="text-[#5388c1] text-[18px] font-semibold mb-4">
                Địa chỉ nhận hàng
              </div>
              <span>Số điện thoại: 0123456789</span>
              <span>Địa chỉ: {orderDetail?.shipping_address}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="text-[#5388c1] text-[18px] font-semibold mb-4">
              Chi tiết đơn hàng
            </div>
            <div className="w-full border-[1px] border-solid mb-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] whitespace-nowrap">
                      Ảnh sản phẩm
                    </TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Màu</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Tổng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderDetail?.products?.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <img
                          width={50}
                          height={50}
                          src={item?.product?.images[0]}
                          alt="product image"
                        />
                      </TableCell>
                      <TableCell>{item.product.title}</TableCell>
                      <TableCell>
                        {`${item.product.price.toLocaleString()}₫`}
                      </TableCell>
                      <TableCell>{item.order_color.order_size}</TableCell>
                      <TableCell>{item.order_color.order_colorName}</TableCell>
                      <TableCell>{item.order_color.order_quantity}</TableCell>
                      <TableCell>
                        {`${(
                          item.product.price * item.order_color.order_quantity
                        ).toLocaleString()}₫`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <span className="font-medium">
              Tạm tính: {`${orderDetail?.total_amount.toLocaleString()}₫`}
            </span>
            <span className="font-medium text-[#FF0000]">
              Giảm giá: {`-${0}₫`}
            </span>
            <span className="font-medium">
              Tổng cộng: {`${orderDetail?.total_amount.toLocaleString()}₫`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-20 my-10">
            <div className="flex flex-col space-y-2 items-center">
              <div className="text-[#5388c1] text-[18px] font-semibold mb-1">
                Trạng thái thanh toán
              </div>
              <span>Đã thanh toán</span>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="text-[#5388c1] text-[18px] font-semibold mb-1">
                Trạng thái đơn hàng
              </div>
              {colorText(orderDetail?.status)}
            </div>
          </div>
          <div className="flex items-center justify-center gap-5">
            {orderDetail?.status === "PENDING" && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button className="bg-[#0078D4]">Xác nhận đơn hàng</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Bạn có chắc chắn muốn xác nhận đơn hàng này không?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Đơn hàng sẽ được xác nhận và chuyển đến cho đơn vị giao
                      hàng.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => updateStatusOrder("PROCESSING")}
                    >
                      Đồng ý
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {orderDetail?.status === "PROCESSING" && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button className="bg-[#0078D4]">Tiến hành giao hàng</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Bạn có chắc chắn muốn giao đơn hàng này không?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Hành động này sẽ tiến hành xác nhận đơn hàng và chuyển
                      sang cho đơn vị vận chuyển
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => updateStatusOrder("COMPLETED")}
                    >
                      Đồng ý
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {orderDetail?.status === "PENDING" && (
              <Button
                variant="secondary"
                onClick={() => updateStatusOrder("CANCELLED")}
              >
                Hủy bỏ
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
