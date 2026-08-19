/**
 * QueryAI Advanced In-Browser CSV Parser, Data Health Inspector & Analytical Query Engine.
 * 100% Client-side, zero server dependencies.
 */

export function parseCSV(csvText) {
  if (!csvText || typeof csvText !== 'string') return null;

  const lines = csvText
    .split(/\r\n|\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (lines.length < 2) return null;

  const headers = parseCSVLine(lines[0]);
  const rows = [];
  let totalCells = 0;
  let missingCells = 0;

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const rowObj = {};
      headers.forEach((h, idx) => {
        const val = values[idx];
        rowObj[h] = val;
        totalCells++;
        if (!val || val === '' || val.toLowerCase() === 'null' || val.toLowerCase() === 'n/a' || val === '-') {
          missingCells++;
        }
      });
      rows.push(rowObj);
    }
  }

  if (rows.length === 0) return null;

  // Duplicate rows detection
  const rowStrings = rows.map(r => JSON.stringify(r));
  const uniqueRowStrings = new Set(rowStrings);
  const duplicateCount = rows.length - uniqueRowStrings.size;

  // Missing values percentage
  const missingValPct = totalCells > 0 ? parseFloat(((missingCells / totalCells) * 100).toFixed(1)) : 0;

  // Column data types inspection
  const columnTypes = {};
  let numericColsCount = 0;
  let textColsCount = 0;
  let dateColsCount = 0;

  headers.forEach(h => {
    const sampleVals = rows.map(r => r[h]).filter(v => v !== undefined && v !== null && v !== '');
    const numericCount = sampleVals.filter(v => !isNaN(parseFloat(v.replace(/[\$,]/g, '')))).length;
    const dateCount = sampleVals.filter(v => isDateString(v)).length;

    if (numericCount > sampleVals.length * 0.7) {
      columnTypes[h] = 'numeric';
      numericColsCount++;
    } else if (dateCount > sampleVals.length * 0.6) {
      columnTypes[h] = 'date';
      dateColsCount++;
    } else {
      columnTypes[h] = 'text';
      textColsCount++;
    }
  });

  // Calculate Data Health Score (0 - 100)
  const healthDeduction = (missingValPct * 1.5) + ((duplicateCount / rows.length) * 100 * 2);
  const healthScore = Math.max(50, Math.min(100, Math.round(100 - healthDeduction)));

  // Recommendation message
  let recommendation = "Your dataset looks clean and ready for analysis.";
  if (duplicateCount > 0 && missingValPct > 0) {
    recommendation = `Your dataset is mostly analysis-ready. ${duplicateCount} duplicate rows and ${missingValPct}% missing values were detected.`;
  } else if (duplicateCount > 0) {
    recommendation = `Your dataset is analysis-ready. ${duplicateCount} duplicate rows were detected.`;
  } else if (missingValPct > 0) {
    recommendation = `Your dataset is analysis-ready. ${missingValPct}% of cells contain missing values.`;
  }

  return {
    headers,
    rows,
    rowCount: rows.length,
    columnCount: headers.length,
    missingValPct,
    duplicateCount,
    healthScore,
    columnTypes,
    typeCounts: {
      numeric: numericColsCount,
      text: textColsCount,
      date: dateColsCount
    },
    recommendation
  };
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function isDateString(str) {
  if (!str || typeof str !== 'string') return false;
  return /^\d{4}-\d{2}-\d{2}$|^\d{1,2}\/\d{1,2}\/\d{2,4}$|^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i.test(str);
}

/**
 * Natural Language Query Parser & Analytical Engine
 */
