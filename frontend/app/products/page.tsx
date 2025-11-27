'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/store/slices/productSlice';
import { AppDispatch, RootState } from '@/store/store';
import Link from 'next/link';

export default function ProductsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading } = useSelector((state: RootState) => state.products);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                            E-Store
                        </Link>
                        <nav className="flex items-center gap-6">
                            <Link href="/products" className="text-white hover:text-purple-400 transition">
                                Products
                            </Link>
                            <Link href="/cart" className="text-white/80 hover:text-white transition">
                                Cart
                            </Link>
                            <Link href="/login" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
                                Login
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Products Section */}
            <section className="container mx-auto px-6 py-16">
                <h1 className="text-5xl font-bold text-white mb-8">
                    All Products
                </h1>

                {/* Search Bar */}
                <div className="mb-12 max-w-2xl">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products by name or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
                        />
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                    {searchTerm && (
                        <p className="mt-2 text-white/60 text-sm">
                            Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                        </p>
                    )}
                </div>

                {loading ? (
                    <div className="text-center text-white py-20">
                        <div className="inline-block w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-white/60">Loading products...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <Link
                                key={product._id}
                                href={`/products/${product._id}`}
                                className="group"
                            >
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-purple-500/50 transition transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                                    <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                        {product.images && product.images[0] ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-white/50 text-6xl">📦</div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition">
                                            {product.title}
                                        </h3>
                                        <p className="text-white/60 mb-4 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-purple-400">
                                                ${product.price}
                                            </span>
                                            <span className={`text-sm ${product.stockQuantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of Stock'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {!loading && filteredProducts.length === 0 && (
                    <div className="text-center text-white/60 py-20">
                        <div className="text-6xl mb-4">{searchTerm ? '🔍' : '🛍️'}</div>
                        <p className="text-2xl">
                            {searchTerm ? `No products found for "${searchTerm}"` : 'No products available yet.'}
                        </p>
                        {searchTerm ? (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="mt-4 px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition"
                            >
                                Clear Search
                            </button>
                        ) : (
                            <p className="mt-2">Check back soon for amazing deals!</p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
