/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

require('./tool'); // 사이드바 자동 제작 툴
const sidebar = module.exports = {}; // 사이드바 목록 초기화

let prefix = ''; // 폴더 경로

sidebar.someSidebar = {
  Docusaurus: ['doc1', 'doc2', 'doc3'],
  Features: ['mdx'],
  Category: [],
}

prefix = 'sub'
sidebar.someSidebar['Category'] = [
  category('하위 카테고리', docs([prefix])),
  category('하위 카테고리', docs([prefix, 'sub2'], ['egg'])),
]