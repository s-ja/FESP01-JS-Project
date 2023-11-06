# Typescript 미니 프로젝트(TODO App)

## 개발 환경 구축

### Vite

- Vite: Webpack, Rollup, Parcel 등의 도구처럼 자바스크립트 프로젝트 개발, 빌드, 배포에 사용하는 번들링 도구
- 프로젝트 종류에 따라서 기본 환경을 세팅해주는 보일러 플레이트 제공

### 번들링 도구가 필요한 이유

- 타입스크립트 프로젝트 배표시 필요한 작업을 자동화

#### 타입스크립트 프로젝트 배포시 필요한 작업

- 타입 체크 및 ts -> js로 변환하는 컴파일(TSC)
- 트랜스파일링: ES6+ 문법을 지원하지 않는 구 버전의 브라우저를 위해 ES5 수준의 코드로 변환 (TSC)
- 번들링: 여러 javascript 모듈을 하나 또는 몇개의 javascript 파일로 묶는 작업 (Vite, Rollup)
- 압축: 주석 제거, 변수명 축약, 화이트 스페이스 제거 (Vite, Rollup)
- css 파일도 번들링, 압축됨 (Vite, Rollup)

### 프로젝트 생성

- FESP01-JS-Project 루트에서 실행

```
mkdir 02.typescript
cd 02.typescript

npm create vite@latest
```

- 질문에 따라 TypeScript 프로젝트 생성

```
Need to install the following packages:
  create-vite@4.4.1
Ok to proceed? (y)
√ Project name: ... todoapp
√ Select a framework: » Vanilla
√ Select a variant: » TypeScript
```

- 다음과 같은 출력 결과를 참조해서 명령 실행

```
Done. Now run:

  cd 02.typescript
  npm install
  npm run dev
```

### 기본 패키지 설치

```
cd 02.typescript

npm install
```

## 자바스크립트 프로젝트 복사

### 자바스크립트 파일 복사

- 02.typescript/todoapp/src 폴더 하위의 샘플 파일 삭제
  - counter.js
  - main.ts
  - style.css
  - typescript.svg
- 01.javascript/todoapp/assets/js 하위의 모든 파일과 폴더를 02.typescript/todoapp/src 폴더로 복사

### 정적인 파일 복사 (html, css, 이미지)

- 01.javascript/todoapp/index.html 파일을 02.typescript/todoapp/index.html 삭제 후 복사
- 01.javascript/todoapp/assets/img 폴더를 02.typescript/todoapp/public 폴더로 복사
- 01.javascript/todoapp/assets/css 폴더의 css 파일을 각 페이지 모듈 폴더로 복사
  - index.css -> index.html과 같은 경로
  - todolist.css -> src/page/list/TodoList.js와 같은 경로

### index.html 수정

- <link> 태그에서 assets 경로 제거

```
<link rel="icon" href="/img/favicon.ico" />
```

- css 파일 링크 삭제

```
<link href="/css/index.css" rel="stylesheet">
<link href="/css/todolist.css" rel="stylesheet">
```

- <script> 태그의 js 경로 수정

```
<script type="module" src="/src/index.ts"></script>
```

### 테스트

#### 개발 서버 실행

```
npm run dev
```

- 출력된 접속 정보 확인해서 개발 서버 접속
  - 기본 포트는 5173으로 구동되고 해당 포트가 사용중일 경우 번호가 하나씩 증가
  - http://localhost:5173/
- HMR (Hot Module Replacement) 지원됨

#### 기능 테스트

- 모든 기능 테스트
- 개발자 도구의 network 탭에서 css 파일이나 이미지 파일에 404 에러가 발생하는 경우 경로 확인 후 수정

## 타입스크립트로 리팩토링 (공통 파일)

### tsconfig.json 파일 수정

- js 모듈 사용 가능하도록 추가

```
/* JavaScript Support */
"allowJs": true,  // js 모듈 사용 가능
```

### index.js 파일 수정

#### 파일 확장자 변경

- src/index.js -> src/index.ts로 수정

#### css 파일 import

```
import './index.css';
```

#### import 구문 수정

- 점진적으로 .js 파일을 .ts로 변경할 예정이므로 둘다 적용 가능하도록 import 구문에서 모듈의 확장자를 제거

```
import App from './App';
```

- 다른 js 파일에도 적용

#### 타입 관련 컴파일 에러 수정

```
root!.appendChild(await App());
```

#### await 에러 수정

- Top-level await 기능은 ECMAScript 2022 부터 지원되므로 하위 호환을 위해서 IIFE 패턴으로 수정

```
(async()=>{
  root!.appendChild(await App());
})();
```

### App.js 파일 수정

- App.js -> App.ts로 수정
- 컴파일 에러 수정

### Router.js 파일 수정

- Router.js -> Router.ts로 수정
- 컴파일 에러 수정

### 애플리케이션 배포

```
npm run build
```

### 배포된 애플리케이션 테스트

```
npm run preview
```

### 타입 추가

- src 폴더에 todoapp.d.ts 파일 생성

```
interface TodoItem {
  _id: number,
  title: string,
  content: string,
  done: true,
  createdAt: string,
  updatedAt: string
}

interface TodoListResponse {
  ok: number;
  items: TodoItem[],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}

interface TodoResponse {
  ok: number;
  item: TodoItem
}
```

## 타입스크립트로 리팩토링 (기능별 파일, 드라이버만 작업)

### Todolist.js 파일 수정

- pages/list/Todolist.js -> Todolist.ts로 수정

#### css 파일 import

```
import './todolist.css';
```

#### axios 모듈 설치

```
npm i axios
```

#### axios 모듈 추가

```
import axios from 'axios';
```

#### index.html에서 axios 제거

```
<script src="https://unpkg.com/axios@1.6.0/dist/axios.min.js"></script>
```

#### axios 요청에 타입 추가

```
response = await axios<TodoListResponse>('http://localhost:33088/api/todolist');
```

#### 컴파일 에러 수정

### 나머지 파일 수정
