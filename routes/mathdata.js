const express = require('express');
const router = express.Router();
const { mathData } = require('../models');
const { success, failure } = require('../utils/responses');
const user = require('../models/user');
const jwt = require('jsonwebtoken');

//查询2D历史记录
router.get('/2D', async function (req, res, next) {

    try {
        const mathdatas = await mathData.findAll(
            {
                attributes: { exclude: ['userId', 'dimension', 'updateAt'] },
                order: [['id', 'DESC']],
                limit: 5,
                where: {
                    userId: req.userId,
                    dimension: 2
                }
            }

        );
        if (mathdatas.length === 0) {
            success(res, '没有查询到历史记录。');
            return;
        }else{
            success(res, '查询历史记录成功。', {
                mathdatas
            });
        }
    } catch (error) {
        failure(res, error);
    }
});


//查询3D历史记录
router.get('/3D', async function (req, res, next) {

    try {
        const mathdatas = await mathData.findAll(
            {
                attributes: { exclude: ['userId', 'dimension', 'updateAt'] },
                order: [['id', 'DESC']],
                limit: 5,
                where: {
                    userId: req.userId,
                    dimension: 3
                }
            }

        );
        if (mathdatas.length === 0) {
            success(res, '没有查询到历史记录。');
            return;
        }else{
            success(res, '查询历史记录成功。', {
                mathdatas
            });
        }
    } catch (error) {
        failure(res, error);
    }
});

//添加历史记录
router.post('/', async function (req, res) {
    try {
        const body = {
            userId: req.userId,
            dimension: req.body.dimension,
            functionValue: req.body.functionValue
        }

        const mathdata = await mathData.create(body);
        success(res, '添加历史记录成功。', { mathdata }, 201);
    } catch (error) {
        failure(res, error);
    }
});
module.exports = router;