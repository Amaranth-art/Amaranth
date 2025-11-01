"use client";
import { Code, Flex, Text } from "@radix-ui/themes";
import { LinkPreview } from "@/components/ui/link-preview";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { SparklesCore } from "@/components/ui/sparkles";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EmailContactModal from '@/components/custom/EmailContactModal';
import Image from 'next/image';

const DummyContent = () => {
  const router = useRouter();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 收益图片列表 (1-15)
  const profitImages = [
    '/profits/1.png',
    '/profits/2.png',
    '/profits/3.png',
    '/profits/4.png',
    '/profits/5.png',
    '/profits/6.png',
    '/profits/7.png',
    '/profits/8.png',
    '/profits/9.png',
    '/profits/10.png',
    '/profits/11.png',
    '/profits/12.jpg',
    '/profits/13.png',
    '/profits/14.png',
    '/profits/15.png',
  ];

  // 自动滚动图片 - 每次显示3张
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const nextIndex = prev + 3;
        // 如果超出范围，回到开头
        return nextIndex >= profitImages.length ? 0 : nextIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [profitImages.length]);

  return (
    <div className="w-full pt-20">{/* Added pt-20 for fixed navbar */}
      <BackgroundBeamsWithCollision>
        <div className="relative flex items-center justify-center" style={{ minHeight: 'calc(100vh - 10rem)' }}>
          <div className="w-full">
            <Flex width="100%" align="center" justify="center" direction="column">
              <div className="mb-4 flex justify-center">
                <span className="px-4 py-2 bg-black text-white text-sm font-semibold border border-gray-800">
                  Professional FX Trader Training Platform
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold text-center text-gray-900 dark:text-white mb-8 tracking-tight">
                <span className="font-black">FX</span> <span className="font-normal text-gray-600 dark:text-gray-400">Killer</span>
              </h1>
              <p className="text-2xl md:text-3xl text-center text-gray-700 dark:text-gray-200 mb-12 font-semibold">
                精准、专业、高效 - 培养真正的外汇交易专家
              </p>
            </Flex>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <button
                onClick={() => router.push('/splan/join-us')}
                className="px-10 py-5 bg-black text-white text-lg font-bold border-2 border-black hover:bg-white hover:text-black transition-colors"
              >
                了解外汇培训
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-10 py-5 bg-white text-black text-lg font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                进入交易系统
              </button>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* 为什么选择 FX Killer - 增强版 */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
          为什么选择 FX Killer
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          专注筛选和培养顶尖外汇交易员，培养真正适合的人，留下极少数，劝返大多数
        </p>

        {/* 核心优势 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <div className="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
              <span className="text-2xl text-white dark:text-black font-bold">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">精准筛选</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              30个工作日内判断是否适合外汇交易，避免浪费时间。不适合我们会如实告知，适合则全力培养。
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <div className="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
              <span className="text-2xl text-white dark:text-black font-bold">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">快速成长</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              科学避开错误定式，让合适的人在30个工作日内达到专家10-20年的外汇交易水平。
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <div className="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
              <span className="text-2xl text-white dark:text-black font-bold">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">高额分成</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              战利品至少60%属于你，随能力提升最高可达90%以上。荣辱与共，合作共赢。
            </p>
          </div>
        </div>

        {/* 与传统培训对比 */}
        <div className="bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-black dark:text-white">
            <span className="bg-black dark:bg-white text-white dark:text-black px-4 py-2">VS 传统外汇培训</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FX Killer */}
            <div className="bg-white dark:bg-gray-800 p-6 border-l-4 border-black dark:border-white">
              <h4 className="text-xl font-bold mb-4 text-black dark:text-white flex items-center gap-2">
                <span className="text-2xl">✓</span> FX Killer
              </h4>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span><strong>完全免费</strong> - 无任何培训费用</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span><strong>实战培养</strong> - 30天系统化职业训练</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span><strong>精准筛选</strong> - 不适合直接劝退，避免浪费时间</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span><strong>资金支持</strong> - 通过考核后提供交易资金</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span><strong>高额分成</strong> - 盈利60%-90%归你所有</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span><strong>职业发展</strong> - 培养独立交易员或基金经理</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span><strong>严格纪律</strong> - 军事化管理，培养职业素养</span>
                </li>
              </ul>
            </div>

            {/* 传统培训 */}
            <div className="bg-gray-100 dark:bg-gray-700 p-6 border-l-4 border-gray-400">
              <h4 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <span className="text-2xl">✗</span> 传统培训机构
              </h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>高额学费</strong> - 动辄数万元培训费</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>理论为主</strong> - 缺乏实战指导</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>来者不拒</strong> - 只要交钱就能学</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>自负盈亏</strong> - 交易全靠自己</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>无后续支持</strong> - 培训结束即结束</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>无职业规划</strong> - 学完后自己摸索</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>松散管理</strong> - 容易养成不良交易习惯</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-black dark:bg-gray-950 text-white p-6 text-center">
            <p className="text-lg font-semibold">
              我们致力于用最短的时间从大量人群中<span className="text-xl font-bold underline">筛选</span>出少数适合做外汇交易的人才并进行<span className="text-xl font-bold underline">培养</span>并给予<span className="text-xl font-bold underline">支持</span>
            </p>
          </div>
        </div>
      </div>

      {/* 职业发展路径 - 全新设计 */}
      <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-20 border-y-2 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
            职业发展路径
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 text-lg">
            30个工作日系统化培养，从新手到职业外汇交易员的完整路径
          </p>

          {/* 发展阶梯 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {/* 阶段 1 */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-black dark:bg-white border-2 border-black dark:border-white flex items-center justify-center">
                  <span className="text-white dark:text-black font-black text-2xl">1</span>
                </div>
                <div className="mt-4">
                  <div className="inline-block px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold mb-3">
                    第1-5个工作日
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black dark:text-white">规则学习</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    完成15个标准进场点练习，熟悉外汇交易系统基本规则
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 border-l-2 border-gray-400">
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      ⚠️ 5天内未通过规则考核将被劝退
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 阶段 2 */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-700 dark:border-gray-400 p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gray-700 dark:bg-gray-400 border-2 border-gray-700 dark:border-gray-400 flex items-center justify-center">
                  <span className="text-white dark:text-black font-black text-2xl">2</span>
                </div>
                <div className="mt-4">
                  <div className="inline-block px-3 py-1 bg-gray-700 dark:bg-gray-400 text-white dark:text-black text-xs font-bold mb-3">
                    第6-20个工作日
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black dark:text-white">盈利练习</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    找到适合自己的外汇交易品种，按照盈利考核标准进行练习
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 border-l-2 border-gray-600">
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      💡 保持操作一致性，不错单、不漏单、不亏损
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 阶段 3 */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-800 dark:border-gray-300 p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gray-800 dark:bg-gray-300 border-2 border-gray-800 dark:border-gray-300 flex items-center justify-center">
                  <span className="text-white dark:text-black font-black text-2xl">3</span>
                </div>
                <div className="mt-4">
                  <div className="inline-block px-3 py-1 bg-gray-800 dark:bg-gray-300 text-white dark:text-black text-xs font-bold mb-3">
                    第21-30个工作日
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black dark:text-white">盈利考核</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    连续10个工作日每天做到不错单、不漏单、不亏损
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 border-l-2 border-gray-700">
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      ✅ 通过考核进入小额实盘阶段
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 阶段 4 */}
            <div className="relative">
              <div className="bg-black dark:bg-white border-2 border-black dark:border-white p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-black dark:bg-white border-2 border-black dark:border-white flex items-center justify-center">
                  <span className="text-white dark:text-black font-black text-2xl">★</span>
                </div>
                <div className="mt-4">
                  <div className="inline-block px-3 py-1 bg-white dark:bg-black text-black dark:text-white text-xs font-bold mb-3">
                    小额实盘 → 大额矩阵
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white dark:text-black">职业交易员</h3>
                  <p className="text-sm text-gray-300 dark:text-gray-700 mb-4">
                    20个工作日小额实盘固化后，进入大额矩阵
                  </p>
                  <div className="bg-gray-800 dark:bg-gray-200 p-3 border-l-2 border-white dark:border-black">
                    <p className="text-xs text-white dark:text-black font-semibold">
                      🎯 完全自由的工作时间，开始独立外汇交易员生涯
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 你是否符合基本条件 - 全新设计 */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
          你是否符合基本条件
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          严格的准入标准，确保外汇培训质量 - <span className="text-black dark:text-white font-bold">每个人只有一次进入的机会</span>
        </p>

        {/* 条件卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 人群画像 */}
          <div className="bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-200 p-8 border-2 border-black dark:border-white">
            <div className="text-white dark:text-black">
              <div className="text-5xl mb-4">👤</div>
              <h3 className="text-2xl font-bold mb-6">人群画像</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-white dark:border-black pl-4">
                  <p className="font-bold text-lg">学历与年龄</p>
                  <p className="text-sm text-gray-300 dark:text-gray-700">大专学历以上，35岁以下</p>
                </div>
                <div className="border-l-4 border-white dark:border-black pl-4">
                  <p className="font-bold text-lg">心理素质</p>
                  <p className="text-sm text-gray-300 dark:text-gray-700">认真、细心、耐心、心理健康</p>
                </div>
                <div className="border-l-4 border-white dark:border-black pl-4">
                  <p className="font-bold text-lg">性格特质</p>
                  <p className="text-sm text-gray-300 dark:text-gray-700">性格内向、稳重、纪律严明且执行力强</p>
                </div>
              </div>
            </div>
          </div>

          {/* 时间与环境 */}
          <div className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-300 dark:border-gray-600">
            <div className="text-5xl mb-4">⏰</div>
            <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">时间与环境</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">时间投入</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">连续30个工作日（约45天）</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">设备要求</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Windows电脑</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">环境要求</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">独立的交易环境，专注不被打扰</p>
                </div>
              </div>
            </div>
          </div>

          {/* 在线时间 */}
          <div className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-300 dark:border-gray-600">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">在线时间</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">交易时段</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">周一到周五 13:30-21:30</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">团队复盘</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">每天20:00团队长会议室复盘</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 重要提示 */}
        <div className="bg-black dark:bg-white text-white dark:text-black p-8 border-2 border-black dark:border-white">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-black flex items-center justify-center">
              <svg className="w-8 h-8 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold mb-3">重要提醒</h4>
              <p className="text-lg leading-relaxed mb-4">
                每个人<span className="text-2xl font-black underline">只有一次进入的机会</span>。请在充分了解并确认自己符合全部条件后再申请。
              </p>
              <p className="text-gray-300 dark:text-gray-700">
                我们专注培养真正适合外汇交易的人才。在外汇交易的世界里，有些人天生不适合。他们急于求成，却不知自己真正追求什么；他们只瞥一眼表象，便止步不前，无法洞察事物的深层本质。如果你属于这一类，或许其他行业更能发挥你的长处。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 视频介绍板块 */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20 border-y-2 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
            了解交易员职业
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
            交易员是个自由职业，不受时间空间限制 - 通过纪录片深入了解这个职业
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 视频 1 */}
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 overflow-hidden group hover:border-black dark:hover:border-white transition-all">
              <div className="relative h-64 bg-black dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-lg font-semibold">百万美金交易员</p>
                  <p className="text-sm text-gray-400">豆瓣评分 8.7</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">百万美金交易员</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  这部纪录片展现了交易员培训的真实过程，从筛选到培养，再到成为职业交易员的完整路径。了解交易员这个职业的真实面貌，以及成为顶尖交易员需要具备的素质。
                </p>
                <a
                  href="https://www.bilibili.com/video/BV19a411X7eY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
                >
                  观看视频 →
                </a>
              </div>
            </div>

            {/* 视频 2 */}
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 overflow-hidden group hover:border-black dark:hover:border-white transition-all">
              <div className="relative h-64 bg-black dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-lg font-semibold">交易员：转瞬百万</p>
                  <p className="text-sm text-gray-400">豆瓣评分 8.0</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">交易员：转瞬百万</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  深入展示交易员的日常工作和心理压力，揭示在二级市场中如何做出快速决策，以及职业交易员所需要的心理素质和专业技能。这是一个高压但充满机会的职业。
                </p>
                <a
                  href="https://www.bilibili.com/video/BV1FZ4y1o734"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
                >
                  观看视频 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 学员展示 - 收益滚动 */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
          学员真实收益展示
        </h2>

        {/* 收益统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700 text-center">
            <div className="text-4xl font-black text-black dark:text-white mb-2">初级交易员</div>
            <p className="text-2xl font-bold text-black dark:text-white">¥10,000 - ¥30,000</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">月收入范围</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white text-center">
            <div className="text-4xl font-black text-black dark:text-white mb-2">中级交易员</div>
            <p className="text-2xl font-bold text-black dark:text-white">¥30,000 - ¥60,000</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">月收入范围</p>
          </div>
          <div className="bg-black dark:bg-white p-6 border-2 border-black dark:border-white text-center">
            <div className="text-4xl font-black text-white dark:text-black mb-2">资深交易员</div>
            <p className="text-2xl font-bold text-white dark:text-black">¥60,000 - ¥100,000+</p>
            <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">月收入范围</p>
          </div>
        </div>

        {/* 收益图片滚动展示 - 每次显示3张 */}
        <div className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
            学员实盘收益截图
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((offset) => {
              const imageIndex = currentImageIndex + offset;
              const image = profitImages[imageIndex < profitImages.length ? imageIndex : imageIndex - profitImages.length];
              return (
                <div key={offset} className="relative h-80 overflow-hidden bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <img
                      src={image}
                      alt={`学员收益 ${imageIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              以上为学员真实交易收益截图
            </p>
          </div>
        </div>
      </div>

      {/* CTA - 优化版 */}
      <div className="bg-black dark:bg-gray-950 py-20 w-full border-y-2 border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            准备好开启你的外汇交易员生涯了吗？
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            记住：最大风险是淘汰，成本是时间。若明朗、准备就绪，预约面试。通过后，入训。
          </p>

          {/* 通过率警告 - 重新设计 */}
          <div className="relative max-w-3xl mx-auto mb-12">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-red-500/20 to-yellow-500/20 blur-xl"></div>

            <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500/50 p-8 shadow-2xl">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-yellow-500 mb-2">特别提示</h3>
                <div className="h-1 w-24 bg-yellow-500"></div>
              </div>

              <div className="text-center mb-8">
                <p className="text-sm text-gray-400 mb-3">最终通过率</p>
                <p className="text-6xl font-black text-white mb-2">
                  <span className="text-yellow-500">10</span>-<span className="text-yellow-500">15</span><span className="text-4xl">%</span>
                </p>
                <p className="text-gray-300 text-lg">
                  我们培养真正适合的人，留下极少数，劝返大多数
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-black/50 backdrop-blur-sm p-4 border border-red-500/30">
                  <p className="text-xs text-gray-500 mb-2">淘汰原因</p>
                  <p className="text-sm text-white font-bold">不适合这一行业</p>
                </div>
                <div className="bg-black/50 backdrop-blur-sm p-4 border border-red-500/30">
                  <p className="text-xs text-gray-500 mb-2">机会次数</p>
                  <p className="text-sm text-white font-bold">只有一次</p>
                </div>
                <div className="bg-black/50 backdrop-blur-sm p-4 border border-red-500/30">
                  <p className="text-xs text-gray-500 mb-2">时间成本</p>
                  <p className="text-sm text-white font-bold">45天</p>
                </div>
                <div className="bg-black/50 backdrop-blur-sm p-4 border border-green-500/30">
                  <p className="text-xs text-gray-500 mb-2">金钱成本</p>
                  <p className="text-sm text-green-400 font-bold">完全免费</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="px-10 py-5 bg-white text-black font-bold text-lg border-2 border-white hover:bg-black hover:text-white transition-colors animate-shake"
            >
              立即预约面试
            </button>
            <p className="text-sm text-gray-500">
              请在充分了解并确认自己符合全部条件后再申请
            </p>
          </div>
        </div>
      </div>

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="职业交易员面试"
      />
    </div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#000"
        />
      </div>
      <DummyContent />
    </div>
  );
}
