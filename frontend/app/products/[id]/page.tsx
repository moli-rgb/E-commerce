'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { fetchProductById } from '@/store/slices/productSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { AppDispatch, RootState } from '@/store/store';
import Link from 'next/link';

export default function ProductDetailPage() {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { currentProduct, loading } = useSelector((state: RootState) => state.products);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if (params.id) {
            dispatch(fetchProductById(params.id as string));
        }
    }, [params.id, dispatch]);

    const handleAddToCart = () => {
        if (currentProduct) {
            dispatch(addToCart({
                productId: currentProduct._id,
                quantity,
            }));
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <div className="inline-block w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-white/60">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!currentProduct) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <p className="text-2xl">Product not found</p>
                    <Link href="/products" className="mt-4 inline-block text-purple-400 hover:text-purple-300">
                        ← Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Add to Cart Notification */}
            {showNotification && (
                <div className="fixed top-20 right-8 z-50 animate-slide-in-right">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 border border-green-400/50">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                            <p className="font-bold">Added to Cart!</p>
                            <p className="text-sm text-white/90">{quantity} × {currentProduct?.title}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                            E-Store
                        </Link>
                        <nav className="flex items-center gap-6">
                            <Link href="/products" className="text-white/80 hover:text-white transition">
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

            {/* Product Detail */}
            <section className="container mx-auto px-6 py-16">
                <Link href="/products" className="text-purple-400 hover:text-purple-300 mb-8 inline-block">
                    ← Back to Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                    {/* Images */}
                    <div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 mb-4">
                            <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                {currentProduct.images && currentProduct.images[selectedImage] ? (
                                    <img
                                        src={currentProduct.images[selectedImage]}
                                        alt={currentProduct.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-white/50 text-9xl">📦</div>
                                )}
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        {currentProduct.images && currentProduct.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {currentProduct.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition ${selectedImage === idx ? 'border-purple-500' : 'border-white/20 hover:border-white/40'
                                            }`}
                                    >
                                        <img src={img} alt={`${currentProduct.title} ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="text-white">
                        <h1 className="text-5xl font-bold mb-4">{currentProduct.title}</h1>
                        <p className="text-3xl font-bold text-purple-400 mb-6">${currentProduct.price}</p>

                        <div className="mb-6">
                            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${currentProduct.stockQuantity > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                }`}>
                                {currentProduct.stockQuantity > 0 ? `${currentProduct.stockQuantity} in stock` : 'Out of Stock'}
                            </span>
                        </div>

                        <p className="text-white/70 text-lg mb-8 leading-relaxed">
                            {currentProduct.description}
                        </p>

                        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 mb-8">
                            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                            <div className="space-y-2 text-white/70">
                                <p><span className="font-semibold text-white">SKU:</span> {currentProduct.sku}</p>
                                {currentProduct.variations && currentProduct.variations.length > 0 && (
                                    <div>
                                        <span className="font-semibold text-white">Variations:</span>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {currentProduct.variations.map((variation, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                                                    {variation.size && `Size: ${variation.size}`}
                                                    {variation.color && ` Color: ${variation.color}`}
                                                    {variation.material && ` Material: ${variation.material}`}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 text-white hover:bg-white/10 transition"
                                >
                                    −
                                </button>
                                <span className="px-6 py-3 text-white font-semibold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(currentProduct.stockQuantity, quantity + 1))}
                                    className="px-4 py-3 text-white hover:bg-white/10 transition"
                                    disabled={quantity >= currentProduct.stockQuantity}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={currentProduct.stockQuantity === 0}
                                className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {currentProduct.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
