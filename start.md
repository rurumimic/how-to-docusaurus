# Docusaurus 프로젝트 시작

[설치](https://v2.docusaurus.io/docs/installation)

## 목차

1. [Docusaurus 프로젝트 시작](#docusaurus-프로젝트-시작)
   1. [목차](#목차)
   1. [요구사항](#요구사항)
      1. [macOS](#macos)
      1. [Ubuntu](#ubuntu)
      1. [CentOS](#centos)
   1. [프로젝트 생성](#프로젝트-생성)
      1. [프로젝트 구조](#프로젝트-구조)
   1. [개발 서버 실행](#개발-서버-실행)

---

## 요구사항

- Node.js >= 8.10.0
- Yarn >= 1.5

### macOS

Install Node.js

```bash
brew install node@12
```

Install Yarn

```bash
brew install yarn
```

### Ubuntu

Install Node.js

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install Yarn

```bash
sudo npm install -g yarn
```

### CentOS

Install Node.js

```bash
curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
```

Install Yarn

```bash
sudo npm install -g yarn
```

## 프로젝트 생성

명령어: `npx @docusaurus/init@next init [웹사이트 이름] [템플릿 이름]`

예를 들어, 다음 명령어를 실행하면 현재 디렉터리 아래에 `my-documents` 프로젝트 디렉터리가 생성된다.

```bash
npx @docusaurus/init@next init my-documents classic
# Success! Created my-documents
```

### 프로젝트 구조

- `/blog/`: 블로그 마크다운 파일. 블로그가 필요 없다면 제거한다.
- `/docs/`: 도큐먼트 마크다운 파일.
- `/src/`: 페이지나 커스텀 React 컴포넌트.
  - `/src/pages`: 페이지 파일.
- `/static/`: 컨텐츠 파일. `build` 디렉터리로 복사된다.
- `/docusaurus.config.js`: 웹사이트 설정 파일.
- `/package.json`: Docusaurus는 React app이다.
- `/sidebar.js`: 도큐먼트 목록.

## 개발 서버 실행

```bash
cd my-website
yarn start
# or
yarn start --host 0.0.0.0 --port 8080
```

서버를 실행하고 [http://localhost:3000](http://localhost:3000)으로 접속한다.

