"use client";
import React, { useEffect, useState } from "react";
import Table, { Column } from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Member {
  id: number;
  name: string;
  email: string;
  status: string;
  joined: string;
}

const MemberManagement: React.FC = () => {
  const [memberData, setMemberData] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(
          "https://brotherhood-production.up.railway.app/api/members"
        );
        const data = await res.json();
        setMemberData(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

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
        <button
          onClick={() => handleEdit(row.id)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Edit
        </button>
      ),
    },
  ];

  const handleEdit = (id: number) => {
    alert(`Edit member with ID: ${id}`);
  };

  const handleAddMember = () => {
    alert("Add Member clicked");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

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
