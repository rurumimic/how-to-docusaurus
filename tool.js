/**
 * WARNING:
 * 이 파일은 프로젝트 루트 디렉터리에 위치해야 합니다.
 * path.join(__dirname)를 사용해 마크다운 문서를 찾기 때문입니다.
 * sidebar에서 짧은 코드를 작성하기 위해 global 객체를 사용합니다.
 */

const fs = require('fs');
const path = require('path');

global.category = (label, items) => ({ type: 'category', label: label, items: items }); // 카테고리 빌더
global.docs = (dirs, items) => {
    const extension = ['.md', '.mdx'];
    const prefix = path.join(...dirs);

    if (typeof items === 'undefined') { // (['폴더'], null): 지정 폴더 카테고리 자동화 -> docs(['폴더'], ['파일']) 반환
        return docs([prefix], 
            fs.readdirSync(path.join(__dirname, 'docs', prefix), { withFileTypes: true })
            .filter(dirent => extension.includes(path.extname(dirent.name)))
            .map(dirent => path.parse(dirent.name).name));
    } else { // (['폴더'], ['파일']): 경로 입력 간소화
        return items.map(item => path.join(prefix, item).replace(/\\/g, '/'));
    }
};