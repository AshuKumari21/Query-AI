/**
 * Export utilities for downloading CSV results and report files.
 */

export function exportToCSV(filename = 'query_results.csv', rows = []) {
  if (!rows || rows.length === 0) {
    alert("No dataset rows available to export.");
    return;
  }

  const headers = Object.keys(rows[0]);
  let csvContent = headers.join(',') + '\n';

  rows.forEach(row => {
    const line = headers.map(h => {
      const val = row[h] !== undefined && row[h] !== null ? String(row[h]) : '';
      return val.includes(',') ? `"${val}"` : val;
    }).join(',');
    csvContent += line + '\n';
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportReport(filename = 'Executive_Briefing.md', datasetInfo = {}, queryResult = {}) {
  const content = `# QueryAI Executive Data Briefing
Report Generated: ${new Date().toLocaleDateString()}

## Dataset Overview
- **Dataset Name**: ${datasetInfo.name || 'Dataset'}
- **Total Records**: ${datasetInfo.rowCount || 0}
- **Dataset Health Score**: ${datasetInfo.healthScore || 100}%

## Natural Language Analysis Result
- **Question**: "${queryResult.query || 'Dataset Query'}"
- **Answer**: "${queryResult.answer || 'Analysis complete'}"
- **Key Insight**: "${queryResult.keyInsight || 'Key metrics calculated cleanly'}"

## Generated SQL Query
\`\`\`sql
${queryResult.sqlEquivalent || 'SELECT * FROM dataset;'}
\`\`\`
`;

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
