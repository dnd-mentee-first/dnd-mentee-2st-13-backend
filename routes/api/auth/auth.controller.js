const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const MtsUser = require('../../../models').mts_user;
const salt = bcrypt.genSaltSync(10); // 비밀번호 암호화를 위한 salt (2^n만큼 해싱진행)

exports.loginCheck = (req, res) => {
  // SELECT * FROM user WHERE 'user_email='입력받은 id'
  MtsUser.findOne({ where: { user_id: req.body.user_id} })
    .then(mts_user => {
      if (!mts_user) { res.json({msg: 'Not found id'}) }
      // 암호화되어 DB에 저장된 pw와 입력된 pw 비교
      bcrypt.compare(req.body.user_password, mts_user.user_password, function (err, result) {
        if (err) {
          console.log('err: '+ err)
        }
        // pw 일치 시 user정보 및 token 리턴
        if (result) {
          // 토큰 안에 담기는 정보: 유저id, 토큰 만료시간
          jwt.sign({ id: mts_user.id }, 'secretkey', { expiresIn: '12h'}, (err, token) => {
            res.json({
              token: token,
              mts_user: {
                id: mts_user.id,
                user_id: mts_user.user_id,
                user_email: mts_user.user_email,
                user_name: mts_user.user_name,
                admin_yn: mts_user.admin_yn,
                area_id: mts_user.area_id,
                sigungu_id: mts_user.sigungu_id,
                create_date: mts_user.create_date,
                update_date: mts_user.update_date
              }
            });
          })
        }
        // pw 불일치 시
        else {
          res.json({msg: 'passwords do not match'});
        }
      })
    })
};

exports.createUser = (req, res) => {
  // user_id, user_password, user_email, area_id, sigungu_id를 입력하지 않았을 때
  if(req.body.user_id === undefined || req.body.user_password === undefined || req.body.user_email === undefined || req.body.area_id === undefined || req.body.sigungu_id === undefined){
    res.json({
      success: false,
      msg: 'user_id, user_password, user_email, area_id, sigungu_id cannot empty.'
    })
  }
  // 입력받은 pw 암호화 하여 DB 저장
  else{
    bcrypt.hash(req.body.user_password, salt, function(err, hash) {
      MtsUser.create({
        user_id: req.body.user_id,
        user_email: req.body.user_email,
        user_password: hash,
        user_name: req.body.user_name,
        area_id: req.body.area_id,
        sigungu_id: req.body.sigungu_id,
        admin_yn: req.body.admin_yn
      })
        .then(result => {
          res.json({
            success: true,
          });
          console.log("회원가입 완료");
        })
        // 회원가입 양식이 잘못되었거나 이미 존재하는 user_id, email일 경우
        .catch(err => {
          res.json({
            success: false,
            msg: 'Register form is invalid, Or (email, user_id) already exists'
          });
          console.log("회원가입 실패");
        });
    });
  }
};

exports.check = async ctx => {
  const {user} = ctx.state;
  if(!user){
    // 로그인 중 아님
    ctx.status = 401; //Unauthorized
    return;
  }
  ctx.body = user;
};
