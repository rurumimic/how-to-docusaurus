# 배포

- [Docker 배포](#docker-배포)
- [GitHub Pages 배포](#github-pages-배포)
- [Pkg를 이용한 배포](#pkg를-이용한-배포)

## Docker 배포

Dockerfile을 작성한다.

```Dockerfile
FROM nginx:alpine
COPY ./build /usr/share/nginx/html
```

도커 이미지를 빌드한다.

```bash
docker build -t my-website .
```

도커 이미지를 확인한다.

```bash
docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
my-website          latest              8e110898b42f        2 seconds ago       22.5MB
nginx               alpine              48c8a7c47625        4 days ago          21.8MB
```

도커를 실행한다.

```bash
docker run --rm -p 80:80 my-website
```

---

## GitHub Pages 빌드

```bash
yarn add --dev gh-pages
yarn build
./node_modules/.bin/gh-pages -d build
```

---

## GitHub Pages 배포

[Deploying to GitHub Pages](https://v2.docusaurus.io/docs/deployment#deploying-to-github-pages)

Docusaurus를 쉽게 GitHub Pages로 배포할 수 있다.

### `docusaurus.config.js` 설정

먼저 `docusaurus.config.js`를 수정하고 파라미터를 추가한다.

- `organizationName`: GitHub 사용자나 조직. 예를 들어, 레포지터리 관리자는 GitHub username을 입력한다.
- `projectName`: GitHub 레포지터리 이름.
- `url`: GitHub Page 주소. 보통 `https://_username_.githube.io`
- `baseUrl`: 프로젝트의 기본 URL. `/projectName/`.

사용자 지정 도메인을 GitHub Pages에 지정한다면, `CNAME` 파일을 `static` 디렉터리에 생성한다. 이 파일은 `build` 디렉터리에 복사된다.

```js
module.exports = {
  ...
  url: 'https://endiliey.github.io', // Your website URL
  baseUrl: '/',
  projectName: 'endiliey.github.io',
  organizationName: 'endiliey'
  ...
}
```

### 환경 설정

- `GIT_USER`: 커밋 권한이 있는 GitHub 계정의 username.
- (옵션) `USE_SSH`: `true`로 설정하면 SSH로 GitHub 레포지터리에 접근한다.
- (옵션) `CURRENT_BRANCH`: 보통 `master` 브랜치가 배포된다. 아무것도 넣지 않을 경우 현재 브런치가 배포된다.

### 배포

```bash
GIT_USER=<GITHUB_USERNAME> yarn deploy
```

`master` 브랜치를 기준으로 `gh-pages` 브랜치가 생성되며 GitHub Page가 배포된다.

```bash
To https://github.com/<USERNAME>/<REPOSITORY>.git
 * [new branch]      gh-pages -> gh-pages
Website is live at: https://<USERNAME>.github.io/<REPOSITORY>
```

### 접속

`https://<USERNAME>.github.io/<REPOSITORY>`

---

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