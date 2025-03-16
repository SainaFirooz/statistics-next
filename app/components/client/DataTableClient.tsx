"use client";
import React, { useState } from "react";
import { WeeklyData } from "../weeklyData/weeklyData.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DataTableClientProps {
  initialData: WeeklyData[];
}

export function DataTableClient({ initialData }: DataTableClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalItems = initialData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = initialData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <Card className="bg-white dark:bg-grey-800 border dark:border-grey-500 pb-6 gap-6 min-w-[706px] min-h-[789px]">
      <CardHeader>
        <CardTitle className="font-bold">Total</CardTitle>
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-shades-100 dark:text-grey-100">
                Date
              </TableHead>
              <TableHead className="font-bold text-shades-100 dark:text-grey-100">
                Incidents
              </TableHead>
              <TableHead className="font-bold text-shades-100 dark:text-grey-100">
                Push Notifications
              </TableHead>
              <TableHead className="font-bold text-shades-100 dark:text-grey-100">
                Subscriptions
              </TableHead>
              <TableHead className="font-bold text-shades-100 dark:text-grey-100">
                Users
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="text-left">
                  {format(new Date(row.toDate), "LLL dd, y")}
                </TableCell>
                <TableCell>{row.vyMessages}</TableCell>
                <TableCell>{row.sentNotifications}</TableCell>
                <TableCell>{row.subscriptions}</TableCell>
                <TableCell>{row.users}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination className="pb-2 pt-2">
          <PaginationContent>
            <PaginationItem className="text-grey-900 dark:text-grey-10">
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {getPageNumbers().map((number) => (
              <PaginationItem
                key={number}
                className="text-grey-900 dark:text-grey-10 border border-transparent hover:border-grey-900  dark:hover:border-grey-10 rounded-lg"
              >
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(number);
                  }}
                  isActive={currentPage === number}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem className="text-grey-900 dark:text-grey-10">
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardHeader>
    </Card>
  );
}
