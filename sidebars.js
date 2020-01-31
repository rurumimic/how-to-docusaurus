/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');
const sidebar = module.exports = {}; // 사이드바 모듈 생성
const category = (label, items) => ({ type: 'category', label: label, items: items }); // 카테고리 빌더
const docs = (dirs, items) => {
  const prefix = path.join(...dirs);
  if (typeof items !== 'undefined') return items.map(item => path.join(prefix, item)); // 경로 입력 간소화
  else return docs([prefix], fs.readdirSync(path.join(__dirname, 'docs', prefix)).map(file => path.parse(file).name)); // 지정 폴더 카테고리 자동화
}
let prefix = ''; // 폴더 경로

sidebar.someSidebar = {
  Docusaurus: ['doc1', 'doc2', 'doc3'],
  Features: ['mdx'],
  Category: [],
}

prefix = ''
sidebar.someSidebar['Category'] = [
  category('하위 카테고리', docs([prefix])),
]