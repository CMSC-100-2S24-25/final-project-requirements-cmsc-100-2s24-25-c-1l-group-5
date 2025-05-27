import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function UserFormDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
}) {
  // Form state
  const [formData, setFormData] = useState({
    fName: "",
    mName: "",
    lName: "",
    email: "",
    password: "",
    uType: "",
  });

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Reset form when dialog opens/closes or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        fName: initialData.fName,
        mName: initialData.mName,
        lName: initialData.lName,
        email: initialData.email,
        password: initialData.password,
        uType: initialData.uType,
      });
    } else {
      setFormData({
        fName: "",
        mName: "",
        lName: "",
        email: "",
        password: "",
        uType: "",
      });
    }
    setErrors({});
  }, [open, initialData]);

  // Handle form input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fName.trim()) newErrors.fName = "First name is required";
    if (!formData.lName.trim()) newErrors.lName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }
    if (!formData.uType) newErrors.uType = "Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Convert form data to match the expected product format
      const userData = {
        fName: formData.fName,
        mName: formData.mName,
        lName: formData.lName,
        email: formData.email,
        password: formData.password,
        uType: formData.uType,
      };

      onSubmit(userData);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vh] max-h-[90vh] flex flex-col">
        <DialogHeader className="px-1">
          <DialogTitle>
            {initialData ? "Edit User" : "Add New User"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update the user details below."
              : "Fill in the details to add a new user."}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto pr-1 -mr-1 max-h-[calc(90vh-180px)]">
          <form
            id="user-form"
            onSubmit={handleSubmit}
            className="space-y-4 py-4"
          >
            <div className="space-y-2">
              <Label htmlFor="fName">First Name</Label>
              <Input
                id="fName"
                value={formData.fName}
                onChange={(e) => handleChange("fName", e.target.value)}
                className={errors.fName ? "border-red-500" : ""}
              />
              {errors.fName && (
                <p className="text-sm text-red-500">{errors.fName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mName">Middle Name</Label>
              <Input
                id="mName"
                value={formData.mName}
                onChange={(e) => handleChange("mName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lName">Last Name</Label>
              <Input
                id="lName"
                value={formData.lName}
                onChange={(e) => handleChange("lName", e.target.value)}
                className={errors.lName ? "border-red-500" : ""}
              />
              {errors.lName && (
                <p className="text-sm text-red-500">{errors.lName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="uType">Type</Label>
              <Select
                value={formData.uType}
                onValueChange={(value) => handleChange("uType", value)}
              >
                <SelectTrigger
                  id="uType"
                  className={errors.uType ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="merchant">Merchant</SelectItem>
                </SelectContent>
              </Select>
              {errors.uType && (
                <p className="text-sm text-red-500">{errors.uType}</p>
              )}
            </div>
          </form>
        </div>

        <DialogFooter className="mt-4 px-1">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form="user-form">
            {initialData ? "Update User" : "Add User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
