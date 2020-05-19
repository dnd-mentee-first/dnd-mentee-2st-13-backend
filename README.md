# 설치

1. express 설치
   npm init
   npm install express
   npm install

2. sequelize - mysql 설치
   npm i sequelize mysql2
   npm i -g sequelize-cli
   sequelize init

3. jsonwebtoken(jwt, bcrypt) 설치
   npm install jsonwebtoken
   npm install bcrypt-nodejs
   npm install bcrypt

## EXPRESS ORM 사용하기

<https://victorydntmd.tistory.com/26?category=677306> 참고

npm install sequelize mysql2 설치  
npm install -g sequelize-cli 설치  
npx sequelize init (디렉토리 생성)

### /config/config.json

config.json 파일에서 DB 커넥션 정보를 각 환경에 맞게 설정할 수 있습니다.

username: db 사용자명  
password: db 비밀번호  
database: RDB에서 사용할 db이름  
host: host주소  
dialect: 사용할 RDB이름  
operatorsAliases: 연산자에 대한 별칭을 사용할 것인지

Ex)

```javascript
{
  "development": {
    "username": "root",
    "password": "비밀번호를 입력해주세요.",
    "database": "clitest",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  ...
}
```

### models/index.js

models 폴더는 Model을 정의한 js 파일들을 모아놓은 폴더입니다.

models/index.js 파일은 다음을 과정을 수행합니다.

1. /config/config.json 파일의 설정 값을 읽어 sequelize를 생성
2. models 폴더 아래에 존재하는 js 파일을 모두 로딩
3. db 객체에 Model을 정의하여 반환

npm start => sequalize-cil 실행 ( id, createAt, updateAt 자동생성됨)  
sequelize migrate:create migrations 파일 생성  
sequelize db:migrate => migrations 파일 up에 작성된 코드 실행  
sequelize db:migrate:undo => migrations 파일 down에 작성된 코드 실행(Table삭제 및 비우기)

sequelize docs: <https://sequelize.org/v5/>


## api 경로 재설정/추가 설정
- 회원가입 POST:

    /api/user/createUser  ->  /api/auth/register

- 로그인 POST: 

    /api/auth/loginCheck  ->  /api/auth/login

- 유저리스트 GET:

    api/user/getUsers -> api/user/List

- 예정
유저 GET:

    api/user/:id

## Mail 전송
```shell
npm install nodemailer
```
**보안 수준이 낮은 앱 허용: 사용** 으로 변경
<https://support.google.com/accounts/answer/6010255?p=lsa_blocked&hl=ko&visit_id=637168981705464495-3021976578&rd=1#> 참고

user.controller.js 에서 발신자 정보 입력
```javascript
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '~~@gmail.com',          // gmail 계정 아이디를 입력
      pass: '~~'                    // gmail 계정의 비밀번호를 입력
    }
  });
  ```