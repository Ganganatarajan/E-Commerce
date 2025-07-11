import React from "react";
import Image1 from "../assets/20.png";
import img2 from "../assets/img4.avif";
import { FaShippingFast, FaShieldAlt, FaStar, FaRegHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';

const Banner = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const perks = [
    {
      icon: <FaShippingFast className="text-rose-500 w-8 h-8" />,
      title: "Fast Shipping",
      desc: "Get your orders delivered quickly and securely, worldwide.",
    },
    {
      icon: <FaShieldAlt className="text-rose-500 w-8 h-8" />,
      title: "Secure Payments",
      desc: "Your information is encrypted and protected at all times.",
    },
    {
      icon: <FaStar className="text-rose-500 w-8 h-8" />,
      title: "Top Rated",
      desc: "Loved by thousands of customers with over 4.9★ average rating.",
    },
  ];
  
  const products = [
    {
      id: 1,
      name: "Smartphone Pro Max",
      price: "$999",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=80",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: "$249",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Smartwatch Series X",
      price: "$399",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
    },
    {
      id: 4,
      name: "4K Ultra HD TV",
      price: "$1299",
      image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=600&q=80",
      rating: 4.9,
    },
    {
      id: 5,
      name: "Gaming Laptop Pro",
      price: "$1899",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80",
      rating: 4.6,
    },
    {
      id: 6,
      name: "Wireless Earbuds",
      price: "$179",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
      rating: 4.5,
    },
  ];

  return (
    <>
      <section
        id="banner"
        className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-12 left-10 w-24 h-24 bg-pink-100 rounded-full opacity-30 animate-float"></div>
          <div className="absolute bottom-20 right-8 w-20 h-20 bg-rose-200 rounded-full opacity-40 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply filter opacity-20 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[90vh] py-10">
            <div className="text-center lg:text-left animate-slide-up space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                <span className="block">Discover the Best</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 animate-pulse">
                  Deals on Your Favorites
                </span>
              </h1>

              <p className="text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
                Explore our latest collections in fashion, tech, beauty, home,
                and more. Quality guaranteed, with fast delivery and great
                prices.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  "🚀 Fast Worldwide Shipping",
                  "🔒 Secure Checkout",
                  "🎁 Exclusive Offers",
                ].map((item, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-sm rounded-full bg-white/70 border border-gray-200 backdrop-blur-sm shadow"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div>
                <button
                  onClick={() => scrollToSection("products")}
                  className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all group"
                >
                  <span className="relative z-10 flex items-center">
                    Shop Now
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto rounded-3xl bg-gradient-to-br from-pink-100 to-rose-200 shadow-xl overflow-hidden">
                <img
                  src={Image1}
                  alt="Hero Product"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-4 right-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow animate-float">
                <div className="text-xl font-bold text-pink-600">4.9★</div>
                <div className="text-xs text-gray-600">Top Rated</div>
              </div>

              <div
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="text-xl font-bold text-rose-600">1M+</div>
                <div className="text-xs text-gray-600">Customers Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="products" className="relative bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-rose-500 mb-4 tracking-tight">
              Trending Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular items loved by customers worldwide. Limited time offers available.
            </p>
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                  <div className="absolute top-4 right-4 z-10">
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-rose-50 transition-colors">
                      <FaRegHeart className="text-rose-400 w-5 h-5" />
                    </button>
                  </div>
                  <Link to={`/products/${product.id}`}>
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full h-1/3"></div>
                      <div className="absolute bottom-4 left-4 flex items-center bg-black/70 text-white px-2 py-1 rounded-full text-sm">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-5">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-rose-500 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-center">
                      <p className="text-rose-500 font-bold text-lg">{product.price}</p>
                      <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:from-rose-600 hover:to-pink-600 transition-colors duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-center mt-12">
            <Link to="/products" className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={img2} 
            alt="Luxury Shopping Experience" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/50"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 text-transparent bg-clip-text">
              Premium Shopping Experience
            </span>
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Elevate your style with our curated collection of luxury items. Exclusive offers for our members.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                title: "Exclusive Access", 
                desc: "Early access to new collections and limited editions"
              },
              { 
                title: "Personal Styling", 
                desc: "One-on-one consultation with our style experts"
              },
              { 
                title: "VIP Rewards", 
                desc: "Earn points on every purchase with special benefits"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
              >
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold px-8 py-4 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-colors text-lg"
            >
              Join Now
            </Link>
            <Link 
              to="/products" 
              className="bg-white/10 border border-white/30 font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-colors text-lg"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-600 mb-4">
        Shop by Category
      </h2>
      <p className="text-gray-600 max-w-xl text-xl  mx-auto">
        Explore our wide range of products organized by category
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {[
        {
          name: "Electronics",
          image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80",
          count: "142 items"
        },
        {
          name: "Fashion",
          image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
          count: "89 items"
        },
        {
          name: "Home & Kitchen",
          image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
          count: "76 items"
        },
        {
          name: "Beauty",
          image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
          count: "63 items"
        },
        {
          name: "Sports",
          image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=600&q=80",
          count: "54 items"
        }
      ].map((category, index) => (
        <Link 
          to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
          key={index}
          className="group"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-60">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
              <p className="text-rose-200 text-sm">{category.count}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>

    <div className="text-center mt-12">
      <Link 
        to="/products" 
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transition-colors"
      >
        Browse All Categories
        <svg 
          className="ml-2 -mr-1 h-5 w-5" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
    </div>
  </div>
</section>
      <section className="py-20 bg-rose-50 px-6" id="why-us">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Why Shop With{" "}
            <span className="bg-gradient-to-r from-rose-500 to-orange-400 text-transparent bg-clip-text">
              Us
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {perks.map((perk, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 transform transition hover:scale-105 group"
              >
                <div className="flex justify-center mb-4">{perk.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-rose-500 transition">
                  {perk.title}
                </h3>
                <p className="text-gray-600 text-sm">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Banner;