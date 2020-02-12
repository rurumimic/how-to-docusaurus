# How to Docusaurus

GitHub Page of this repository: [rurumimic.github.io/how-to-docusaurus](https://rurumimic.github.io/how-to-docusaurus/)

## Links

- [Docusaurus V2](https://v2.docusaurus.io/)
- [Documentations](https://v2.docusaurus.io/docs/introduction)

## Contents

- [Docusaurus 프로젝트 시작](start.md)
  - 프로젝트 생성
    - 프로젝트 구조
  - 개발 서버 실행
- [Docusaurus 사용](usage.md)
- [배포](deployment.md)
  - Docker 배포
  - GitHub Pages 배포 1
  - GitHub Pages 배포 2
  - Pkg를 이용한 배포

## Easy Sidebar

[간편하게 사이드바를 작성](usage.md#사이드바)하기 위해 기능을 추가했습니다. 

> :warning: **[`sidebar.js`](sidebar.js)** 에서 짧은 코드를 작성하기 위해 **`global`** 객체를 사용합니다.  
> :warning: **[`tool.js`](tool.js)** 파일은 프로젝트 루트 디렉터리에 위치해야 합니다.  
> :warning: `path.join(__dirname)`를 사용해 마크다운 문서를 찾기 때문입니다.  