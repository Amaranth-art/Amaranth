"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { blogPosts } from '@/data/blogPosts';
import { motion } from 'motion/react';

export default function BlogPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get all unique categories
  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  // Filter posts by category
  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  // Sort posts by date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Category names
  const getCategoryName = (cat: string) => {
    const names: Record<string, {zh: string, en: string}> = {
      all: {zh: '全部', en: 'All'},
      about: {zh: '关于我们', en: 'About'},
      forex: {zh: '外汇交易', en: 'Forex'},
      gold: {zh: '黄金交易', en: 'Gold'},
      crypto: {zh: '数字货币', en: 'Crypto'},
      psychology: {zh: '交易心理', en: 'Psychology'},
      professional: {zh: '职业交易员', en: 'Professional'},
      wisdom: {zh: '交易智慧', en: 'Wisdom'}
    };
    return names[cat]?.[language] || cat;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section - Enhanced */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white border-b-2 border-gray-800 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider">{t('blog.hero.badge') || '专业交易知识'}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="font-black">{t('blog.title')}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('blog.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">{blogPosts.length}</span> {language === 'zh' ? '篇文章' : 'Articles'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">{categories.length - 1}</span> {language === 'zh' ? '个分类' : 'Categories'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">{blogPosts.filter(p => p.featured).length}</span> {language === 'zh' ? '精选推荐' : 'Featured'}
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-semibold border-2 whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white'
                }`}
              >
                {getCategoryName(category)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => router.push(`/splan/blog/${post.slug}`)}
              className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all cursor-pointer group"
            >
              {/* Featured Badge */}
              {post.featured && (
                <div className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-xs font-bold inline-block">
                  {t('blog.featured')}
                </div>
              )}

              <div className="p-6">
                {/* Category & Read Time */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    {getCategoryName(post.category)}
                  </span>
                  <span className="text-gray-400 dark:text-gray-600">•</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {post.readTime} {t('blog.minRead')}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:underline">
                  {post.title[language]}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt[language]}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')}</span>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {sortedPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('blog.noPosts')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
