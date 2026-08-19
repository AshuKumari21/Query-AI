export const DATASETS = [
  {
    id: 'mba-leads',
    name: 'MBA Leads Dataset.csv',
    size: '1.4 MB',
    rowCount: 1950,
    columns: ['Lead_ID', 'Platform', 'Campaign', 'City', 'Conversion_Status', 'Spend_USD', 'Created_At'],
    kpis: {
      totalLeads: '1,950',
      platforms: 3,
      campaigns: 7,
      cities: 43,
      topPlatform: 'Instagram (43.6%)',
    },
    sampleRows: [
      { Lead_ID: 'LD-9021', Platform: 'Instagram', Campaign: 'Spring Growth', City: 'Austin', Status: 'Converted', Spend_USD: '$120' },
      { Lead_ID: 'LD-9022', Platform: 'Google Search', Campaign: 'Retargeting V2', City: 'Seattle', Status: 'Converted', Spend_USD: '$210' },
      { Lead_ID: 'LD-9023', Platform: 'Instagram', Campaign: 'Spring Growth', City: 'Austin', Status: 'Converted', Spend_USD: '$140' },
      { Lead_ID: 'LD-9024', Platform: 'Facebook Ads', Campaign: 'Founder Video', City: 'New York', Status: 'Pending', Spend_USD: '$95' },
      { Lead_ID: 'LD-9025', Platform: 'Google Search', Campaign: 'Retargeting V2', City: 'Chicago', Status: 'Converted', Spend_USD: '$180' }
    ]
  },
  {
    id: 'q1-sales',
    name: 'Q1 Sales & Revenue.csv',
    size: '3.2 MB',
    rowCount: 4820,
    columns: ['Txn_ID', 'Region', 'Product', 'ARR_USD', 'Discount_Pct', 'Customer_Segment'],
    kpis: {
      totalLeads: '$1.42M',
      platforms: 4,
      campaigns: 12,
      cities: 86,
      topPlatform: 'South Region ($420K)',
    },
    sampleRows: [
      { Txn_ID: 'TX-4011', Region: 'South', Product: 'Enterprise Pro', ARR_USD: '$45,000', Discount_Pct: '5%', Customer_Segment: 'Healthcare' },
      { Txn_ID: 'TX-4012', Region: 'East', Product: 'Growth Plan', ARR_USD: '$18,000', Discount_Pct: '0%', Customer_Segment: 'Fintech' },
      { Txn_ID: 'TX-4013', Region: 'West', Product: 'Enterprise Pro', ARR_USD: '$52,000', Discount_Pct: '10%', Customer_Segment: 'SaaS' },
      { Txn_ID: 'TX-4014', Region: 'North', Product: 'Starter', ARR_USD: '$6,500', Discount_Pct: '0%', Customer_Segment: 'Retail' }
    ]
  },
  {
    id: 'saas-churn',
    name: 'SaaS Churn & Retention.csv',
    size: '2.8 MB',
    rowCount: 12400,
    columns: ['User_ID', 'Plan_Tier', 'Monthly_Usage', 'Support_Tickets', 'Churned', 'NPS'],
    kpis: {
      totalLeads: '12,400',
      platforms: 3,
      campaigns: 5,
      cities: 120,
      topPlatform: 'Enterprise (98.2% Ret.)',
    },
    sampleRows: [
      { User_ID: 'USR-8810', Plan_Tier: 'Enterprise', Monthly_Usage: '840 hrs', Support_Tickets: '1', Churned: 'No', NPS: '9' },
      { User_ID: 'USR-8811', Plan_Tier: 'Pro', Monthly_Usage: '120 hrs', Support_Tickets: '4', Churned: 'Yes', NPS: '5' },
      { User_ID: 'USR-8812', Plan_Tier: 'Enterprise', Monthly_Usage: '910 hrs', Support_Tickets: '0', Churned: 'No', NPS: '10' }
    ]
  }
];

