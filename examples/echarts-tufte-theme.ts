/**
 * Tufte theme for ECharts.
 *
 * Register once at app initialization, then use with:
 *   echarts.init(dom, 'tufte')
 */

import type { EChartsOption } from 'echarts';

export const tufteTheme = {
  color: ['#666666', '#4e79a7', '#db730d', '#e15759', '#539e73'],
  backgroundColor: '#fffff8',
  textStyle: {
    fontFamily:
      '"ET Book", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
    color: '#111',
  },
  title: {
    textStyle: {
      fontSize: 18,
      fontWeight: 'normal' as const,
      color: '#111',
    },
    subtextStyle: {
      fontSize: 13,
      color: '#666',
    },
  },
  line: {
    itemStyle: { borderWidth: 0 },
    lineStyle: { width: 1.5 },
    symbolSize: 0,
    symbol: 'circle',
    smooth: false,
  },
  bar: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  categoryAxis: {
    axisLine: { show: true, lineStyle: { color: '#ccc', width: 0.5 } },
    axisTick: { show: false },
    axisLabel: {
      color: '#767676',
      fontSize: 11,
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    splitLine: { show: false },
  },
  valueAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#767676',
      fontSize: 11,
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    splitLine: { show: false },
  },
  legend: { show: false },
  tooltip: {
    backgroundColor: 'rgba(255,255,248,0.95)',
    borderWidth: 0,
    textStyle: {
      fontSize: 12,
      color: '#333',
      fontFamily: 'system-ui, sans-serif',
    },
    extraCssText: 'box-shadow: none;',
  },
  grid: {
    show: false,
    left: 60,
    right: 80,
    top: 60,
    bottom: 40,
    containLabel: false,
  },
};

/**
 * Example: line chart option using the Tufte theme.
 */
export const exampleLineOption: EChartsOption = {
  animation: false, // no entrance animation (rule 18)
  aria: { enabled: true, label: { description: 'Revenue beat target every month, rising from 4,200 in January to 6,200 in June.' } },
  title: {
    text: 'Revenue Beat Target Every Month, Accelerating in Q2',
    subtext: 'Monthly revenue vs. target, Jan–Jun (USD)',
    left: 'left',
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
  yAxis: {
    type: 'value',
    min: 3800,
    max: 6500,
  },
  series: [
    {
      name: 'Target',
      type: 'line',
      data: [4000, 4200, 4400, 4600, 4800, 5000],
      lineStyle: { color: '#8c8c8c', width: 1, type: 'dashed' },
      itemStyle: { color: '#8c8c8c' },
      showSymbol: false,
      endLabel: {
        show: true,
        formatter: 'Target: {c}',
        color: '#767676',
        fontSize: 13,
        fontFamily:
          '"ET Book", "Palatino Linotype", Palatino, Georgia, serif',
      },
    },
    {
      name: 'Revenue',
      type: 'line',
      data: [4200, 4800, 5100, 4900, 5600, 6200],
      lineStyle: { color: '#e41a1c', width: 2 },
      itemStyle: { color: '#e41a1c' },
      showSymbol: false,
      endLabel: {
        show: true,
        formatter: 'Revenue: {c}',
        color: '#e41a1c',
        fontSize: 13,
        fontFamily:
          '"ET Book", "Palatino Linotype", Palatino, Georgia, serif',
      },
      markPoint: {
        data: [{ type: 'max', name: 'Peak' }],
        symbol: 'circle',
        symbolSize: 6,
        label: {
          show: true,
          position: 'top',
          formatter: 'Peak: {c}',
          fontSize: 12,
          fontStyle: 'italic',
          color: '#333',
        },
        itemStyle: { color: '#e41a1c' },
      },
    },
  ],
};

/**
 * Example: horizontal bar chart option.
 */
export const exampleBarOption: EChartsOption = {
  animation: false,
  aria: { enabled: true, label: { description: 'Product A leads revenue at 42,000, followed by B at 38,000, C at 27,000, D at 19,000 and E at 12,000.' } },
  title: {
    text: 'Products A and B Bring In 58% of Revenue',
    subtext: 'Revenue by product, USD',
    left: 'left',
  },
  grid: {
    show: false,
    left: 100,
    right: 80,
    top: 50,
    bottom: 20,
  },
  xAxis: { type: 'value', show: false },
  yAxis: {
    type: 'category',
    data: ['Product E', 'Product D', 'Product C', 'Product B', 'Product A'],
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#111',
      fontSize: 13,
      fontFamily:
        '"ET Book", "Palatino Linotype", Palatino, Georgia, serif',
    },
  },
  series: [
    {
      type: 'bar',
      data: [12000, 19000, 27000, 38000, 42000],
      itemStyle: { color: '#666' },
      barWidth: 20,
      label: {
        show: true,
        position: 'right',
        formatter: (params: any) => `$${(params.value / 1000).toFixed(0)}k`,
        fontSize: 13,
        color: '#666',
        fontFamily:
          '"ET Book", "Palatino Linotype", Palatino, Georgia, serif',
      },
    },
  ],
};
