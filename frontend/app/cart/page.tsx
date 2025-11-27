'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateCartItem } from '@/store/slices/cartSlice';
import { AppDispatch, RootState } from '@/store/store';
import Link from 'next/link';

export default function CartPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.cart);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(fetchCart());
        }
    }, [dispatch, token]);

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        if (newQuantity > 0) {
            dispatch(updateCartItem({ productId, quantity: newQuantity }));
        }
    };

    const handleRemove = (productId: string) => {
        dispatch(removeFromCart(productId));
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const price = item.product?.price || 0;
            return total + (price * item.quantity);
        }, 0).toFixed(2);
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <p className="text-2xl mb-4">Please login to view your cart</p>
                    <Link href="/login" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
                        Login
                    </Link>
                </div>
            </div>
        );
    }

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
                            <Link href="/products" className="text-white/80 hover:text-white transition">
                                Products
                            </Link>
                            <Link href="/cart" className="text-white hover:text-purple-400 transition">
                                Cart
                            </Link>
                            <Link href="/login" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
                                Login
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Cart Content */}
            <section className="container mx-auto px-6 py-16">
                <h1 className="text-5xl font-bold text-white mb-12">Shopping Cart</h1>

                {loading ? (
                    <div className="text-center text-white py-20">
                        <div className="inline-block w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center text-white/60 py-20">
                        <div className="text-6xl mb-4">🛒</div>
                        <p className="text-2xl mb-4">Your cart is empty</p>
                        <Link href="/products" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div key={item.product?._id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                    <div className="flex gap-6">
                                        <div className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            {item.product?.images && item.product.images[0] ? (
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.title}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div className="text-white/50 text-4xl">📦</div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <Link href={`/products/${item.product?._id}`} className="text-xl font-semibold text-white hover:text-purple-400 transition">
                                                {item.product?.title}
                                            </Link>
                                            <p className="text-white/60 mt-2">${item.product?.price}</p>

                                            <div className="flex items-center gap-4 mt-4">
                                                <div className="flex items-center bg-white/10 rounded-lg border border-white/20">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                                        className="px-3 py-2 text-white hover:bg-white/10 transition"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="px-4 py-2 text-white font-semibold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                                        className="px-3 py-2 text-white hover:bg-white/10 transition"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemove(item.product._id)}
                                                    className="text-red-400 hover:text-red-300 transition"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-purple-400">
                                                ${(item.product?.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 sticky top-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-white/70">
                                        <span>Subtotal</span>
                                        <span>${calculateTotal()}</span>
                                    </div>
                                    <div className="flex justify-between text-white/70">
                                        <span>Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    <div className="border-t border-white/20 pt-4">
                                        <div className="flex justify-between text-white text-xl font-bold">
                                            <span>Total</span>
                                            <span className="text-purple-400">${calculateTotal()}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105">
                                    Proceed to Checkout
                                </button>

                                <Link href="/products" className="block text-center text-purple-400 hover:text-purple-300 mt-4">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
