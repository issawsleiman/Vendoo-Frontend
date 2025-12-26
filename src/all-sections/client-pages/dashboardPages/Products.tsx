import { useEffect, useMemo, useState } from "react";
import {
  TrendingUp,
  AlertCircle,
  Eye,
  Box,
  TrendingDown,
  Plus,
  Download,
  Edit2,
  Trash2,
  Search,
  type LucideIcon,
} from "lucide-react";

// Context & Widgets
import { useDashboardContext } from "../../../context/DashboardContext";
import { useThemeContext } from "../../../context/ThemeContext";
import { DASHBOARD_PG_PRODUCTS_NAME } from "./layout";
import VendooLabel from "../../../widgets/VendooLabel";
import VendooButton from "../../../widgets/VendooButton";
import AddProductDialog from "../dialogs/AddProductDialog";
import { VendooInput } from "../../../widgets/VendooInput";

// --- Types ---

type ProductStatus = "active" | "out_of_stock" | "hidden";

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  stock_quantity: number;
  status: ProductStatus;
  category?: string;
  image?: string;
  sales?: number;
}

// --- Main Page Component ---

export default function ProductsPage() {
  const { colors } = useThemeContext();
  const { setSelectedDashboardItem } = useDashboardContext();
  const [showingAddProductDialog, setShowingAddProductDialog] = useState(false);

  useEffect(() => {
    setSelectedDashboardItem(DASHBOARD_PG_PRODUCTS_NAME);
  }, [setSelectedDashboardItem]);

  return (
    <div
      className="w-full h-screen overflow-y-auto flex flex-col px-6 py-6"
      style={{ backgroundColor: colors.bgColor }}
    >
      <div className="mb-6">
        <VendooLabel text="Inventory Management" />
        <p className="text-sm opacity-60" style={{ color: colors.textColor }}>
          Track, edit, and manage your product catalog.
        </p>
      </div>

      <ProductsTable onAddClick={() => setShowingAddProductDialog(true)} />

      {showingAddProductDialog && (
        <AddProductDialog
          open={showingAddProductDialog}
          onClose={() => setShowingAddProductDialog(false)}
          onProductAdded={(data) => {
            console.log("Product added:", data);
            setShowingAddProductDialog(false);
          }}
        />
      )}
    </div>
  );
}

// --- Table Component ---

