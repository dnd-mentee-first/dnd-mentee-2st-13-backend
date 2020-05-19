const MtsUser = require("../../../models").mts_user;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10); // 비밀번호 암호화를 위한 salt (2^n만큼 해싱진행)

// 랜덤값 생성 함수
function randomValueHex(len) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, len) // return required number of characters
}

// 유저 리스트 정보 GET
exports.getUsers = (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      MtsUser.findAll({
        // 해당 속성 값들만 리턴
        attributes: ['id', 'user_id', 'user_email', 'user_name', 'area_id', 'sigungu_id', 'admin_yn', 'create_date', 'update_date']
      })
        .then(users => {
          // authData : api 요청한 사용자id, token 생성시간, 만료시간
          res.json({ users, authData });
        });
    }
  });
};

// 유저 정보 GET
exports.getUser = (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      MtsUser.findAll({
        where: { id: req.params.id },
        attributes: ['id', 'user_id', 'user_email', 'user_name', 'area_id', 'sigungu_id', 'admin_yn', 'create_date', 'update_date']
      })
        .then(users => {
          // authData : api 요청한 사용자id, token 생성시간, 만료시간
          console.log(req.params.id)
          res.json({ users, authData });
        });
    }
  });
};

// 유저 비밀번호 찾기
exports.passwordMail = (req, res) => {
  // 발신자 정보
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',          // gmail 계정 아이디를 입력
      pass: ''                    // gmail 계정의 비밀번호를 입력
    }
  });

  // user_id, user_email 일치하는지 확인
  MtsUser.findOne({
    where: { user_id: req.body.user_id, user_email: req.body.user_email },
    attributes: ['user_id', 'user_email']
  })
    .then(mts_user => {
      // 정보 불일치
      if (!mts_user) { res.json({ msg: '가입된 정보와 일치하지 않습니다.' }) }
      // 정보 일치
      else {
        let mailOptions = {
          from: 'wnsdud3119@gmail.com',                // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
          to: req.body.user_email,                     // 수신 메일 주소
          subject: '맛탕 임시 비밀번호 발급',           // 제목
          text: '임시 비밀번호: ' + randomValueHex(10)  // 내용
        }
        //임시 비밀번호 암호화하여 유저 정보 업데이트
        bcrypt.hash(mailOptions.text.split(': ')[1], salt, function (err, hash) {
          MtsUser.update(
            { user_password: hash }, { where: { user_id: req.body.user_id } })
        })
        // 정보 일치 시 메일 전송
        transporter.sendMail(mailOptions, function (err, info) {

          if (err) {
            console.error('Send Mail error : ', err);
            // next(err);
          }
          else {
            console.log('Message sent : ', info);
            res.json(info);
          }
        })
      }
    })
}
