"use client";

import { useState } from "react";
import { ArrowDownUp, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// Sample data for the table
const initialData = [
  {
    id: 1,
    title: "Marketing Campaign",
    leads: 145,
    date: "2023-10-15",
    link: "https://example.com/campaign1",
  },
  {
    id: 2,
    title: "Product Launch",
    leads: 287,
    date: "2023-11-05",
    link: "https://example.com/launch",
  },
  {
    id: 3,
    title: "Email Newsletter",
    leads: 98,
    date: "2023-09-22",
    link: "https://example.com/newsletter",
  },
  {
    id: 4,
    title: "Social Media Ads",
    leads: 312,
    date: "2023-12-01",
    link: "https://example.com/social",
  },
  {
    id: 5,
    title: "Webinar Series",
    leads: 176,
    date: "2023-10-28",
    link: "https://example.com/webinar",
  },
];

type SortDirection = "asc" | "desc" | null;
type SortableColumn = "title" | "leads" | "date" | "link";

export default function WhatsappGroups() {
  const [data, setData] = useState(initialData);
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (column: SortableColumn) => {
    // If clicking the same column, cycle through: asc -> desc -> no sort
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
        setData([...data].sort((a, b) => sortData(a, b, column, "desc")));
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
        setData(initialData); // Reset to original data
      } else {
        setSortDirection("asc");
        setData([...data].sort((a, b) => sortData(a, b, column, "asc")));
      }
    } else {
      // New column, start with ascending
      setSortColumn(column);
      setSortDirection("asc");
      setData([...data].sort((a, b) => sortData(a, b, column, "asc")));
    }
  };

  const sortData = (
    a: any,
    b: any,
    column: SortableColumn,
    direction: "asc" | "desc"
  ) => {
    const multiplier = direction === "asc" ? 1 : -1;

    if (column === "leads") {
      return (a[column] - b[column]) * multiplier;
    } else if (column === "date") {
      return (
        (new Date(a[column]).getTime() - new Date(b[column]).getTime()) *
        multiplier
      );
    } else {
      // For string columns (title, link)
      return a[column].localeCompare(b[column]) * multiplier;
    }
  };

  const getSortIcon = (column: SortableColumn) => {
    if (sortColumn !== column) {
      return <ArrowDownUp className="ml-2 h-4 w-4" />;
    }

    if (sortDirection === "asc") {
      return <ChevronUp className="ml-2 h-4 w-4" />;
    }

    if (sortDirection === "desc") {
      return <ChevronDown className="ml-2 h-4 w-4" />;
    }

    return <ArrowDownUp className="ml-2 h-4 w-4" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("title")}
              >
                <div className="flex items-center">
                  Title
                  {getSortIcon("title")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("leads")}
              >
                <div className="flex items-center">
                  Leads
                  {getSortIcon("leads")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date
                  {getSortIcon("date")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("link")}
              >
                <div className="flex items-center">
                  Link
                  {getSortIcon("link")}
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.title}</TableCell>
                <TableCell>{row.leads}</TableCell>
                <TableCell>{formatDate(row.date)}</TableCell>
                <TableCell>
                  <Link
                    href={row.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {row.link.replace("https://", "")}
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alert(`Configure item: ${row.title}`)}
                  >
                    Access Config
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
