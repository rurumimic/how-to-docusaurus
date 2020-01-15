# Docusaurus 사용하기

1. [Docusaurus 사용하기](#docusaurus-사용하기)
   1. [페이지 만들기](#페이지-만들기)
      1. [페이지 예제](#페이지-예제)
      1. [라우팅](#라우팅)
   1. [스타일과 레이아웃](#스타일과-레이아웃)
   1. [정적 파일](#정적-파일)
   1. [도큐멘트](#도큐멘트)
      1. [마크다운 기능](#마크다운-기능)
      1. [사이드바](#사이드바)
         1. [Document ID](#document-id)
      1. [버전 관리](#버전-관리)
   1. [블로그](#블로그)
   1. [검색](#검색)

---

## [페이지 만들기](https://v2.docusaurus.io/docs/creating-pages)

### 페이지 예제

- 페이지 디렉터리: `/src/pages`
- 파일 이름: `hello.js`
- URL: `/hello`

```js
import React from 'react';
import Layout from '@theme/Layout';
function Hello() {
  return (
    <Layout title="Hello">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <p>
          Edit <code>pages/hello.js</code> and save to reload.
        </p>
      </div>
    </Layout>
  );
}

export default Hello;
```

### 라우팅

- `/src/pages/index.js` → `<baseUrl>`
- `/src/pages/foo.js` → `<baseUrl>/foo`
- `/src/pages/foo/test.js` → `<baseUrl>/foo/test`
- `/src/pages/foo/index.js` → `<baseUrl>/foo/`

---

## [스타일과 레이아웃](https://v2.docusaurus.io/docs/styling-layout)

생략

---

## [정적 파일](https://v2.docusaurus.io/docs/static-assets)

정적 파일 위치는 `/static`에서 빌드 후 `/build`에 위치한다.

예를 들어, 이미지 `/static/img/star.svg`는 서버 접속 후 `/img/star.svg`로 접근할 수 있다.

마크다운에서는 다음처럼 사용한다.

```text
![Star](/img/star.svg)
```

---

## 도큐멘트

### 마크다운 기능

```text
---
id: greeting
title: Hello
---

# 제목

내용
```

- `id`: 기본값: `파일명`. 유일한 도큐먼트 아이디. 
- `title`: 기본값: `id`. 문서 제목. 
- `hide_title`: 기본값: `false`. 제목 가리기.
- `hide_table_of_contents`: 기본값: `false`. 목차 가리기.
- `sidebar_label`: 기본값: `title`
- `custom_edit_url`: 기본값: `editUrl`. 편집 URL.
- `keywords`: 검색 엔진을 위한 키워드 메타 태그.
- `description`: 기본값: 내용 중 첫 줄. `<meta>`의 `content` 값
- `image`: 커버/섬네일 이미지


```md
---
id: doc-markdown
title: Markdown Features
hide_title: false
hide_table_of_contents: false
sidebar_label: Markdown :)
custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: How do I find you when I cannot solve this problem
keywords:
  - docs
  - docusaurus
image: https://i.imgur.com/mErPwqL.png
---
```

### 사이드바

```js
module.exports = {
  firstSidebar: {
    'Category A': ['doc1'],
  },
  secondSidebar: {
    'Category A': ['doc2', 'doc4'],
    'Category B': ['doc3'],
  },
};
```

#### Document ID

```bash
website # root directory of your site
└── docs
   ├── greeting.md
   └── guide
      └── hello.md
```

### 버전 관리

생략

---

## 블로그

생략

---

## 검색

생략

---