export const RAW_CSV_SAMPLE_STRINGS = {
  'MBA Leads Dataset.csv': `Lead_ID,Platform,Campaign,City,Status,Spend_USD
LD-9001,Instagram,Spring Growth Blitz,Austin,Converted,120
LD-9002,Google Search,Retargeting V2,Seattle,Converted,210
LD-9003,Instagram,Spring Growth Blitz,Austin,Converted,140
LD-9004,Facebook Ads,Founder Video,New York,Pending,95
LD-9005,Google Search,Retargeting V2,Chicago,Converted,180
LD-9006,Instagram,Spring Growth Blitz,Austin,Converted,110
LD-9007,Facebook Ads,Cold Outreach,San Francisco,Converted,160
LD-9008,Instagram,Spring Growth Blitz,Seattle,Converted,130`
};

export const MOCK_ANALYSES = {
  "Which platform generated the most leads?": {
    answer: "Instagram generated the highest number of leads.",
    metricLabel: "Top Performing Platform",
    metricValue: "Instagram (850 leads)",
    chartTitle: "Leads Breakdown by Platform",
    chartData: [
      { name: "Instagram", value: 850, percentage: "43.6%", color: "#10B981", isTop: true },
      { name: "Google", value: 620, percentage: "31.8%", color: "#14B8A6", isTop: false },
      { name: "Facebook", value: 480, percentage: "24.6%", color: "#06B6D4", isTop: false }
    ],
    keyInsight: "Instagram contributed the largest share of leads in the selected dataset (43.6% of total volume), outperforming Google Search by 37.1%.",
    sqlEquivalent: "SELECT platform, COUNT(*) as leads FROM dataset GROUP BY platform ORDER BY leads DESC LIMIT 1;",
    followUps: [
      "What is the conversion rate for Instagram leads specifically?",
      "How does ad spend compare between Instagram and Google?",
      "Show me the city breakdown for Instagram conversions."
    ]
  },
  "Why did sales drop in March?": {
    answer: "Sales decreased by 18.4% in March, primarily driven by a 31.2% decline in the North region.",
    metricLabel: "Regional Drop Impact",
    metricValue: "-$65,000 (North Region)",
    chartTitle: "March Revenue by Region ($)",
    chartData: [
      { name: "South", value: 340000, percentage: "37.4%", color: "#10B981", isTop: true },
      { name: "East", value: 290000, percentage: "31.8%", color: "#14B8A6", isTop: false },
      { name: "West", value: 280000, percentage: "30.8%", color: "#06B6D4", isTop: false },
      { name: "North", value: 190000, percentage: "20.8%", color: "#F43F5E", isTop: false }
    ],
    keyInsight: "North region enterprise renewal timelines slipped by two weeks, causing the short-term drop without permanent customer churn.",
    sqlEquivalent: "SELECT region, SUM(amount) FROM sales WHERE month = 'March' GROUP BY region ORDER BY amount DESC;",
    followUps: [
      "Did South region experience any revenue delay?",
      "Which customer segment had the lowest retention in March?"
    ]
  },
  "Which campaign generated the most leads?": {
    answer: "The 'Spring Growth Blitz' campaign produced the highest volume with 612 qualified leads.",
    metricLabel: "Top Campaign",
    metricValue: "Spring Growth Blitz (612 leads)",
    chartTitle: "Leads by Marketing Campaign",
    chartData: [
      { name: "Spring Growth", value: 612, percentage: "31.4%", color: "#10B981", isTop: true },
      { name: "Retargeting V2", value: 485, percentage: "24.9%", color: "#14B8A6", isTop: false },
      { name: "Founder Video", value: 390, percentage: "20.0%", color: "#06B6D4", isTop: false },
      { name: "Cold Outreach", value: 243, percentage: "12.5%", color: "#6366F1", isTop: false },
      { name: "Webinar Series", value: 220, percentage: "11.3%", color: "#8B5CF6", isTop: false }
    ],
    keyInsight: "Retargeting V2 had the highest conversion rate at 18.2%, despite lower overall impression reach than Spring Growth Blitz.",
    sqlEquivalent: "SELECT campaign_name, COUNT(lead_id) FROM campaigns GROUP BY campaign_name ORDER BY 2 DESC;",
    followUps: [
      "Compare CAC between Spring Growth Blitz and Retargeting V2",
      "Which campaign had the highest conversion rate?"
    ]
  },
  "Which city has the highest conversion rate?": {
    answer: "Austin had the highest conversion rate at 14.8%, followed by Seattle at 12.3%.",
    metricLabel: "Top City Conversion",
    metricValue: "Austin (14.8%)",
    chartTitle: "Conversion Rate by City (%)",
    chartData: [
      { name: "Austin", value: 14.8, percentage: "14.8%", color: "#10B981", isTop: true },
      { name: "Seattle", value: 12.3, percentage: "12.3%", color: "#14B8A6", isTop: false },
      { name: "New York", value: 10.1, percentage: "10.1%", color: "#06B6D4", isTop: false },
      { name: "San Francisco", value: 9.7, percentage: "9.7%", color: "#6366F1", isTop: false },
      { name: "Chicago", value: 8.4, percentage: "8.4%", color: "#8B5CF6", isTop: false }
    ],
    keyInsight: "Austin leads in conversion efficiency due to localized high-intent ad targeting, yielding 2.1x higher ROI than Chicago.",
    sqlEquivalent: "SELECT city, AVG(converted::int)*100 as conv_rate FROM leads GROUP BY city ORDER BY conv_rate DESC;",
    followUps: [
      "What is the average order value in Austin?",
      "Why is Chicago conversion lower than national average?"
    ]
  },
  "What changed this month?": {
    answer: "Organic search leads surged +42% while paid channel acquisition cost decreased by 14.5%.",
    metricLabel: "Organic Surge",
    metricValue: "+42% MoM",
    chartTitle: "Channel Performance Shift (MoM %)",
    chartData: [
      { name: "Organic Search", value: 42, percentage: "+42%", color: "#10B981", isTop: true },
      { name: "Direct Visits", value: 28, percentage: "+28%", color: "#14B8A6", isTop: false },
      { name: "Referrals", value: 19, percentage: "+19%", color: "#06B6D4", isTop: false },
      { name: "Paid Ads", value: -14.5, percentage: "-14.5%", color: "#F43F5E", isTop: false }
    ],
    keyInsight: "Content optimization initiatives unlocked high-volume organic search queries, reducing dependency on paid ad budgets.",
    sqlEquivalent: "SELECT channel, (curr_month - prev_month)/prev_month * 100 as growth FROM attribution GROUP BY channel;"
  },
  "Show me the biggest trend.": {
    answer: "Mobile traffic conversion grew 64% month-over-month, taking 58% of overall platform attribution.",
    metricLabel: "Primary Channel Share",
    metricValue: "Mobile (58% Attribution)",
    chartTitle: "Device Attribution Breakdown",
    chartData: [
      { name: "Mobile Web", value: 58, percentage: "58.0%", color: "#10B981", isTop: true },
      { name: "Desktop", value: 34, percentage: "34.0%", color: "#14B8A6", isTop: false },
      { name: "In-App", value: 8, percentage: "8.0%", color: "#06B6D4", isTop: false }
    ],
    keyInsight: "Users converting via mobile respond 2.4x faster to instant query prompts than desktop users.",
    sqlEquivalent: "SELECT device_type, COUNT(*)*100.0/SUM(COUNT(*)) OVER() FROM sessions GROUP BY device_type;"
  },
  "Where should I focus next?": {
    answer: "Scale Instagram budget by 25% and optimize low-converting Chicago campaign funnels.",
    metricLabel: "Recommended Allocation",
    metricValue: "+25% Instagram Ad Spend",
    chartTitle: "Projected ROI Impact by Initiative",
    chartData: [
      { name: "Scale Instagram", value: 38.5, percentage: "+38.5% ROI", color: "#10B981", isTop: true },
      { name: "Fix Chicago Funnel", value: 24.0, percentage: "+24.0% ROI", color: "#14B8A6", isTop: false },
      { name: "Expand Austin Ad", value: 19.2, percentage: "+19.2% ROI", color: "#06B6D4", isTop: false }
    ],
    keyInsight: "Reallocating 15% of low-performing Chicago budget to Instagram is projected to generate 280+ additional monthly leads.",
    sqlEquivalent: "SELECT recommendation, projected_impact FROM insights_engine ORDER BY projected_impact DESC;"
  }
};

