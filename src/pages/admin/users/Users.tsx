import { useEffect, useState } from "react";
import type { User } from "@/types/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import Loader from "@/components/Loader";

const Users = () => {
  const [users, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(users);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users`,
        );
        const data = await response.json();
        setUser(data.users);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Users</h2>
        <p className="text-sm text-slate-400">Manage your users</p>
      </div>

      <div className="bg-white rounded-xl"> {/* overflow-x-auto if needed */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-500">Name</TableHead>
              <TableHead className="text-gray-500">Email</TableHead>
              <TableHead className="text-gray-500">Role</TableHead>
              <TableHead className="text-gray-500 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
               <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                     <div className="flex items-center justify-center">
                        <Loader />
                     </div>
                  </TableCell>
               </TableRow>
            ) : (users.length > 0) ? (
                  users.map((user) => (
                     <TableRow>
                        <TableCell className="font-medium p-4">
                           <strong className="text-gray-700">{user.name}</strong>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="capitalize">
                           <span className="text-[0.7rem] text-slate-600 font-semibold bg-gray-200 py-1 px-2 rounded-full">{user.role}</span>
                        </TableCell>
                        <TableCell className="text-right">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="size-8">
                                 <MoreHorizontalIcon />
                                 <span className="sr-only">Open menu</span>
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                 <DropdownMenuItem>Edit</DropdownMenuItem>
                                 <DropdownMenuSeparator />
                                 <DropdownMenuItem variant="destructive">
                                 Delete
                                 </DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </TableCell>
                     </TableRow>
                  ))
            ) : (
               <TableRow>
                 <TableCell colSpan={12} className="h-32 text-center p-10">
                     <div className="flex items-center justify-center">
                        <p className="text-gray-500 text-[16px] font-medium">Not found!</p>
                     </div>
                  </TableCell>
               </TableRow>
            )}
            
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
