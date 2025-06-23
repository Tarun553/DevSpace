"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Contributor {
  id: string;
  name: string;
  email: string;
  location: string;
  status: "Active" | "Pending" | "Inactive";
  balance: string;
}

const contributors: Contributor[] = [
  {
    id: "1",
    name: "Aarav Mehta",
    email: "aarav@ruixen.dev",
    location: "Bangalore, India",
    status: "Active",
    balance: "₹45,000",
  },
  {
    id: "2",
    name: "Elena Torres",
    email: "elena.t@ruixen.dev",
    location: "Barcelona, Spain",
    status: "Active",
    balance: "₹22,000",
  },
  {
    id: "3",
    name: "Kenji Nakamura",
    email: "kenji.n@ruixen.dev",
    location: "Tokyo, Japan",
    status: "Inactive",
    balance: "₹0",
  },
  {
    id: "4",
    name: "Leila Ahmed",
    email: "leila.a@ruixen.dev",
    location: "Cairo, Egypt",
    status: "Pending",
    balance: "₹10,000",
  },
  {
    id: "5",
    name: "Ryan Smith",
    email: "ryan.s@ruixen.dev",
    location: "Toronto, Canada",
    status: "Active",
    balance: "₹31,500",
  },
];

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function getStatusVariant(status: Contributor["status"]) {
  switch (status) {
    case 'Active':
      return 'default';
    case 'Pending':
      return 'secondary';
    case 'Inactive':
      return 'outline';
    default:
      return 'default';
  }
}

export function ContributorsTable() {
  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold"> Recent Articles</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-8 w-[200px] lg:w-[300px]"
            />
          </div>
          <Button variant="outline" size="sm" className="h-9">
            Filter
          </Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Comments</TableHead>
            <TableHead className="w-[50px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contributors.map((contributor) => (
            <TableRow key={contributor.id}>
              <TableCell className="font-medium">
                <div className="line-clamp-1">{contributor.name}</div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                <div className="line-clamp-1">{contributor.email}</div>
              </TableCell>
              <TableCell>{formatDate(new Date().toISOString())}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(contributor.status)}>
                  {contributor.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end">
                  {contributor.status === 'Active' ? '24' : '0'}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-between p-4 border-t">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1</span> to{' '}
          <span className="font-medium">5</span> of <span className="font-medium">5</span> contributors
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ContributorsOverviewTable() {
  return (
    <div className="container mx-auto py-6">
      <ContributorsTable />
    </div>
  );
}
