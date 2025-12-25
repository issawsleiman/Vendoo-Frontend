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
} from "lucide-react";

// Types
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

export default function ProfessionalShopPage() {
  const [currentPage, setCurrentPage] = useState<"shop" | "cart" | "checkout">(
    "shop"
  );
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Demo shop data - Replace with real data from context
  const shop = {
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

  // Demo products - Replace with real data
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
      description: "Flowy, lightweight dress perfect for summer",
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
      description: "Elegant gold-plated necklace",
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
      description: "UV protection with premium frame",
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
      description: "Soft, comfortable sweater",
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
      description: "Luxurious silk scarves",
      inStock: true,
      stockCount: 45,
    },
  ];

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

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

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  let filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div
              onClick={() => setCurrentPage("shop")}
              className="flex items-center gap-3 cursor-pointer"
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

            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
                <User className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentPage("cart")}
                className="p-2 hover:bg-gray-100 rounded-lg relative"
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

      {currentPage === "shop" && (
        <>
          {/* Hero Banner */}
          <section className="relative bg-gray-900 text-white overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${shop.banner})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-4 py-24">
              <div className="max-w-2xl">
                <h1 className="text-5xl font-bold mb-4">{shop.name}</h1>
                <p className="text-xl text-gray-200 mb-8">{shop.description}</p>

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

          {/* Search and Categories */}
          <section className="bg-white border-b sticky top-[73px] z-40">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
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

          {/* Products Grid */}
          <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">
              {activeCategory === "all" ? "All Products" : activeCategory}
            </h2>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">Try adjusting your search</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden group border"
                  >
                    <div className="relative overflow-hidden bg-gray-50 aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                          {Math.round(
                            (1 - product.price / product.originalPrice) * 100
                          )}
                          % OFF
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold">
                            Out of Stock
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            wishlist.includes(product.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-700"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="p-5">
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

                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                          product.inStock
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {product.inStock ? (
                          <>
                            Add to Cart <ShoppingCart className="w-4 h-4" />
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
        </>
      )}

      {currentPage === "cart" && (
        <div className="min-h-screen py-12">
          <div className="max-w-7xl mx-auto px-4">
            <button
              onClick={() => setCurrentPage("shop")}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Continue Shopping
            </button>

            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
                <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <button
                  onClick={() => setCurrentPage("shop")}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl shadow-sm p-6 flex gap-6"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 p-2"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-2xl font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                    <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-semibold">
                          ${cartTotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="font-semibold text-green-600">
                          {cartTotal > 75 ? "FREE" : "$9.99"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span className="font-semibold">
                          ${(cartTotal * 0.08).toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t pt-4 flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-blue-600">
                          $
                          {(
                            cartTotal +
                            (cartTotal > 75 ? 0 : 9.99) +
                            cartTotal * 0.08
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentPage("checkout")}
                      className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 mb-4"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {currentPage === "checkout" && (
        <div className="min-h-screen py-12">
          <div className="max-w-7xl mx-auto px-4">
            <button
              onClick={() => setCurrentPage("cart")}
              className="flex items-center gap-2 text-blue-600 mb-8"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Back to Cart
            </button>

            <h1 className="text-4xl font-bold mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    Contact Information
                  </h2>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-xl border mb-4"
                  />
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="px-4 py-3 rounded-xl border"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="px-4 py-3 rounded-xl border"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      className="md:col-span-2 px-4 py-3 rounded-xl border"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      className="px-4 py-3 rounded-xl border"
                    />
                    <input
                      type="text"
                      placeholder="ZIP"
                      className="px-4 py-3 rounded-xl border"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold mb-6">Payment</h2>
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-4 py-3 rounded-xl border mb-4"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="px-4 py-3 rounded-xl border"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="px-4 py-3 rounded-xl border"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        $
                        {(
                          cartTotal +
                          (cartTotal > 75 ? 0 : 9.99) +
                          cartTotal * 0.08
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" />
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h4 className="text-2xl font-bold text-white mb-4">
                {shop.name}
              </h4>
              <p className="text-gray-400 mb-6">{shop.description}</p>
            </div>

            <div>
              <h5 className="text-white font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-4">Contact</h5>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{shop.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{shop.email}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © 2025 {shop.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
