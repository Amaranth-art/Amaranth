import { Metadata } from 'next';
import Link from 'next/link';

// SEO Metadata
export const metadata: Metadata = {
  title: '外汇交易教育中心 - 系统化学习外汇交易知识 | FX Killer',
  description: '完整的外汇交易教育体系，涵盖基础知识、技术分析、交易策略、风险管理。从零基础到职业交易员，FX Killer助你系统化学习外汇交易。',
  keywords: '外汇教育, 外汇学习, 交易课程, 外汇培训, 技术分析教程, 交易策略, 风险管理',
  openGraph: {
    title: '外汇交易教育中心 | FX Killer',
    description: '系统化学习外汇交易，从零基础到职业交易员',
    type: 'website',
    locale: 'zh_CN',
  },
};

// Course categories data
const courseCategories = [
  {
    id: 'basics',
    icon: '📚',
    title: '基础知识',
    description: '掌握外汇交易的核心概念和基础理论',
    color: 'border-black dark:border-white',
    bgColor: 'bg-gray-50 dark:bg-gray-900',
    courses: [
      { title: '外汇交易基础', slug: 'forex-basics', status: '热门' },
      { title: '货币对完整解析', slug: 'currency-pairs', status: '即将推出' },
      { title: '外汇市场交易时段', slug: 'trading-sessions', status: '即将推出' },
      { title: '外汇术语大全', slug: 'forex-glossary', status: '即将推出' },
      { title: '外汇市场运作机制', slug: 'market-mechanism', status: '即将推出' },
    ]
  },
  {
    id: 'technical',
    icon: '📊',
    title: '技术分析',
    description: '学习图表分析、技术指标和价格行为',
    color: 'border-black dark:border-white',
    bgColor: 'bg-gray-50 dark:bg-gray-900',
    courses: [
      { title: '技术分析入门教程', slug: 'technical-analysis', status: '即将推出' },
      { title: 'K线形态识别指南', slug: 'candlestick-patterns', status: '即将推出' },
      { title: '技术指标详解(MACD/RSI)', slug: 'technical-indicators', status: '即将推出' },
      { title: '支撑阻力与趋势线', slug: 'support-resistance', status: '即将推出' },
      { title: '价格行为交易策略', slug: 'price-action', status: '即将推出' },
    ]
  },
  {
    id: 'strategies',
    icon: '🎯',
    title: '交易策略',
    description: '实战交易策略和系统化交易方法',
    color: 'border-black dark:border-white',
    bgColor: 'bg-gray-50 dark:bg-gray-900',
    courses: [
      { title: '日内交易完整指南', slug: 'day-trading', status: '即将推出' },
      { title: '波段交易策略', slug: 'swing-trading', status: '即将推出' },
      { title: '剥头皮交易技巧', slug: 'scalping', status: '即将推出' },
      { title: '趋势跟踪系统', slug: 'trend-following', status: '即将推出' },
      { title: '突破交易策略', slug: 'breakout-trading', status: '即将推出' },
    ]
  },
  {
    id: 'risk',
    icon: '🛡️',
    title: '风险管理',
    description: '仓位控制、最大回撤和交易心理',
    color: 'border-black dark:border-white',
    bgColor: 'bg-gray-50 dark:bg-gray-900',
    courses: [
      { title: '风险管理基础', slug: 'risk-management', status: '即将推出' },
      { title: '仓位控制与资金管理', slug: 'position-sizing', status: '即将推出' },
      { title: '止损策略大全', slug: 'stop-loss-strategies', status: '即将推出' },
      { title: '交易心理学', slug: 'trading-psychology', status: '即将推出' },
      { title: '风险回报比优化', slug: 'risk-reward', status: '即将推出' },
    ]
  }
];