export const SAMPLE_QUESTIONS = [
  "Which platform generated the most leads?",
  "Why did sales drop in March?",
  "Which campaign generated the most leads?",
  "Which city has the highest conversion rate?",
  "What changed this month?",
  "Show me the biggest trend.",
  "Where should I focus next?"
];

export const PERSONAS = [
  {
    id: 'analysts',
    title: 'Data Analysts',
    tagline: 'Spend less time writing repetitive SQL and formatting charts.',
    quote: '"I used to spend 4 hours every Monday pulling ad hoc numbers. Now I upload the CSV, type a question, and export clean charts in 30 seconds."',
    metric: '90% faster ad-hoc answers',
    sampleQuery: 'Calculate 30-day cohort retention by acquisition channel',
    features: ['Instant SQL & Natural Query translation', 'Export clean CSVs and visual charts', 'Deep filter drilldowns without re-querying']
  },
  {
    id: 'business',
    title: 'Business Teams',
    tagline: 'Get direct answers to business questions without waiting for manual reports.',
    quote: '"Our product managers and marketers get answers instantly during meetings without filing a BI ticket and waiting 3 days."',
    metric: 'Zero BI queue bottlenecks',
    sampleQuery: 'Which marketing campaign generated the highest revenue per user?',
    features: ['Plain-English answers anyone can read', 'Automated executive key insights', 'No SQL or dashboard experience needed']
  },
  {
    id: 'students',
    title: 'Students & Researchers',
    tagline: 'Explore datasets faster and understand complex patterns easily.',
    quote: '"Analyzing research datasets for my thesis used to mean fighting Excel formulas. QueryAI highlights anomalies automatically."',
    metric: 'Instant anomaly detection',
    sampleQuery: 'What are the statistical outliers in participant response times?',
    features: ['Dataset exploration in seconds', 'Anomaly and outlier detection', 'Clear explanations of what the data means']
  }
];

