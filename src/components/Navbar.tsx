import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-[var(--primary-color)] font-bold text-xl">Elite Soccer</span>
            </Link>
          </div>
          
          <div className="hidden sm:flex items-center space-x-8">
            <Link href="/programs" className="text-gray-600 hover:text-[var(--primary-color)] transition-colors">
              Training Programs
            </Link>
            <Link href="/coaches" className="text-gray-600 hover:text-[var(--primary-color)] transition-colors">
              Our Coaches
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-[var(--primary-color)] transition-colors">
              About Us
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-[var(--primary-color)] transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </Link>
          </div>
          
          <div className="sm:hidden">
            <button className="text-gray-600 hover:text-[var(--primary-color)] transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 