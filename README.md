# How to Docusaurus

- [Docusaurus V2](https://v2.docusaurus.io/)
- [Documentations](https://v2.docusaurus.io/docs/introduction)

## 목차

1. [Docusaurus 만들기](#docusaurus-만들기)
1. [배포](#배포)
   1. [pkg를 이용한 배포](#pkg를-이용한-배포)

---

## Docusaurus 만들기

[설치](https://v2.docusaurus.io/docs/installation)

### 요구사항

- Node.js >= 8.10.0
- Yarn >= 1.5

```bash
brew install node@12
brew install yarn
```

### 프로젝트 생성

명령어: `npx @docusaurus/init@next init [웹사이트 이름] [템플릿 이름]`

예를 들어, 다음 명령어를 실행하면 현재 디렉터리 아래에 `my-documents` 프로젝트 디렉터리가 생성된다.

```bash
npx @docusaurus/init@next init my-documents classic
# Success! Created my-documents
```

#### 프로젝트 구조

- `/blog/`: 블로그 마크다운 파일. 블로그가 필요 없다면 제거한다.
- `/docs/`: 도큐먼트 마크다운 파일.
- `/src/`: 페이지나 커스텀 React 컴포넌트.
  - `/src/pages`: 페이지 파일.
- `/static/`: 컨텐츠 파일. `build` 디렉터리로 복사된다.
- `/docusaurus.config.js`: 웹사이트 설정 파일.
- `/package.json`: Docusaurus는 React app이다.
- `/sidebar.js`: 도큐먼트 목록.

### 개발 서버 실행

```bash
cd my-website
yarn start
```

서버를 실행하고 [http://localhost:3000](http://localhost:3000)으로 접속한다.

---

## 배포

### Pkg 이용한 배포

#### 사용할 라이브러리

- Koa.js
- Pkg

#### Koa 프로젝트 생성

빈 프로젝트 폴더 안에 `koa.js` 프로젝트를 생성한다.

```bash
cd my-website
yarn init
yarn add koa koa-static
```

`index.js` 파일을 작성한다.

```javascript
const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')
const app = new Koa()

app.use(serve(path.join(__dirname, '/client/build')))

// Run server
const port = process.env.PORT || 8081
app.listen(port, () => {
  console.log(`Server run on http://localhost:${port}`)
})
```

#### Docusaurus 프로젝트 생성

1. Docusaurus 프로젝트를 새로 생성한다.  
1. Docusaurus 프로젝트 디렉터리 이름은 `client`로 변경한다.  
1. `yarn run build` 명령어를 사용해서 Docusaurus 프로젝트를 빌드한다.

디렉터리 구조는 다음과 같다: 

```bash
my-website          # 최상위 디렉터리
├── client/         # Docusaurus 프로젝트
│   ├── README.md
│   ├── build/
│   # ... 생략
│
├── index.js
├── node_modules/
├── package.json
└── yarn.lock
```

#### 패키징 설정

Node.js 서버를 실행할 수 있는 바이너리로 컴파일 한다.

```bash
yarn add --dev pkg
```

최상위 디렉터리 `package.json`에 다음 설정을 추가한다.

```json
{
  "scripts": {
    "pkg": "./node_modules/.bin/pkg ."
  },
  "bin": {
    "app": "index.js"
  },
  "pkg": {
    "assets": "client/build/**/*"
  }
}
```

#### 패키징

프로젝트를 패키지로 묶는다.

```bash
yarn run pkg
yarn run pkg -t node12-macos-x64,node12-win-x64
```

결과:

```bash
my-website          # 최상위 디렉터리
│   # ... 생략
├── my-website-linux
├── my-website-macos
├── my-website-win.exe
└── yarn.lock
```

실행가능한 파일을 실행하고 브라우저에서 확인한다.

[http://localhost:8081](http://localhost:8081)

```bash
./my-website-macos
# Server run on localhost:8081
```
