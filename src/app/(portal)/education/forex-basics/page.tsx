import { Metadata } from 'next';
import Link from 'next/link';

// SEO Metadata
export const metadata: Metadata = {
  title: '外汇交易基础知识完整指南 - 从零开始学习外汇交易 | FX Killer',
  description: '完整的外汇交易入门教程，涵盖外汇市场基础、交易术语、技术分析、风险管理等核心知识。适合零基础新手，由职业交易员编写，助你快速掌握外汇交易essentials。',
  keywords: '外汇交易基础, 外汇入门, 外汇教程, 外汇市场, 外汇交易知识, 新手学外汇, FX交易教程',
  openGraph: {
    title: '外汇交易基础知识完整指南 | FX Killer',
    description: '零基础学习外汇交易，掌握核心交易技能。专业、易懂、实战。',
    type: 'article',
    locale: 'zh_CN',
  },
};

export default function ForexBasicsPage() {

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b-2 border-black dark:border-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
              首页
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/education" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
              教育中心
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-black dark:text-white font-bold">外汇交易基础</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-black dark:bg-white text-white dark:text-black py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            外汇交易基础知识<br />完整指南
          </h1>
          <p className="text-xl text-gray-300 dark:text-gray-700 mb-8 leading-relaxed">
            从零开始掌握外汇交易的核心概念、市场机制和交易技巧。
            本指南由职业交易员编写，结合理论与实战，助你快速入门外汇市场。
          </p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 dark:text-gray-600">📖 阅读时间:</span>
              <span className="font-bold">15 分钟</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 dark:text-gray-600">📊 难度:</span>
              <span className="font-bold">入门级</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 dark:text-gray-600">🎯 更新:</span>
              <span className="font-bold">2025年1月</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">

        {/* Table of Contents */}
        <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-white p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">📑 内容目录</h2>
          <nav className="space-y-2">
            <a href="#what-is-forex" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              1. 什么是外汇交易？
            </a>
            <a href="#forex-market" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              2. 外汇市场的运作机制
            </a>
            <a href="#currency-pairs" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              3. 货币对：交易的基础单位
            </a>
            <a href="#key-terms" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              4. 核心交易术语解析
            </a>
            <a href="#how-to-trade" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              5. 外汇交易如何进行？
            </a>
            <a href="#practical-tips" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              6. 新手实战技巧
            </a>
            <a href="#faq" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              7. 常见问题解答
            </a>
          </nav>
        </div>

        {/* Section 1: What is Forex */}
        <section id="what-is-forex" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
            什么是外汇交易？
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong className="text-black dark:text-white">外汇交易（Forex Trading）</strong>，全称为"外汇兑换交易"或"外汇保证金交易"，是指通过买卖不同国家的货币来赚取汇率差价的投资行为。外汇市场（Foreign Exchange Market，简称Forex或FX）是全球最大、流动性最强的金融市场。
            </p>

            <div className="bg-black dark:bg-white text-white dark:text-black p-6 my-6 border-2 border-black dark:border-white">
              <h3 className="text-xl font-bold mb-4">💡 核心概念</h3>
              <p className="mb-0">
                外汇交易的本质是<strong>货币对之间的价值交换</strong>。例如，当你交易EUR/USD货币对时，你实际上是在用美元买入欧元（做多），或用欧元买入美元（做空）。汇率的波动就是你的盈利来源。
              </p>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">外汇市场的规模</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              根据国际清算银行（BIS）2022年的数据，全球外汇市场日均交易量超过<strong className="text-black dark:text-white">7.5万亿美元</strong>，是全球股市交易量的数十倍。这种巨大的流动性意味着：
            </p>

            <ul className="list-none space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-black dark:text-white font-bold">✓</span>
                <span className="text-gray-700 dark:text-gray-300">订单执行速度快，几乎无滑点</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black dark:text-white font-bold">✓</span>
                <span className="text-gray-700 dark:text-gray-300">买卖价差（点差）极小，交易成本低</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black dark:text-white font-bold">✓</span>
                <span className="text-gray-700 dark:text-gray-300">市场难以被操纵，价格公正透明</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Market Mechanism */}
        <section id="forex-market" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
            外汇市场的运作机制
          </h2>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">24小时不间断交易</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              与股票市场不同，外汇市场是一个<strong className="text-black dark:text-white">去中心化的全球市场</strong>，通过电子网络连接全球银行、经纪商和交易者。由于全球时区的差异，外汇市场实现了24小时连续交易（周一至周五）。
            </p>

            {/* Trading Sessions Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-2 border-black dark:border-white">
                <thead>
                  <tr className="bg-black dark:bg-white text-white dark:text-black">
                    <th className="border-2 border-black dark:border-white px-4 py-3 text-left font-bold">交易时段</th>
                    <th className="border-2 border-black dark:border-white px-4 py-3 text-left font-bold">开盘时间（北京时间）</th>
                    <th className="border-2 border-black dark:border-white px-4 py-3 text-left font-bold">特点</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr>
                    <td className="border-2 border-black dark:border-white px-4 py-3 font-bold">悉尼时段</td>
                    <td className="border-2 border-black dark:border-white px-4 py-3">06:00 - 15:00</td>
                    <td className="border-2 border-black dark:border-white px-4 py-3">流动性较低，波动较小</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border-2 border-black dark:border-white px-4 py-3 font-bold">东京时段</td>
                    <td className="border-2 border-black dark:border-white px-4 py-3">08:00 - 16:00</td>
                    <td className="border-2 border-black dark:border-white px-4 py-3">亚洲货币对活跃</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black dark:border-white px-4 py-3 font-bold">伦敦时段</td>
                    <td className="border-2 border-black dark:border-white px-4 py-3">15:30 - 00:30</td>
                    <td className="border-2 border-black dark:border-white px-4 py-3">交易量最大，波动性高</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="border-2 border-black dark:border-white px-4 py-3 font-bold">纽约时段</td>
                    <td className="border-2 border-black dark:border-white px-4 py-3">20:30 - 05:00</td>
                    <td className="border-2 border-black dark:border-white px-4 py-3">美元货币对最活跃</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-white p-6 my-6">
              <h4 className="text-lg font-bold mb-3 text-black dark:text-white">⚡️ 实战技巧：最佳交易时间</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-0">
                伦敦-纽约重叠时段（北京时间 20:30-00:30）是流动性最强、波动最大的黄金交易时段。超过50%的外汇交易发生在这个时段，非常适合日内交易和短线策略。
              </p>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">市场参与者</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              外汇市场的主要参与者包括：
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border-2 border-black dark:border-white p-4">
                <h4 className="font-bold text-black dark:text-white mb-2">🏦 中央银行</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">控制货币供应，干预汇率以维护经济稳定</p>
              </div>
              <div className="border-2 border-black dark:border-white p-4">
                <h4 className="font-bold text-black dark:text-white mb-2">🏢 商业银行</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">为企业和个人提供外汇兑换服务</p>
              </div>
              <div className="border-2 border-black dark:border-white p-4">
                <h4 className="font-bold text-black dark:text-white mb-2">🏭 企业机构</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">跨国公司进行国际贸易结算和汇率风险对冲</p>
              </div>
              <div className="border-2 border-black dark:border-white p-4">
                <h4 className="font-bold text-black dark:text-white mb-2">👤 个人交易者</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">通过经纪商平台进行投机交易，追求汇率差价利润</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Currency Pairs */}
        <section id="currency-pairs" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
            货币对：交易的基础单位
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              外汇交易始终以<strong className="text-black dark:text-white">货币对（Currency Pair）</strong>的形式进行。货币对由两种货币组成，例如 EUR/USD（欧元/美元）。
            </p>

            <div className="bg-black dark:bg-white text-white dark:text-black p-6 my-6 border-2 border-black dark:border-white">
              <h3 className="text-xl font-bold mb-4">📐 货币对结构解析</h3>
              <div className="space-y-3">
                <p><strong>基础货币（Base Currency）</strong>：货币对中的第一个货币，数量固定为1单位</p>
                <p><strong>报价货币（Quote Currency）</strong>：货币对中的第二个货币，表示购买1单位基础货币所需的报价货币数量</p>
                <p className="mt-4"><strong>示例：EUR/USD = 1.1000</strong></p>
                <p className="mb-0">意味着 1 欧元 = 1.1000 美元</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">主要货币对分类</h3>

            <div className="space-y-6 mb-8">
              <div className="border-l-4 border-black dark:border-white pl-6">
                <h4 className="text-xl font-bold mb-3 text-black dark:text-white">1. 主要货币对（Major Pairs）</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  包含美元且交易量最大的7个货币对，占全球外汇交易量的80%以上：
                </p>
                <ul className="grid md:grid-cols-2 gap-2 list-none">
                  <li className="text-gray-700 dark:text-gray-300">• EUR/USD（欧元/美元）- 交易量最大</li>
                  <li className="text-gray-700 dark:text-gray-300">• USD/JPY（美元/日元）</li>
                  <li className="text-gray-700 dark:text-gray-300">• GBP/USD（英镑/美元）</li>
                  <li className="text-gray-700 dark:text-gray-300">• USD/CHF（美元/瑞郎）</li>
                  <li className="text-gray-700 dark:text-gray-300">• AUD/USD（澳元/美元）</li>
                  <li className="text-gray-700 dark:text-gray-300">• USD/CAD（美元/加元）</li>
                  <li className="text-gray-700 dark:text-gray-300">• NZD/USD（纽元/美元）</li>
                </ul>
              </div>

              <div className="border-l-4 border-gray-400 pl-6">
                <h4 className="text-xl font-bold mb-3 text-black dark:text-white">2. 交叉货币对（Cross Pairs）</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  不包含美元的货币对，如 EUR/GBP、EUR/JPY、GBP/JPY 等。
                </p>
              </div>

              <div className="border-l-4 border-gray-400 pl-6">
                <h4 className="text-xl font-bold mb-3 text-black dark:text-white">3. 异国货币对（Exotic Pairs）</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  包含新兴市场货币的货币对，如 USD/TRY（美元/土耳其里拉）、USD/ZAR（美元/南非兰特）。流动性较低，点差较大。
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-white p-6 my-6">
              <h4 className="text-lg font-bold mb-3 text-black dark:text-white">💡 新手建议</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-0">
                初学者应从主要货币对开始交易，特别是 EUR/USD 和 GBP/USD。它们具有最高的流动性、最低的点差和最丰富的分析资源，非常适合学习和积累经验。
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Key Terms */}
        <section id="key-terms" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
            核心交易术语解析
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              掌握以下术语是理解外汇交易的关键：
            </p>

            <div className="space-y-4 mb-8">
              <div className="border-2 border-black dark:border-white p-5">
                <h4 className="text-lg font-bold mb-2 text-black dark:text-white">点（Pip）</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  外汇价格变动的最小单位。对于大多数货币对，1 pip = 0.0001。例如，EUR/USD 从 1.1000 上涨到 1.1050，上涨了 50 个点。
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                  <strong>实战示例：</strong>交易1标准手EUR/USD，每点价值约10美元。50点的波动意味着500美元的盈亏。
                </p>
              </div>

              <div className="border-2 border-black dark:border-white p-5">
                <h4 className="text-lg font-bold mb-2 text-black dark:text-white">点差（Spread）</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  买入价（Ask）和卖出价（Bid）之间的差价，是经纪商的主要收入来源。主要货币对的点差通常在0.5-2个点之间。
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                  <strong>计算公式：</strong>点差 = 买入价 - 卖出价
                </p>
              </div>

              <div className="border-2 border-black dark:border-white p-5">
                <h4 className="text-lg font-bold mb-2 text-black dark:text-white">手数（Lot）</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  外汇交易的标准单位：
                </p>
                <ul className="list-none space-y-2 mb-0">
                  <li className="text-gray-700 dark:text-gray-300">• <strong className="text-black dark:text-white">标准手（Standard Lot）</strong>：100,000 单位基础货币</li>
                  <li className="text-gray-700 dark:text-gray-300">• <strong className="text-black dark:text-white">迷你手（Mini Lot）</strong>：10,000 单位</li>
                  <li className="text-gray-700 dark:text-gray-300">• <strong className="text-black dark:text-white">微型手（Micro Lot）</strong>：1,000 单位</li>
                </ul>
              </div>

              <div className="border-2 border-black dark:border-white p-5">
                <h4 className="text-lg font-bold mb-2 text-black dark:text-white">杠杆（Leverage）</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  允许交易者用较小的资金控制较大的交易头寸。常见杠杆比例：1:50、1:100、1:500。
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                  <strong>示例：</strong>100倍杠杆意味着用1,000美元可以交易100,000美元的头寸（1标准手）。
                </p>
              </div>

              <div className="border-2 border-black dark:border-white p-5">
                <h4 className="text-lg font-bold mb-2 text-black dark:text-white">保证金（Margin）</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  开仓所需的最低资金。使用杠杆后，保证金 = 交易头寸 ÷ 杠杆倍数。
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                  <strong>计算示例：</strong>1标准手EUR/USD（价值100,000美元），使用100倍杠杆，所需保证金 = 100,000 ÷ 100 = 1,000美元。
                </p>
              </div>

              <div className="border-2 border-black dark:border-white p-5 bg-red-50 dark:bg-red-950">
                <h4 className="text-lg font-bold mb-2 text-black dark:text-white">⚠️ 止损（Stop Loss）</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-0">
                  预设的自动平仓价格，用于限制亏损。这是风险管理的核心工具，<strong className="text-black dark:text-white">每笔交易都必须设置止损</strong>。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: How to Trade */}
        <section id="how-to-trade" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
            外汇交易如何进行？
          </h2>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">交易方向</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              外汇交易有两个基本方向：
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-green-600 p-6">
                <h4 className="text-xl font-bold mb-3 text-green-600">📈 做多（Buy / Long）</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  买入基础货币，预期其相对报价货币升值。
                </p>
                <div className="bg-green-50 dark:bg-green-950 p-4 border border-green-600">
                  <p className="text-sm font-bold mb-2">示例：</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-0">
                    EUR/USD = 1.1000 时买入 → 价格涨至 1.1050 平仓 → 盈利 50 点
                  </p>
                </div>
              </div>

              <div className="border-2 border-red-600 p-6">
                <h4 className="text-xl font-bold mb-3 text-red-600">📉 做空（Sell / Short）</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  卖出基础货币，预期其相对报价货币贬值。
                </p>
                <div className="bg-red-50 dark:bg-red-950 p-4 border border-red-600">
                  <p className="text-sm font-bold mb-2">示例：</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-0">
                    EUR/USD = 1.1000 时卖出 → 价格跌至 1.0950 平仓 → 盈利 50 点
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">交易流程（5步法）</h3>

            <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-black dark:text-white">选择货币对</h4>
                  <p className="text-gray-700 dark:text-gray-300">根据市场分析和交易策略选择目标货币对，新手建议从EUR/USD开始。</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-black dark:text-white">分析市场</h4>
                  <p className="text-gray-700 dark:text-gray-300">使用技术分析（图表、指标）和基本面分析（经济数据、新闻）判断价格走势。</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-black dark:text-white">确定交易参数</h4>
                  <p className="text-gray-700 dark:text-gray-300">设置手数、止损位、止盈位。遵循风险管理原则：单笔风险不超过账户资金的1-2%。</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-black dark:text-white">执行交易</h4>
                  <p className="text-gray-700 dark:text-gray-300">通过交易平台（如MT4/MT5）下单。确认订单类型：市价单（立即成交）或挂单（达到指定价格后成交）。</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-black dark:text-white">监控与平仓</h4>
                  <p className="text-gray-700 dark:text-gray-300">跟踪持仓，根据市场变化调整策略。触及止损或止盈自动平仓，或手动平仓锁定利润。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Practical Tips */}
        <section id="practical-tips" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
            新手实战技巧
          </h2>

          <div className="prose prose-lg max-w-none">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-black dark:bg-white text-white dark:text-black p-6 border-2 border-black dark:border-white">
                <h3 className="text-xl font-bold mb-4">✅ 应该做的</h3>
                <ul className="space-y-3 list-none">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>从模拟账户开始，至少练习3个月</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>制定交易计划并严格执行</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>每笔交易都设置止损</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>控制单笔风险在1-2%以内</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>记录交易日志，总结经验</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>持续学习技术分析和基本面分析</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-6 border-2 border-red-600">
                <h3 className="text-xl font-bold mb-4 text-red-600">❌ 不应该做的</h3>
                <ul className="space-y-3 list-none text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>未经充分学习就进入真实市场</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>使用过高杠杆（建议≤1:100）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>投入无法承受损失的资金</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>情绪化交易（追涨杀跌）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>频繁更换交易策略</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>忽视风险管理</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-white p-8 my-8">
              <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">🎯 FX Killer 推荐学习路径</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">📚</span>
                  <div>
                    <p className="font-bold text-black dark:text-white mb-1">第1阶段：理论学习（2-4周）</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">掌握外汇基础概念、交易术语、市场机制</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🎮</span>
                  <div>
                    <p className="font-bold text-black dark:text-white mb-1">第2阶段：模拟交易（2-3个月）</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">在模拟账户中测试策略，建立交易系统</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="font-bold text-black dark:text-white mb-1">第3阶段：小额实盘（1-2个月）</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">用小资金实盘练习，适应真实市场心理压力</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <p className="font-bold text-black dark:text-white mb-1">第4阶段：系统化交易（持续）</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">完善交易系统，稳定盈利，逐步扩大资金规模</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
            常见问题解答
          </h2>

          <div className="space-y-4">
            <details className="border-2 border-black dark:border-white p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-black dark:text-white list-none flex items-center justify-between">
                <span>Q1: 外汇交易需要多少启动资金？</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="mb-3">
                  理论上，100美元即可开始交易微型手。但从风险管理角度，我们建议：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-black dark:text-white">模拟练习阶段：</strong>0美元（免费模拟账户）</li>
                  <li><strong className="text-black dark:text-white">小额实盘练习：</strong>500-1000美元</li>
                  <li><strong className="text-black dark:text-white">正式交易：</strong>5000-10000美元（可获得更好的风险控制和盈利空间）</li>
                </ul>
              </div>
            </details>

            <details className="border-2 border-black dark:border-white p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-black dark:text-white list-none flex items-center justify-between">
                <span>Q2: 外汇交易的风险大吗？</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="mb-3">
                  外汇交易属于<strong className="text-black dark:text-white">高风险投资</strong>，主要风险包括：
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>杠杆风险：高杠杆放大收益的同时也放大亏损</li>
                  <li>市场风险：汇率剧烈波动可能导致快速亏损</li>
                  <li>流动性风险：极端市场条件下可能出现滑点</li>
                </ul>
                <p>
                  但通过<strong className="text-black dark:text-white">严格的风险管理</strong>（设置止损、控制仓位、使用合理杠杆），风险是可控的。统计显示，90%的亏损交易者是因为缺乏风险管理，而非市场本身。
                </p>
              </div>
            </details>

            <details className="border-2 border-black dark:border-white p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-black dark:text-white list-none flex items-center justify-between">
                <span>Q3: 新手多久能实现盈利？</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="mb-3">
                  这取决于学习投入和交易纪律：
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong className="text-black dark:text-white">快速学习者（20%）：</strong>6-12个月开始稳定盈利</li>
                  <li><strong className="text-black dark:text-white">普通学习者（30%）：</strong>1-2年实现盈亏平衡</li>
                  <li><strong className="text-black dark:text-white">慢速学习者（50%）：</strong>2年以上或放弃</li>
                </ul>
                <p>
                  FX Killer的30天系统化培训可以显著缩短学习曲线，我们的学员平均在3-6个月内通过考核并开始盈利。关键是：<strong className="text-black dark:text-white">正确的学习方法 + 持续练习 + 心理素质培养</strong>。
                </p>
              </div>
            </details>

            <details className="border-2 border-black dark:border-white p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-black dark:text-white list-none flex items-center justify-between">
                <span>Q4: 技术分析和基本面分析哪个更重要？</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="mb-3">
                  两者各有优势，适用场景不同：
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="border border-black dark:border-white p-4">
                    <p className="font-bold text-black dark:text-white mb-2">📊 技术分析</p>
                    <ul className="text-sm space-y-1">
                      <li>• 适合短线/日内交易</li>
                      <li>• 精准的入场和出场点位</li>
                      <li>• 新手更易上手</li>
                    </ul>
                  </div>
                  <div className="border border-black dark:border-white p-4">
                    <p className="font-bold text-black dark:text-white mb-2">📰 基本面分析</p>
                    <ul className="text-sm space-y-1">
                      <li>• 适合中长线交易</li>
                      <li>• 把握大趋势方向</li>
                      <li>• 需要更多经济学知识</li>
                    </ul>
                  </div>
                </div>
                <p>
                  <strong className="text-black dark:text-white">最佳实践：</strong>用基本面分析确定交易方向（做多/做空），用技术分析寻找具体入场时机。这种结合能显著提高胜率。
                </p>
              </div>
            </details>

            <details className="border-2 border-black dark:border-white p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-black dark:text-white list-none flex items-center justify-between">
                <span>Q5: 如何选择外汇经纪商？</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="mb-3">
                  选择经纪商时，重点关注以下因素：
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                  <li><strong className="text-black dark:text-white">监管牌照：</strong>优先选择受FCA（英国）、ASIC（澳大利亚）、NFA（美国）监管的经纪商</li>
                  <li><strong className="text-black dark:text-white">点差和佣金：</strong>主要货币对点差应≤2点</li>
                  <li><strong className="text-black dark:text-white">出入金速度：</strong>提款应在24-48小时内到账</li>
                  <li><strong className="text-black dark:text-white">交易平台：</strong>MT4/MT5是行业标准</li>
                  <li><strong className="text-black dark:text-white">客户服务：</strong>提供中文支持</li>
                </ol>
                <p className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-600 p-4">
                  <strong className="text-black dark:text-white">⚠️ 警告：</strong>远离无监管或离岸监管的经纪商，避免"黑平台"导致资金损失。
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* Related Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
            相关学习资源
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/education#technical" className="border-2 border-black dark:border-white p-6 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">技术分析课程</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600">
                学习K线图、技术指标和图表形态分析方法
              </p>
            </Link>

            <Link href="/tools/position-calculator" className="border-2 border-black dark:border-white p-6 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group">
              <div className="text-3xl mb-4">🧮</div>
              <h3 className="text-xl font-bold mb-2">仓位计算器</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600">
                免费在线工具，计算最佳交易手数和风险
              </p>
            </Link>

            <Link href="/education#risk" className="border-2 border-black dark:border-white p-6 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">风险管理课程</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600">
                掌握止损、仓位控制和资金管理的核心技巧
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black dark:bg-white text-white dark:text-black p-12 border-2 border-black dark:border-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              准备开始你的外汇交易之旅？
            </h2>
            <p className="text-xl mb-8 text-gray-300 dark:text-gray-700">
              加入 FX Killer 30天系统化培训，从零基础到职业交易员
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
        </section>

      </article>

      {/* Footer Navigation */}
      <div className="bg-gray-50 dark:bg-gray-900 border-t-2 border-black dark:border-white py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">返回</p>
              <Link href="/education" className="text-lg font-bold text-black dark:text-white hover:underline">
                ← 教育中心首页
              </Link>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">更多课程</p>
              <Link href="/education" className="text-lg font-bold text-black dark:text-white hover:underline">
                浏览所有课程 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
