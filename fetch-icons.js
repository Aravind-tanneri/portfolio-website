import fs from 'fs';
import https from 'https';

const fetchSvg = (url) => new Promise((resolve) => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve(data));
  });
});

async function run() {
  const lc = await fetchSvg('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/leetcode.svg');
  const cf = await fetchSvg('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/codeforces.svg');
  const cc = await fetchSvg('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/codechef.svg');
  
  const extractPath = (svg) => {
    const match = svg.match(/<path[^>]*d="([^"]+)"/);
    return match ? match[1] : '';
  };

  const file = `import React from 'react';

export const LeetCode = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="${extractPath(lc)}" />
  </svg>
);

export const Codeforces = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="${extractPath(cf)}" />
  </svg>
);

export const CodeChef = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="${extractPath(cc)}" />
  </svg>
);
`;
  fs.writeFileSync('src/components/icons.jsx', file);
  console.log('done');
}
run();
