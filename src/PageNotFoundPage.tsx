export default function PublicNotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        {/* Soft Illustration */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-5xl font-semibold text-gray-400">404</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          Store Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-500 leading-relaxed">
          The store you are trying to visit does not exist or may no longer be
          available.
        </p>

        {/* Brand Hint */}
        <p className="text-sm text-gray-400 mt-6">Powered by Vendoo</p>
      </div>
    </div>
  );
}
