# 배포

## Pkg를 이용한 배포

### 사용할 라이브러리

- [Koa.js](https://koajs.com/)
- [Pkg](https://github.com/zeit/pkg)

### Koa 프로젝트 생성

빈 프로젝트 폴더 안에 `koa.js` 프로젝트를 생성한다.

```bash
cd my-website
yarn init # node 프로젝트 초기화
yarn add koa koa-static # koa 서버
yarn add open # 브라우저 자동 열기
```

`.gitignore` 파일을 작성한다: [Node.gitignore](Node.gitignore)

`index.js` 파일을 작성한다.

```javascript
const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')
const open = require('open')
const app = new Koa()

// React Client App
app.use(serve(path.join(__dirname, '/client/build')))

// Configuration
const args = {}
process.argv.slice(2, process.argv.length).forEach(option => {
    if (option.slice(0,2) === '--') {
        const arg = option.split('=');
        const flag = arg[0].slice(2, arg[0].length);
        const value = arg.length > 1 ? arg[1] : true;
        args[flag] = value;
    }
  })
const host = args.host || process.env.DOCUMENT_HOST || 'localhost' 
const port = args.port || process.env.DOCUMENT_PORT || 8081

// Run Server
app.listen(port, () => {
  console.log(`Server run on http://${host}:${port}`)
  console.log(`Launching the browser...`)
  open(`http://${host}:${port}`) // Open browser
})
```

### Docusaurus 프로젝트 생성

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

### 패키징 설정

Node.js 서버를 실행할 수 있는 바이너리로 컴파일 한다.

```bash
yarn add --dev pkg
```

최상위 디렉터리 `package.json`에 다음 설정을 추가한다.

```json
{
  "scripts": {
    "pkg": "cd client && yarn run build && cd .. && ./node_modules/.bin/pkg . --out-path pkg"
  },
  "bin": {
    "app": "index.js"
  },
  "pkg": {
    "assets": "client/build/**/*"
  }
}
```

### 패키징

프로젝트를 패키지로 묶는다.

```bash
yarn run pkg
yarn run pkg -t node12-macos-x64,node12-win-x64
```

결과:

```bash
my-website          # 최상위 디렉터리
└── pkg/            # 패키지 디렉터리
    ├── my-website-linux
    ├── my-website-macos
    └── my-website-win.exe
```

### 실행

실행가능한 파일을 실행하고 브라우저에서 확인한다.

기본 서버 URL: [http://localhost:8081](http://localhost:8081)

```bash
./pkg/my-website-macos
# Server run on http://localhost:8081
```

#### 실행 옵션 1

```bash
./pkg/my-website-macos --host=127.0.0.1
./pkg/my-website-macos --port=80
./pkg/my-website-macos --host=127.0.0.1 --port=80
```

#### 실행 옵션 2

```bash
export DOCUMENT_HOST=127.0.0.1
export DOCUMENT_PORT=80
./pkg/my-website-macos
```