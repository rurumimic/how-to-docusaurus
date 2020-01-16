
# 배포

## Pkg를 이용한 배포

### 사용할 라이브러리

- [Koa.js](https://koajs.com/)
- [Pkg](https://github.com/zeit/pkg)

### Koa 프로젝트 생성

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
    "pkg": "cd client && yarn run build && cd .. && ./node_modules/.bin/pkg ."
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
# Server run on http://localhost:8081
```