// Learning paths
const learningPaths = [
  {
    title: '新手路径',
    subtitle: '零基础入门',
    steps: [
      '外汇交易基础',
      '技术分析入门',
      '模拟账户练习',
      '小额实盘交易'
    ],
    color: 'bg-black dark:bg-white'
  },
  {
    title: '进阶路径',
    subtitle: '提升交易技能',
    steps: [
      '深入技术分析',
      '交易策略学习',
      '风险管理实践',
      '系统化交易'
    ],
    color: 'bg-black dark:bg-white'
  },
  {
    title: '专业路径',
    subtitle: '职业交易员培训',
    steps: [
      '掌握核心指标',
      '仓位与回撤控制',
      'FX Killer 30天培训',
      '通过考核获得资金'
    ],
    color: 'bg-black dark:bg-white'
  }
];

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <div className="bg-black dark:bg-white text-white dark:text-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
              外汇交易教育中心
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-700 mb-12 leading-relaxed">
              系统化学习外汇交易知识，从零基础到职业交易员<br />
              专业、实战、高效的学习路径
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-4xl font-black mb-2">20+</div>
                <div className="text-sm text-gray-400 dark:text-gray-600">专业课程</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-2">4</div>
                <div className="text-sm text-gray-400 dark:text-gray-600">学习方向</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-2">100%</div>
                <div className="text-sm text-gray-400 dark:text-gray-600">免费学习</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-2">24/7</div>
                <div className="text-sm text-gray-400 dark:text-gray-600">随时访问</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Categories Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-black dark:text-white">
            课程分类
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            选择适合你的学习方向，系统化掌握外汇交易技能
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {courseCategories.map((category) => (
            <div
              key={category.id}
              className={`border-2 ${category.color} ${category.bgColor} p-8 hover:shadow-xl transition-all`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{category.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-2 text-black dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {category.courses.map((course, index) => (
                  <Link
                    key={index}
                    href={course.status === '热门' ? `/education/${course.slug}` : '#'}
                    className={`block p-4 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group ${
                      course.status === '即将推出' ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{course.title}</span>
                      {course.status && (
                        <span className={`text-xs px-3 py-1 border-2 border-black dark:border-white ${
                          course.status === '热门'
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                          {course.status}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="#"
                  className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-all"
                >
                  查看全部 {category.title}课程 →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Paths Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-black dark:text-white">
              学习路径推荐
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              根据你的水平和目标，选择合适的学习路径
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <div
                key={index}
                className="border-2 border-black dark:border-white p-8 hover:shadow-xl transition-all"
              >
                <div className={`${path.color} text-white dark:text-black px-4 py-2 inline-block mb-4`}>
                  <span className="font-bold">路径 {index + 1}</span>
                </div>
                <h3 className="text-2xl font-black mb-2 text-black dark:text-white">
                  {path.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{path.subtitle}</p>

                <div className="space-y-3 mb-6">
                  {path.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                        {stepIndex + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="#"
                  className="block w-full text-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-all"
                >
                  开始学习
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Why Learn Here Section */}
        <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-white p-12 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center text-black dark:text-white">
              为什么选择 FX Killer 教育中心？
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">✅</div>
                <div>
                  <h4 className="font-bold mb-2 text-black dark:text-white">系统化课程体系</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    从基础到进阶，循序渐进的学习路径
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">✅</div>
                <div>
                  <h4 className="font-bold mb-2 text-black dark:text-white">实战导向内容</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    由职业交易员编写，注重实战应用
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">✅</div>
                <div>
                  <h4 className="font-bold mb-2 text-black dark:text-white">完全免费学习</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    所有课程100%免费，无隐藏费用
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">✅</div>
                <div>
                  <h4 className="font-bold mb-2 text-black dark:text-white">随时随地访问</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    24/7在线访问，自由安排学习时间
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">✅</div>
                <div>
                  <h4 className="font-bold mb-2 text-black dark:text-white">持续更新内容</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    根据市场变化，定期更新课程内容
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">✅</div>
                <div>
                  <h4 className="font-bold mb-2 text-black dark:text-white">配套工具支持</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    免费交易计算器和分析工具
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black dark:bg-white text-white dark:text-black p-12 border-2 border-black dark:border-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              准备好成为职业交易员了吗？
            </h2>
            <p className="text-xl mb-8 text-gray-300 dark:text-gray-700">
              完成教育中心的学习后，加入 FX Killer 30天系统化培训<br />
              通过考核，获得真实资金进行交易
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/splan/join-us"
                className="px-10 py-4 bg-white dark:bg-black text-black dark:text-white font-bold text-lg border-2 border-white dark:border-black hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-black transition-all inline-block text-center"
              >
                了解培训计划
              </Link>
              <Link
                href="/splan/psychology-test"
                className="px-10 py-4 bg-transparent text-white dark:text-black font-bold text-lg border-2 border-white dark:border-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all inline-block text-center"
              >
                免费心理测评
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gray-50 dark:bg-gray-900 border-t-2 border-black dark:border-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-black dark:text-white">基础知识</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/education/forex-basics" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">外汇交易基础</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">货币对解析</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">交易时段</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-black dark:text-white">技术分析</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">技术分析入门</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">K线形态</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">技术指标</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-black dark:text-white">交易策略</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">日内交易</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">波段交易</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">剥头皮</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-black dark:text-white">相关资源</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools/position-calculator" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">仓位计算器</Link></li>
                <li><Link href="/splan/blog" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">交易博客</Link></li>
                <li><Link href="/splan/faq" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">常见问题</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