function ProductsTable({ onAddClick }: { onAddClick: () => void }) {
  const { colors } = useThemeContext();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock Data (Ideally from an API or Context)
  const products: Product[] = [
    {
      product_id: 1,
      product_name: "Premium Blue T-Shirt",
      price: 25.99,
      stock_quantity: 142,
      status: "active",
      category: "Clothing",
      sales: 234,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
    },
    {
      product_id: 2,
      product_name: "Black Hoodie",
      price: 45.0,
      stock_quantity: 0,
      status: "out_of_stock",
      category: "Clothing",
      sales: 189,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop",
    },
    {
      product_id: 3,
      product_name: "Leather Wallet",
      price: 35.5,
      stock_quantity: 67,
      status: "active",
      category: "Accessories",
      sales: 156,
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop",
    },
    {
      product_id: 4,
      product_name: "Sneakers Pro",
      price: 120.0,
      stock_quantity: 12,
      status: "hidden",
      category: "Footwear",
      sales: 312,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
    },
  ];

  const stats = useMemo(
    () => ({
      total: products.length,
      active: products.filter((p) => p.status === "active").length,
      outOfStock: products.filter((p) => p.status === "out_of_stock").length,
      value: products.reduce((sum, p) => sum + p.price * p.stock_quantity, 0),
    }),
    [products]
  );

  // --------------------------------------------------------------------------
  // Sub-Components (Scoped to Table)
  // --------------------------------------------------------------------------

  function StatusBadge({ status }: { status: ProductStatus }) {
    const config = {
      active: {
        label: "Active",
        bg: "bg-green-50",
        text: "text-green-700",
        icon: TrendingUp,
      },
      out_of_stock: {
        label: "Out of Stock",
        bg: "bg-red-50",
        text: "text-red-700",
        icon: AlertCircle,
      },
      hidden: {
        label: "Hidden",
        bg: "bg-gray-50",
        text: "text-gray-600",
        icon: Eye,
      },
    };
    const { label, bg, text, icon: Icon } = config[status];
    return (
      <span
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text} w-fit`}
      >
        <Icon size={12} /> {label}
      </span>
    );
  }

  function ActionButtons() {
    return (
      <div className="flex items-center justify-end gap-1">
        <button className="p-2  rounded-lg transition-colors text-gray-500">
          <Eye size={16} />
        </button>
        <button className="p-2  rounded-lg transition-colors text-blue-600">
          <Edit2 size={16} />
        </button>
        <button className="p-2  rounded-lg transition-colors text-red-600">
          <Trash2 size={16} />
        </button>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* Statistics Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticsCard
          label="Total Products"
          value={stats.total}
          icon={Box}
          color="blue"
        />
        <StatisticsCard
          label="Active Items"
          value={stats.active}
          icon={TrendingUp}
          color="green"
        />
        <StatisticsCard
          label="Stock Alerts"
          value={stats.outOfStock}
          icon={AlertCircle}
          color="red"
        />
        <StatisticsCard
          label="Inventory Value"
          value={`$${stats.value.toLocaleString()}`}
          icon={TrendingDown}
          color="red"
        />
      </div>

      <div
        className="rounded-2xl border shadow-sm overflow-hidden transition-all"
        style={{
          borderColor: colors.borderColor,
          backgroundColor: colors.bgColor,
        }}
      >
        {/* Toolbar */}
        <div
          className="p-5 border-b flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: colors.borderColor }}
        >
          <div className="relative w-full md:w-96">
            <VendooInput
              type="text"
              placeholder="Search by name, SKU or category..."
              value={searchQuery}
              onChange={(e: any) => setSearchQuery(e.target.value)}
              PrefixIcon={Search}
              isFullWidth
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <VendooButton onClick={onAddClick} className="flex-1 md:flex-none">
              <div className="flex flex-row justify-center items-center">
                <Plus size={18} className="mr-2" /> Add Product
              </div>
            </VendooButton>
            <button
              className="p-2.5 border rounded-xl hover:bg-gray-50 transition-colors"
              style={{ borderColor: colors.borderColor }}
            >
              <Download size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50" style={{ color: colors.textColor }}>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider opacity-60">
                  Product
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider opacity-60">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider opacity-60">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider opacity-60">
                  Stock
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider opacity-60">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider opacity-60 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className="divide-y"
              style={{ borderColor: colors.borderColor }}
            >
              {products.map((product) => (
                <tr
                  key={product.product_id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover border"
                      />
                      <div>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: colors.textColor }}
                        >
                          {product.product_name}
                        </p>
                        <p className="text-xs text-gray-400">
                          ID: #{product.product_id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td
                    className="px-6 py-4 text-sm font-medium"
                    style={{ color: colors.textColor }}
                  >
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">
                        {product.stock_quantity} units
                      </span>
                      <div className="w-20 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            product.stock_quantity < 10
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                          style={{
                            width: `${Math.min(product.stock_quantity, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-6 py-4">
                    <ActionButtons />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function StatisticsCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: string;
}) {
  const { colors } = useThemeContext();
  return (
    <div
      className="rounded-2xl p-5 border shadow-sm flex items-center gap-4"
      style={{
        borderColor: colors.borderColor,
        backgroundColor: colors.bgColor,
      }}
    >
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-tight text-gray-400">
          {label}
        </p>
        <p className="text-2xl font-black" style={{ color: colors.textColor }}>
          {value}
        </p>
      </div>
    </div>
  );
}
