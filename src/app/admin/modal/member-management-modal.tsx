"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { User, UserPlus } from "lucide-react";
import DropdownSelect, { IOption } from "@/components/ui/dropdown-select";

interface MemberFormData {
  name: string;
  email: string;
  status: string;
  joined: string;
}

interface MemberManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MemberFormData) => void;
  member?: MemberFormData | null; // For editing existing member
  mode?: "add" | "edit";
}

const MemberManagementModal: React.FC<MemberManagementModalProps> = ({
  isOpen,
  onClose,
  onSave,
  member = null,
  mode = "add",
}) => {
  const [formData, setFormData] = useState<MemberFormData>({
    name: member?.name || "",
    email: member?.email || "",
    status: member?.status || "Active",
    joined: member?.joined || "",
  });

  const statusOptions: IOption[] = [
    { id: "active", label: "Active", value: "Active" },
    { id: "inactive", label: "Inactive", value: "Inactive" },
    { id: "pending", label: "Pending", value: "Pending" },
    { id: "suspended", label: "Suspended", value: "Suspended" },
  ];

  // Reset form data when modal opens/closes or member changes
  React.useEffect(() => {
    if (member) {
      setFormData(member);
    } else {
      setFormData({ name: "", email: "", status: "Active", joined: "" });
    }
  }, [member, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (option: IOption) => {
    setFormData({ ...formData, status: option.value as string });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData(
      member || { name: "", email: "", status: "Active", joined: "" }
    );
    onClose();
  };

  const isAddMode = mode === "add";
  const title = isAddMode ? "Add New Member" : "Edit Member";
  const submitText = isAddMode ? "Add Member" : "Update Member";

  const headerContent = (
    <div className="flex items-center gap-2 text-slate-600">
      {isAddMode ? (
        <UserPlus className="h-4 w-4" />
      ) : (
        <User className="h-4 w-4" />
      )}
      <span className="text-sm">
        {isAddMode
          ? "Add a new member to the brotherhood alliance"
          : "Update member information and status"}
      </span>
    </div>
  );

  const footerContent = (
    <div className="flex justify-between items-center">
      <div className="text-xs text-slate-500">
        {isAddMode
          ? "All fields are required for new members"
          : "Changes will be saved immediately"}
      </div>
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={handleCancel}
          size="sm"
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          size="sm"
          className="bg-sky-600 hover:bg-sky-700"
        >
          {submitText}
        </Button>
      </div>
    </div>
  );

  const selectedStatusOption =
    statusOptions.find((option) => option.value === formData.status) || null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      headerContent={headerContent}
      footerContent={footerContent}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name *
            </label>
            <Input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address *
            </label>
            <Input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <DropdownSelect
              name="status"
              label="Status"
              placeholder="Select status..."
              options={statusOptions}
              selectedOption={selectedStatusOption}
              onChange={handleStatusChange}
              required
              $height={44}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Joined Date *
            </label>
            <Input
              type="date"
              name="joined"
              required
              placeholder="YYYY-MM-DD"
              value={formData.joined}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="border-t border-slate-200 pt-6">
          <h4 className="text-sm font-medium text-slate-700 mb-4">
            Additional Information
          </h4>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-slate-600">
              {isAddMode
                ? "This member will be added to the active member list and will receive access to the member portal."
                : "Any changes made will be reflected across all systems immediately."}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MemberManagementModal;
