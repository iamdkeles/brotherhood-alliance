import React from "react";
import Table, { Column } from "@/components/ui/Table";
import Button from "@/components/ui/Button";

interface Member {
  id: number;
  name: string;
  email: string;
  status: string;
  joined: string;
}

const MemberManagement: React.FC = () => {
  const memberData: Member[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      joined: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
      joined: "2023-02-20",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "Active",
      joined: "2023-03-10",
    },
  ];

  const columns: Column<Member>[] = [
    {
      key: "name",
      title: "Name",
      render: (value) => <strong>{String(value)}</strong>,
    },
    {
      key: "email",
      title: "Email",
      render: (value) => <span>{String(value)}</span>,
    },
    {
      key: "status",
      title: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {String(value)}
        </span>
      ),
    },
    {
      key: "joined",
      title: "Joined",
      render: (value) => (
        <span>{new Date(String(value)).toLocaleDateString()}</span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </button>
          {/* <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Delete
          </button> */}
        </div>
      ),
      sortable: false,
    },
  ];

  const handleEdit = (id: number) => {
    alert(`Edit member with ID: ${id}`);
  };

  // const handleDelete = (id: number) => {
  //   if (confirm(`Are you sure you want to delete member with ID: ${id}?`)) {
  //     alert(`Delete member with ID: ${id}`);
  //   }
  // };

  const handleAddMember = () => {
    alert("Add Member clicked");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Member Management</h2>
        <Button size="md" onClick={handleAddMember}>
          Add Member
        </Button>
      </div>

      <div className="bg-white">
        <div className="overflow-x-auto">
          <Table<Member> data={memberData} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default MemberManagement;
