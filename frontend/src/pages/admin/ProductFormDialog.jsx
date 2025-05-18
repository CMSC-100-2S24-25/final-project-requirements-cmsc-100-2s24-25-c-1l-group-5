import { useState, useEffect, useRef } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link } from "lucide-react";

export default function ProductFormDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
}) {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    type: "",
    price: "",
    qty: "",
    imageUrl: "",
  });

  // Image upload state
  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState("url");
  const fileInputRef = useRef(null);

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Reset form when dialog opens/closes or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name,
        desc: initialData.description,
        type:
          initialData.type === "Crop"
            ? "1"
            : initialData.type === "Poultry"
            ? "2"
            : "",
        price: initialData.price.toString(),
        qty: initialData.quantity.toString(),
        imageUrl: initialData.imageUrl || "",
      });
      setImagePreview(initialData.imageUrl || null);
    } else {
      setFormData({
        name: "",
        desc: "",
        type: "",
        price: "",
        qty: "",
        imageUrl: "",
      });
      setImagePreview(null);
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

  // Handle image URL change
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    handleChange("imageUrl", url);
    setImagePreview(url);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select an image file",
      }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size should be less than 5MB",
      }));
      return;
    }

    // Create a preview URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setImagePreview(dataUrl);
      handleChange("imageUrl", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.desc.trim()) newErrors.desc = "Description is required";
    if (!formData.type) newErrors.type = "Type is required";

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.qty.trim()) {
      newErrors.qty = "Quantity is required";
    } else if (
      isNaN(Number(formData.qty)) ||
      !Number.isInteger(Number(formData.qty)) ||
      Number(formData.qty) < 0
    ) {
      newErrors.qty = "Quantity must be a non-negative integer";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Convert form data to match the expected product format
      const productData = {
        id: formData.id || Date.now().toString(),
        name: formData.name,
        description: formData.desc,
        type: formData.type === "1" ? "Crop" : "Poultry",
        price: Number.parseFloat(formData.price),
        quantity: Number.parseInt(formData.qty, 10),
        imageUrl: formData.imageUrl,
      };

      onSubmit(productData);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader className="px-1">
          <DialogTitle>
            {initialData ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update the product details below."
              : "Fill in the details to add a new product to your inventory."}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto pr-1 -mr-1 max-h-[calc(90vh-180px)]">
          <form
            id="product-form"
            onSubmit={handleSubmit}
            className="space-y-4 py-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Product Image</Label>
              <Tabs
                defaultValue="url"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    Image URL
                  </TabsTrigger>
                  <TabsTrigger
                    value="upload"
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="url" className="space-y-2 pt-2">
                  <Input
                    id="imageUrl"
                    placeholder="Enter image URL"
                    value={formData.imageUrl}
                    onChange={handleImageUrlChange}
                  />
                </TabsContent>
                <TabsContent value="upload" className="space-y-2 pt-2">
                  <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </TabsContent>
              </Tabs>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-2 rounded-md border p-2">
                  <div className="text-sm text-muted-foreground mb-1">
                    Preview:
                  </div>
                  <div className="relative h-40 w-full overflow-hidden rounded-md bg-secondary/20">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Product preview"
                      className="h-full w-full object-contain"
                      onError={() => {
                        setImagePreview(null);
                        setErrors((prev) => ({
                          ...prev,
                          image: "Failed to load image. Please check the URL.",
                        }));
                      }}
                    />
                  </div>
                </div>
              )}
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                value={formData.desc}
                onChange={(e) => handleChange("desc", e.target.value)}
                className={errors.desc ? "border-red-500" : ""}
              />
              {errors.desc && (
                <p className="text-sm text-red-500">{errors.desc}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger
                  id="type"
                  className={errors.type ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Crop</SelectItem>
                  <SelectItem value="2">Poultry</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₱)</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="qty">Quantity</Label>
              <Input
                id="qty"
                value={formData.qty}
                onChange={(e) => handleChange("qty", e.target.value)}
                className={errors.qty ? "border-red-500" : ""}
              />
              {errors.qty && (
                <p className="text-sm text-red-500">{errors.qty}</p>
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
          <Button type="submit" form="product-form">
            {initialData ? "Update Product" : "Add Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