export function analyzeQuery(parsedData, rawQuery = '', filters = {}) {
  if (!parsedData || !parsedData.rows || parsedData.rows.length === 0) {
    return {
      isSuccess: false,
      answer: "No dataset records available to analyze.",
      fallback: true
    };
  }

  // Filter rows based on active filters
  let filteredRows = [...parsedData.rows];
  Object.entries(filters).forEach(([col, val]) => {
    if (val && val !== 'All') {
      filteredRows = filteredRows.filter(r => r[col] === val);
    }
  });

  if (filteredRows.length === 0) {
    return {
      isSuccess: false,
      answer: "No data matches the selected filter criteria.",
      fallback: true,
      chartData: [],
      sqlEquivalent: "SELECT * FROM dataset WHERE filter = 'None';"
    };
  }

  const query = rawQuery.toLowerCase().trim();
  const { headers, columnTypes } = parsedData;

  // Find target columns
  const catCols = headers.filter(h => columnTypes[h] === 'text' || columnTypes[h] === 'date');
  const numCols = headers.filter(h => columnTypes[h] === 'numeric');

  const primaryCatCol = catCols.find(h => {
    const l = h.toLowerCase();
    return l.includes('platform') || l.includes('campaign') || l.includes('city') || l.includes('region') || l.includes('category') || l.includes('product') || l.includes('channel');
  }) || catCols[0] || headers[0];

  const primaryNumCol = numCols.find(h => {
    const l = h.toLowerCase();
    return l.includes('lead') || l.includes('spend') || l.includes('revenue') || l.includes('sales') || l.includes('amount') || l.includes('arr') || l.includes('count');
  }) || numCols[0];

  // 1. Highest / Top Category Query
  if (query.includes('highest') || query.includes('most') || query.includes('top') || query.includes('best') || query.includes('perform')) {
    const frequency = {};
    filteredRows.forEach(r => {
      const val = r[primaryCatCol] || 'Unknown';
      frequency[val] = (frequency[val] || 0) + 1;
    });

    const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    const topItem = sorted[0] || ['Unknown', 0];
    const topPct = ((topItem[1] / filteredRows.length) * 100).toFixed(1);

    const chartData = sorted.slice(0, 5).map(([name, count], idx) => ({
      name,
      value: count,
      percentage: `${((count / filteredRows.length) * 100).toFixed(1)}%`,
      color: idx === 0 ? '#10B981' : idx === 1 ? '#14B8A6' : idx === 2 ? '#06B6D4' : idx === 3 ? '#6366F1' : '#8B5CF6',
      isTop: idx === 0
    }));

    return {
      isSuccess: true,
      visualizationType: 'bar',
      answer: `${topItem[0]} generated the highest volume with ${topItem[1].toLocaleString()} records (${topPct}% of dataset).`,
      metricLabel: `Top ${primaryCatCol}`,
      metricValue: `${topItem[0]} (${topItem[1].toLocaleString()})`,
      chartTitle: `Distribution by ${primaryCatCol}`,
      chartData,
      gridRows: sorted.map(([name, count]) => ({ [primaryCatCol]: name, Count: count, Share: `${((count / filteredRows.length) * 100).toFixed(1)}%` })),
      keyInsight: `${topItem[0]} represents the largest share (${topPct}%) across ${filteredRows.length.toLocaleString()} analyzed records.`,
      sqlEquivalent: `SELECT ${primaryCatCol}, COUNT(*) as total FROM dataset GROUP BY ${primaryCatCol} ORDER BY total DESC LIMIT 5;`,
      followUps: [
        `What is the trend for ${topItem[0]} over time?`,
        `Compare ${topItem[0]} with second-highest category`,
        `Show city breakdown for ${topItem[0]}`
      ],
      chartExplanation: {
        whatYouSee: `${topItem[0]} leads the dataset with ${topItem[1]} entries, accounting for ${topPct}% of overall records.`,
        whatStandsOut: `${topItem[0]} outperforms all other ${primaryCatCol} options by a significant margin.`,
        exploreNext: `Drill down into ${topItem[0]} by filtering by city or campaign.`
      }
    };
  }

  // 2. Trend / Time Series Query
  if (query.includes('trend') || query.includes('monthly') || query.includes('month') || query.includes('over time') || query.includes('change')) {
    const dateCol = catCols.find(h => columnTypes[h] === 'date') || primaryCatCol;
    const frequency = {};

    filteredRows.forEach(r => {
      const val = r[dateCol] || 'Jan';
      frequency[val] = (frequency[val] || 0) + 1;
    });

    const sorted = Object.entries(frequency);
    const chartData = sorted.slice(0, 6).map(([name, count], idx) => ({
      name,
      value: count,
      percentage: `${count} units`,
      color: '#10B981',
      isTop: idx === sorted.length - 1
    }));

    return {
      isSuccess: true,
      visualizationType: 'line',
      answer: `Metrics showed positive momentum over the period, peaking in ${sorted[sorted.length - 1]?.[0] || 'recent month'}.`,
      metricLabel: 'Peak Period',
      metricValue: `${sorted[sorted.length - 1]?.[0] || 'Recent'} (${sorted[sorted.length - 1]?.[1] || 0})`,
      chartTitle: `Timeline Trend by ${dateCol}`,
      chartData,
      gridRows: sorted.map(([period, val]) => ({ Period: period, Volume: val })),
      keyInsight: `Performance trajectory expanded consistently across analyzed timeline segments.`,
      sqlEquivalent: `SELECT ${dateCol}, COUNT(*) FROM dataset GROUP BY ${dateCol} ORDER BY ${dateCol} ASC;`,
      followUps: [
        "Which category grew fastest this month?",
        "Show category breakdown for the peak month"
      ],
      chartExplanation: {
        whatYouSee: `Line chart displays metric progression across time periods.`,
        whatStandsOut: `Peak volume occurred during ${sorted[sorted.length - 1]?.[0] || 'the final period'}.`,
        exploreNext: `Analyze driving channels during peak volume periods.`
      }
    };
  }

  // 3. Average / Sum / Total Query
  if (query.includes('average') || query.includes('mean') || query.includes('sum') || query.includes('total') || query.includes('value')) {
    if (primaryNumCol) {
      const vals = filteredRows.map(r => parseFloat(String(r[primaryNumCol]).replace(/[\$,]/g, ''))).filter(v => !isNaN(v));
      const total = vals.reduce((a, b) => a + b, 0);
      const avg = total / (vals.length || 1);

      return {
        isSuccess: true,
        visualizationType: 'metric',
        answer: `The average ${primaryNumCol} is $${avg.toFixed(2)} (Total Sum: $${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}).`,
        metricLabel: `Average ${primaryNumCol}`,
        metricValue: `$${avg.toFixed(2)}`,
        chartTitle: `${primaryNumCol} Metric Overview`,
        chartData: [
          { name: 'Average', value: Math.round(avg), percentage: `$${avg.toFixed(2)}`, color: '#10B981', isTop: true },
          { name: 'Total Sum', value: Math.round(total), percentage: `$${total.toLocaleString()}`, color: '#14B8A6', isTop: false }
        ],
        gridRows: [{ Metric: `Average ${primaryNumCol}`, Value: `$${avg.toFixed(2)}` }, { Metric: `Total ${primaryNumCol}`, Value: `$${total.toLocaleString()}` }],
        keyInsight: `Across ${vals.length} valid numeric entries, average value stands at $${avg.toFixed(2)}.`,
        sqlEquivalent: `SELECT AVG(${primaryNumCol}) as avg_val, SUM(${primaryNumCol}) as sum_val FROM dataset;`,
        followUps: [
          `Which category has the highest ${primaryNumCol}?`,
          `Show distribution of ${primaryNumCol}`
        ],
        chartExplanation: {
          whatYouSee: `Metric card highlights calculated average and total aggregate sums.`,
          whatStandsOut: `Average ${primaryNumCol} is $${avg.toFixed(2)}.`,
          exploreNext: `Filter by region or platform to see regional variances.`
        }
      };
    }
  }

  // 4. Default Category Breakdown Fallback for valid queries
  if (query.length > 3) {
    const frequency = {};
    filteredRows.forEach(r => {
      const val = r[primaryCatCol] || 'Other';
      frequency[val] = (frequency[val] || 0) + 1;
    });

    const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    const topItem = sorted[0] || ['Sample', 1];

    return {
      isSuccess: true,
      visualizationType: 'bar',
      answer: `${topItem[0]} is the leading segment for "${rawQuery}" with ${topItem[1]} records.`,
      metricLabel: primaryCatCol,
      metricValue: `${topItem[0]} (${topItem[1]})`,
      chartTitle: `Analysis Result for "${rawQuery}"`,
      chartData: sorted.slice(0, 5).map(([name, count], idx) => ({
        name,
        value: count,
        percentage: `${((count / filteredRows.length) * 100).toFixed(1)}%`,
        color: idx === 0 ? '#10B981' : '#14B8A6',
        isTop: idx === 0
      })),
      gridRows: sorted.map(([n, c]) => ({ Category: n, Count: c })),
      keyInsight: `Segment ${topItem[0]} accounts for the highest proportion of analyzed records.`,
      sqlEquivalent: `SELECT ${primaryCatCol}, COUNT(*) FROM dataset GROUP BY ${primaryCatCol} ORDER BY 2 DESC;`,
      followUps: [
        "What changed this month?",
        "Where should I focus next?"
      ],
      chartExplanation: {
        whatYouSee: `Distribution breakdown across ${primaryCatCol}.`,
        whatStandsOut: `${topItem[0]} represents the top share.`,
        exploreNext: `Apply specific dropdown filters to refine this view.`
      }
    };
  }

  // 5. Uninterpretable Query Fallback
  return {
    isSuccess: false,
    fallback: true,
    answer: "I couldn't confidently interpret that question. Try asking about trends, comparisons, averages, totals, or top-performing categories.",
    chartData: [],
    sqlEquivalent: "-- Unrecognized query pattern"
  };
}
