const MtsBoard = require("../../../models").mts_community_board;
const MtsReply = require("../../../models").mts_community_board_reply;
const MtsRecommend = require("../../../models").mts_community_board_recommond;
const jwt = require("jsonwebtoken");


//게시판 리스트
//GET :  http://localhost:8000/api/board/list
exports.list = (req, res) => {
    if (req.body.type_id == null) {
        MtsBoard.findAll()
            .then(boards => {
                res.json({boards})
            })
    } else {
        MtsBoard.findAll({
            where: {
                type_id: req.body.type_id
            }
        }).then(boards => {
            res.json({boards})
        })
    }
};

//게시판 글 보기
//Postman : Get  http://localhost:8000/api/board/read/:id
exports.read = (req, res) => {
    MtsBoard.findOne({
        where: {
            id: req.params.id
        }
    }).then(board_id => {
        if (!board_id)
            res.json({boardId: board_id, msg: 'Not found Board'});
    })
};

//게시판 글 작성
//Postman : Post  http://localhost:8000/api/board/write
//Authorization -> Bearer Token -> 로그인으로 발급 받은 토큰 붙여넣기
//Body -> x-www-form-urlencoded->key : board_title  value: 아무거나 작성 후 실행
exports.write = (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        const userPk = jwt.verify(req.token, "secretkey").id;
        if (err) {
            res.sendStatus(403);
        } else {
            MtsBoard.create({
                board_title: req.body.board_title,
                board_content: req.body.board_content,
                area_id: req.body.area_id,
                sigungu_id: req.body.sigungu_id,
                type_id: req.body.type_id,
                write_id: userPk
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
    })
};


//글 수정
//Postman : Post  http://localhost:8000/api/board/edit/1
//Authorization -> Bearer Token -> 로그인으로 발급 받은 토큰 붙여넣기
//Body -> x-www-form-urlencoded->key : board_title  value: 아무거나 작성 후 실행
exports.edit = (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        const userPk = jwt.verify(req.token, "secretkey").id;
        if (err) {
            res.sendStatus(403);
        } else {
            MtsBoard.update(
                {
                    board_title: req.body.board_title,
                    board_content: req.body.board_content,
                    area_id: req.body.area_id,
                    sigungu_id: req.body.sigungu_id,
                    type_id: req.body.type_id,
                    update_date: Date.now()
                },
                {
                    //Board의 작성자와 사용자의 Pk가 같고 Board의 Pk와 /:id 가 같은거
                    where: {write_id: userPk, id: req.params.id}
                },
                {   //여러개를 업데이트 하는 경우 옵션 설정을 true로 해줌
                    multi: true
                }
            ).then(result => {
                if (result == 1)
                    res.json({
                        success: true,
                        result
                    })
                else
                    res.json({
                        success: false,
                        result
                    })
            }).catch(err => {
                res.json({
                    success: false,
                    err
                })
            })
        }
    })
};

//글 삭제
exports.delete = (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        const userPk = jwt.verify(req.token, "secretkey").id;
        if (err) {
            res.sendStatus(403);
        } else {
            MtsBoard.destroy(
                {
                    //Board의 작성자와 사용자의 Pk가 같고 Board의 Pk와 /:id 가 같은거
                    where: {write_id: userPk, id: req.params.id}
                }
            ).then(result => {
                if (result == 1)
                    res.json({
                        success: true,
                        result
                    })
                else
                    res.json({
                        success: false,
                        result
                    })
            }).catch(err => {
                res.json({
                    success: false,
                    err
                })
            })
        }
    })
};


//댓글 쓰기
exports.newReply = (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        const userPk = jwt.verify(req.token, "secretkey").id;
        if (err) {
            res.sendStatus(403);
        } else {
            MtsReply.create({
                reply_content: req.body.reply_content,
                board_id: req.params.id,
                write_id: userPk
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
    })
};

//댓글 수정
exports.editReply = (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        const userPk = jwt.verify(req.token, "secretkey").id;
        if (err) {
            res.sendStatus(403);
        } else {
            MtsReply.update(
                {
                    reply_content: req.body.reply_content,
                    update_date: Date.now()
                },
                {
                    //댓글 작성자와 사용자의 Pk가 같고 Board의 Pk와 /:id 가 같은거
                    where: {write_id: userPk, board_id: req.params.id}
                },
                {   //여러개를 업데이트 하는 경우 옵션 설정을 true로 해줌
                    multi: true
                }
            ).then(result => {
                if (result == 1)
                    res.json({
                        success: true,
                        result
                    })
                else
                    res.json({
                        success: false,
                        result
                    })
            }).catch(err => {
                res.json({
                    success: false,
                    err
                })
            })
        }
    })
};

//댓글 삭제
exports.deleteReply = (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        const userPk = jwt.verify(req.token, "secretkey").id;
        if (err) {
            res.sendStatus(403);
        } else {
            MtsReply.destroy(
                {
                    //댓글의 pk와 삭제 요청하는 id가 같고 댓글의 작성자와 사용자의 Pk가 같고 Board의 Pk와 /:id 가 같음
                    where: {id: req.body.id, write_id: userPk, board_id: req.params.id}
                }
            ).then(result => {
                if (result == 1)
                    res.json({
                        success: true,
                        result
                    })
                else
                    res.json({
                        success: false,
                        result
                    })
            }).catch(err => {
                res.json({
                    success: false,
                    err
                })
            })
        }
    })
};


//게시판 추천
exports.boardRecommend = (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        const userPk = jwt.verify(req.token, "secretkey").id;
        if (err) {
            res.sendStatus(403);
        } else {
            MtsRecommend.findOne({
                where: {
                    board_id: req.params.id,
                    write_id: userPk
                }
            }).then(recommend => {
                if (!recommend) {
                    MtsRecommend.create({
                        board_id: req.params.id,
                        write_id: userPk
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
                } else {
                    MtsRecommend.destroy({
                        where: {write_id: userPk, board_id: req.params.id}
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
            })
        }
    })
};
