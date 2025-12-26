import { useState } from "react";
import { X, Upload, AlertCircle, Check, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

// Widgets & Context
import VendooButton from "../../../widgets/VendooButton";
import { VendooDialog } from "../../../widgets/VendooDialog";
import { VendooInput, VendooTextarea } from "../../../widgets/VendooInput";
import VendooLabel from "../../../widgets/VendooLabel";
import { useThemeContext } from "../../../context/ThemeContext";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

interface ProductFormData {
  product_name: string;
  description: string;
  price: string;
  stock_quantity: string;
  category: string;
  sku: string;
  weight: string;
  dimensions: string;
  images: File[];
  status: "active" | "draft" | "hidden";
}

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onProductAdded?: (product: ProductFormData) => void;
}

const INITIAL_FORM_STATE: ProductFormData = {
  product_name: "",
  description: "",
  price: "",
  stock_quantity: "",
  category: "",
  sku: "",
  weight: "",
  dimensions: "",
  images: [],
  status: "active",
};

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Accessories",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
  "Beauty & Personal Care",
];

// ============================================================================
// COMPONENT
// ============================================================================

function AddProductDialog({
  open,
  onClose,
  onProductAdded,
}: AddProductDialogProps) {
  const { colors } = useThemeContext();

  // Core State
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // --------------------------------------------------------------------------
  // INTERNAL LOGIC (HELPERS)
  // --------------------------------------------------------------------------

  function validateStep(step: number): boolean {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.product_name.trim())
        newErrors.product_name = "Product name is required";
      if (!formData.category) newErrors.category = "Please select a category";
      if (formData.description.length < 10)
        newErrors.description = "Description too short";
    }

    if (step === 2) {
      if (!formData.price || parseFloat(formData.price) <= 0)
        newErrors.price = "Enter a valid price";
      if (!formData.stock_quantity)
        newErrors.stock_quantity = "Stock is required";
      if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // --------------------------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------------------------

  function handleInputChange(field: keyof ProductFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error dynamically as user types
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type and size (5MB)
    if (!file.type.startsWith("image/"))
      return toast.error("File must be an image");
    if (file.size > 5 * 1024 * 1024)
      return toast.error("Image must be smaller than 5MB");

    // Revoke old URL to free memory if replacing image
    if (imagePreview) URL.revokeObjectURL(imagePreview);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setFormData((prev) => ({ ...prev, images: [file] }));
  }

  function removeImage() {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, images: [] }));
  }

  async function handleSubmit() {
    if (!validateStep(2)) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      onProductAdded?.(formData);
      toast.success("Product created successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to save product. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    // Memory cleanup
    if (imagePreview) URL.revokeObjectURL(imagePreview);

    // Reset all state
    setFormData(INITIAL_FORM_STATE);
    setImagePreview(null);
    setErrors({});
    setCurrentStep(1);
    onClose();
  }

  // --------------------------------------------------------------------------
  // SUB-RENDER FUNCTIONS (UI BLOCKS)
  // --------------------------------------------------------------------------

  function StepIndicator() {
    return (
      <div className="flex items-center justify-center gap-4 mb-8">
        <div
          className={`flex items-center gap-2 ${
            currentStep === 1 ? "text-blue-600" : "text-green-600"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${
              currentStep === 1
                ? "border-blue-600 bg-blue-50"
                : "border-green-600 bg-green-600 text-white"
            }`}
          >
            {currentStep > 1 ? <Check size={16} /> : "1"}
          </div>
          <span className="text-sm font-semibold">General</span>
        </div>
        <div
          className={`w-12 h-0.5 rounded ${
            currentStep === 2 ? "bg-blue-600" : "bg-gray-200"
          }`}
        />
        <div
          className={`flex items-center gap-2 ${
            currentStep === 2 ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${
              currentStep === 2
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            2
          </div>
          <span className="text-sm font-semibold">Inventory</span>
        </div>
      </div>
    );
  }

  function renderStepOne() {
    return (
      <div className="space-y-5">
        <div>
          <VendooLabel text="Product Name*" />
          <VendooInput
            type="text"
            value={formData.product_name}
            onChange={(e: any) =>
              handleInputChange("product_name", e.target.value)
            }
            placeholder="e.g. Vintage Denim Jacket"
            isFullWidth
          />
          {errors.product_name && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.product_name}
            </p>
          )}
        </div>

        <div>
          <VendooLabel text="Category*" />
          <select
            className="w-full p-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <VendooLabel text="Description*" />
          <VendooTextarea
            value={formData.description}
            onChange={(e: any) =>
              handleInputChange("description", e.target.value)
            }
            placeholder="Describe materials, fit, and condition..."
            isFullWidth
            rows={4}
          />
        </div>

        {/* Single Image Section */}
        <div className="space-y-2">
          <VendooLabel text="Product Image" />
          {!imagePreview ? (
            <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-600">
                Click to upload image
              </p>
              <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          ) : (
            <div className="relative w-44 h-44 mx-auto">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-2xl border shadow-sm"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1.5 shadow-md border hover:bg-red-50"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderStepTwo() {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <VendooLabel text="Price ($)*" />
            <VendooInput
              type="number"
              value={formData.price}
              onChange={(e: any) => handleInputChange("price", e.target.value)}
              placeholder="0.00"
              isFullWidth
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>
          <div>
            <VendooLabel text="Quantity*" />
            <VendooInput
              type="number"
              value={formData.stock_quantity}
              onChange={(e: any) =>
                handleInputChange("stock_quantity", e.target.value)
              }
              placeholder="1"
              isFullWidth
            />
          </div>
        </div>

        <div>
          <VendooLabel text="SKU Number*" />
          <VendooInput
            value={formData.sku}
            onChange={(e: any) => handleInputChange("sku", e.target.value)}
            placeholder="e.g. SKU-123-BLUE"
            isFullWidth
            type={""}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <VendooLabel text="Weight (Optional)" />
            <VendooInput
              value={formData.weight}
              onChange={(e: any) => handleInputChange("weight", e.target.value)}
              placeholder="0.5kg"
              isFullWidth
              type={""}
            />
          </div>
          <div>
            <VendooLabel text="Dimensions" />
            <VendooInput
              value={formData.dimensions}
              onChange={(e: any) =>
                handleInputChange("dimensions", e.target.value)
              }
              placeholder="10x10x5"
              isFullWidth
              type={""}
              id={""}
              name={""}
            />
          </div>
        </div>

        <div>
          <VendooLabel text="Listing Status" />
          <select
            className="w-full p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500/20"
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            <option value="active">Active (Visible Now)</option>
            <option value="draft">Draft (Save for later)</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MAIN RENDER
  // --------------------------------------------------------------------------

  return (
    <VendooDialog Open={open} onClose={handleClose}>
      <div className="w-full max-w-2xl px-2">
        {/* Header */}
        <header className="flex justify-between items-start mb-6 pb-4 border-b">
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ color: colors.textColor }}
            >
              {currentStep === 1 ? "Product Information" : "Inventory Details"}
            </h2>
            <p
              className="text-sm opacity-70"
              style={{ color: colors.textColor }}
            >
              Step {currentStep} of 2
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2  rounded-full"
          >
            <X size={20} />
          </button>
        </header>

        <StepIndicator />

        {/* Scrollable Content Area */}
        <div className="max-h-[60vh] overflow-y-auto px-1 ">
          {currentStep === 1 ? renderStepOne() : renderStepTwo()}
        </div>

        {/* Footer */}
        <footer className="flex justify-between items-center mt-10 pt-6 border-t">
          <div>
            {currentStep === 2 && (
              <VendooButton
                onClick={() => setCurrentStep(1)}
                isDisabled={isSubmitting}
              >
                Back
              </VendooButton>
            )}
          </div>

          <div className="flex gap-3">
            {currentStep === 1 ? (
              <VendooButton
                onClick={() => validateStep(1) && setCurrentStep(2)}
              >
                Next: Inventory
              </VendooButton>
            ) : (
              <VendooButton onClick={handleSubmit} isDisabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={18} /> Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Check size={18} /> Add Product
                  </span>
                )}
              </VendooButton>
            )}
          </div>
        </footer>
      </div>
    </VendooDialog>
  );
}

export default AddProductDialog;
