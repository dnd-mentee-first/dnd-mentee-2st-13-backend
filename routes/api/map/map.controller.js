const MtsPlaceReply = require('../../../models').mts_place_reply;
const MtsUser = require('../../../models').mts_user;

//place의 댓글들 보기
exports.placeReplyList = (req, res) => {
    MtsPlaceReply.findAll({
        where: {content_id: req.params.id}
    }).then(result => {
        res.json(result)
    })
};

// place에 새 댓글 달기
exports.placeNewReply = (req, res) => {
    if (req.body.user_id != null) {
        MtsPlaceReply.create({
            content_id: req.body.content_id,
            reply_content: req.body.reply_content,
            write_id: req.body.user_id
        }).then(result => {
            res.json({
                success: true,
                result
            });
        }).catch(err => {
            res.json({
                success: false,
                err
            });
        })
    }
};

// place 댓글 수정하기
exports.placeEditReply = (req, res) => {
    if (req.body.user_id != null) {
        MtsUser.findOne({where: {user_id: req.body.user_id}}).then(result => {
            MtsPlaceReply.update(
                {
                    reply_content: req.body.reply_content,
                    update_date: Date.now()
                },
                {
                    where: {
                        id: req.body.id, //댓글의 Pk가 수정이 요청된 댓글의 id와 같은지
                        write_id: result.id, //댓글 작성자가 수정을 요청하는 사용자와 같은지
                        content_id: req.params.id //장소id와 url의 id가 같은지
                    }
                },
                {
                    multi: true
                }
            ).then(result=>{
                res.json(result)
            })
        }).catch(err => {
            res.json({success : false,msg:'작성자가 아닙니다.'})
        })
    } else
        res.json({
            success: false,
            msg: '로그인 후 이용가능'
        })
};

// place에 달았던 댓글 삭제하기
exports.placeDeleteReply = (req, res) => {
    if (req.body.user_id != null) {
        MtsUser.findOne({where: {user_id: req.body.user_id}}).then(result => {
            MtsPlaceReply.destroy(
                {
                    where: {
                        id: req.body.id, //댓글의 Pk가 수정이 요청된 댓글의 id와 같은지
                        write_id: result.id, //댓글 작성자가 수정을 요청하는 사용자와 같은지
                        content_id: req.params.id //장소id와 url의 id가 같은지
                    }
                }
            ).then(result=>{
                res.json(result)
            })
        }).catch(err => {
            res.json({success : false,msg:'작성자가 아닙니다.'})
        })
    } else
        res.json({
            success: false,
            msg: '로그인 후 이용가능'
        })
};