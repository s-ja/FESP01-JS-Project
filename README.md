# 멋쟁이 사자처럼 Front-End School Plus 1기: 미니 프로젝트(TODO App)
* GitHub URL: (https://github.com/uzoolove/FESP01-JS-Project)

## 템플릿 프로젝트 fork(팀장만)
* https://github.com/uzoolove/FESP01-JS-Project 이동 후 GitHub 메뉴의 Fork 선택해서 본인의 레퍼지토리로 프로젝트 복사
* 복사한 새로운 레퍼지토리 주소를 팀원들에게 공유

## Github 레퍼지토리 복사(모든 팀원)
* VSCode의 File > New Window > View > Source Control > Clone Repository 선택
* 팀장에게 공유받은 레퍼지토리 주소 입력
* 복사할 적당한 폴더 선택 후 Select as Repository Destination 선택
* Open 선택

## 서버 구동
* 프로젝트 루트에서 실행
<!-- * -s 옵션: 라우터를 추가할 경우 클라이언트가 요청한 모든 URL에 대해서 index.html을 응답하도록 설정 -->
```
cd 01.javascript/todoapp
npx serve .
```
<!-- * -s 옵션: 라우터를 추가할 경우 클라이언트가 요청한 모든 URL에 대해서 index.html을 응답하도록 설정
```
cd 01.javascript
npx serve -s .
``` -->
* http://localhost:3000 접속
  - 이미 3000 포트가 사용중일 경우 콘솔 안내 메세지에 따라서 접속