export const FEATURES = [
  {
    id: 'nl-analysis',
    title: 'Natural-Language Analysis',
    description: 'Ask questions without writing SQL formulas or building complex pivot tables manually.',
    badge: 'SQL-Free',
    uiPreviewType: 'query-box'
  },
  {
    id: 'instant-vis',
    title: 'Instant Visualizations',
    description: 'Turn raw query outputs automatically into elegant, readable charts tailored to your data.',
    badge: 'Auto Charts',
    uiPreviewType: 'chart-picker'
  },
  {
    id: 'data-insights',
    title: 'Data Insights',
    description: 'Surface hidden trends, statistical patterns, and region-level anomalies without manual digging.',
    badge: 'Smart Trends',
    uiPreviewType: 'insight-card'
  },
  {
    id: 'follow-up',
    title: 'Follow-up Exploration',
    description: 'Ask multi-turn follow-up questions to dig deeper without losing context or rebuilding dashboards.',
    badge: 'Conversational',
    uiPreviewType: 'thread'
  },
  {
    id: 'multi-dataset',
    title: 'Multiple Datasets',
    description: 'Seamlessly switch between CSV files, sales reports, and customer acquisition logs in one click.',
    badge: 'Multi-File',
    uiPreviewType: 'file-list'
  },
  {
    id: 'clear-explanations',
    title: 'Clear Explanations',
    description: 'Understand not only WHAT the numbers show, but WHY it matters to your business goals.',
    badge: 'Actionable',
    uiPreviewType: 'explanation'
  }
];
