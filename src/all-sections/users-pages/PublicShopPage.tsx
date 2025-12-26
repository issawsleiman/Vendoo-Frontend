import { useState } from "react";
import {
  Store,
  Search,
  ShoppingCart,
  Heart,
  Star,
  MapPin,
  Truck,
  Shield,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Check,
  User,
  Package,
  Mail,
  Phone,
  Award,
} from "lucide-react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  inStock: boolean;
  stockCount: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface Shop {
  name: string;
  slug: string;
  description: string;
  logo: string;
  banner: string;
  rating: number;
  totalReviews: number;
  totalOrders: number;
  location: string;
  phone: string;
  email: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ProfessionalShopPage() {
  // State Management
  const [currentPage, setCurrentPage] = useState<"shop" | "cart" | "checkout">(
    "shop"
  );
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Demo Shop Data - Replace with real data from your context/API
  const shop: Shop = {
    name: "Fashion Boutique",
    slug: "fashion-boutique",
    description:
      "Your one-stop destination for trendy fashion, accessories, and lifestyle products.",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop",
    rating: 4.7,
    totalReviews: 856,
    totalOrders: 3240,
    location: "Los Angeles, CA",
    phone: "+1 (555) 987-6543",
    email: "hello@fashionboutique.com",
  };

  // Demo Products Data - Replace with real data from your context/API
  const products: Product[] = [
    {
      id: 1,
      name: "Elegant Summer Dress",
      price: 89.99,
      originalPrice: 129.99,
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop",
      rating: 4.8,
      reviews: 124,
      category: "Women's Fashion",
      description: "Flowy, lightweight dress perfect for summer occasions",
      inStock: true,
      stockCount: 15,
    },
    {
      id: 2,
      name: "Leather Messenger Bag",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      rating: 4.9,
      reviews: 89,
      category: "Accessories",
      description: "Genuine leather bag with multiple compartments",
      inStock: true,
      stockCount: 8,
    },
    {
      id: 3,
      name: "Classic Denim Jacket",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
      rating: 4.6,
      reviews: 156,
      category: "Men's Fashion",
      description: "Timeless denim jacket for all seasons",
      inStock: true,
      stockCount: 23,
    },
    {
      id: 4,
      name: "Gold Statement Necklace",
      price: 59.99,
      originalPrice: 89.99,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
      rating: 4.7,
      reviews: 67,
      category: "Jewelry",
      description: "Elegant gold-plated necklace with unique design",
      inStock: true,
      stockCount: 12,
    },
    {
      id: 5,
      name: "Designer Sunglasses",
      price: 119.99,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
      rating: 4.5,
      reviews: 92,
      category: "Accessories",
      description: "UV protection with premium frame quality",
      inStock: true,
      stockCount: 34,
    },
    {
      id: 6,
      name: "Cozy Knit Sweater",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
      rating: 4.8,
      reviews: 143,
      category: "Women's Fashion",
      description: "Soft, comfortable sweater for chilly days",
      inStock: false,
      stockCount: 0,
    },
    {
      id: 7,
      name: "Minimalist Watch",
      price: 199.99,
      originalPrice: 279.99,
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop",
      rating: 4.9,
      reviews: 201,
      category: "Accessories",
      description: "Sleek design with Japanese movement",
      inStock: true,
      stockCount: 19,
    },
    {
      id: 8,
      name: "Silk Scarf Collection",
      price: 44.99,
      image:
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=600&fit=crop",
      rating: 4.6,
      reviews: 78,
      category: "Accessories",
      description: "Luxurious silk scarves in various patterns",
      inStock: true,
      stockCount: 45,
    },
  ];

  // Extract unique categories from products
  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // ============================================================================
  // CART FUNCTIONS
  // ============================================================================

  // Add product to cart or increment quantity if already exists
  const addToCart = (product: Product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Update quantity of item in cart
  const updateQuantity = (id: number, change: number) => {
    setCartItems(
      cartItems
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Toggle product in wishlist
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Calculate cart totals
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = cartTotal > 75 ? 0 : 9.99;
  const taxAmount = cartTotal * 0.08;
  const grandTotal = cartTotal + shippingCost + taxAmount;

  // Filter products based on search and category
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ============================================================================
  // HEADER COMPONENT (Shared across all pages)
  // ============================================================================

  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Shop Info */}
          <div
            onClick={() => setCurrentPage("shop")}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{shop.name}</h1>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{shop.rating}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">
                  {shop.totalReviews} reviews
                </span>
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-4">
            {/* User Account Button */}
            <button className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Account</span>
            </button>

            {/* Cart Button with Badge */}
            <button
              onClick={() => setCurrentPage("cart")}
              className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  // ============================================================================
  // SHOP PAGE COMPONENT
  // ============================================================================

  const ShopPage = () => (
    <>
      {/* Hero Banner Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${shop.banner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{shop.name}</h1>
            <p className="text-xl text-gray-200 mb-8">{shop.description}</p>

            {/* Shop Features */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <MapPin className="w-4 h-4" />
                <span>{shop.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Truck className="w-4 h-4" />
                <span>Free shipping over $75</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Shield className="w-4 h-4" />
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Category Filter Section */}
      <section className="bg-white border-b sticky top-[73px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? "All Products" : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {activeCategory === "all" ? "All Products" : activeCategory}
          </h2>
          <p className="text-gray-600">{filteredProducts.length} products</p>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-50 aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Discount Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {Math.round(
                        (1 - product.price / product.originalPrice) * 100
                      )}
                      % OFF
                    </div>
                  )}

                  {/* Out of Stock Overlay */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        wishlist.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-700"
                      }`}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  {/* Rating and Stock */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold">
                        {product.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>
                    {product.inStock && (
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {product.stockCount} left
                      </span>
                    )}
                  </div>

                  {/* Product Name */}
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Product Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                      product.inStock
                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {product.inStock ? (
                      <>
                        Add to Cart
                        <ShoppingCart className="w-4 h-4" />
                      </>
                    ) : (
                      "Out of Stock"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trust Badges Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Shop With Us?
            </h2>
            <p className="text-lg text-gray-600">
              We're committed to your satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Shopping</h3>
              <p className="text-gray-600">
                Your payment info is always protected
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Free shipping on orders over $75</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  // ============================================================================
  // CART PAGE COMPONENT
  // ============================================================================

  const CartPage = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back to Shop Button */}
        <button
          onClick={() => setCurrentPage("shop")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
          Continue Shopping
        </button>

        {/* Cart Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start adding products from {shop.name}!
            </p>
            <button
              onClick={() => setCurrentPage("shop")}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all hover:shadow-lg"
            >
              Browse Products
            </button>
          </div>
        ) : (
          /* Cart Items and Summary */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm p-6 flex gap-6 hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-xl bg-gray-50"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    {/* Product Name and Remove Button */}
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-900">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Product Description */}
                    <p className="text-sm text-gray-600 mb-4">
                      {item.description}
                    </p>

                    {/* Quantity Controls and Price */}
                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          ${item.price} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-semibold">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span
                      className={`font-semibold ${
                        shippingCost === 0 ? "text-green-600" : ""
                      }`}
                    >
                      {shippingCost === 0
                        ? "FREE"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (estimated)</span>
                    <span className="font-semibold">
                      ${taxAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {cartTotal < 75 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-amber-800">
                      Add{" "}
                      <span className="font-bold">
                        ${(75 - cartTotal).toFixed(2)}
                      </span>{" "}
                      more for free shipping!
                    </p>
                    <div className="mt-2 bg-amber-200 rounded-full h-2">
                      <div
                        className="bg-amber-600 h-2 rounded-full transition-all"
                        style={{ width: `${(cartTotal / 75) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <button
                  onClick={() => setCurrentPage("checkout")}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all hover:shadow-lg mb-4"
                >
                  Proceed to Checkout
                </button>

                {/* Continue Shopping Button */}
                <button
                  onClick={() => setCurrentPage("shop")}
                  className="w-full border border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ============================================================================
  // CHECKOUT PAGE COMPONENT
  // ============================================================================
  const CheckoutPage = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePlaceOrder = () => {
      setIsProcessing(true);
      // Simulate API Call
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        setCartItems([]);
      }, 2000);
    };

    if (isSuccess) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. We've sent a confirmation email to
              your inbox.
            </p>
            <button
              onClick={() => setCurrentPage("shop")}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Back to Shop
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Shipping Form */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                <div className="p-4 border-2 border-blue-600 rounded-xl bg-blue-50 flex items-center gap-3">
                  <div className="w-4 h-4 border-4 border-blue-600 rounded-full" />
                  <span className="font-bold text-blue-900">
                    Credit / Debit Card
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary Summary */}
            <div className="bg-white p-8 rounded-2xl shadow-sm h-fit">
              <h2 className="text-2xl font-bold mb-6">Your Order</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2">
                    <span>Total</span>
                    <span className="text-blue-600">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {isProcessing
                  ? "Processing..."
                  : `Pay $${grandTotal.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // FOOTER COMPONENT
  // ============================================================================
  const Footer = () => (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 text-white mb-4">
              <Store className="w-6 h-6" />
              <span className="text-xl font-bold">{shop.name}</span>
            </div>
            <p className="max-w-sm mb-6">{shop.description}</p>
            <div className="flex gap-4">
              <Mail className="w-5 h-5 cursor-pointer hover:text-white" />
              <Phone className="w-5 h-5 cursor-pointer hover:text-white" />
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Sale</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Shipping Policy</li>
              <li>Returns & Exchanges</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          © {new Date().getFullYear()} {shop.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <main>
        {currentPage === "shop" && <ShopPage />}
        {currentPage === "cart" && <CartPage />}
        {currentPage === "checkout" && <CheckoutPage />}
      </main>
      <Footer />
    </div>
  );
}
