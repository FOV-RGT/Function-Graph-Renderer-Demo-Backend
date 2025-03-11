const express = require('express');
const router = express.Router();
const { mathData,upload } = require('../models');
const { success, failure } = require('../utils/responses');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const { where,Op } = require('sequelize');
const { raw } = require('mysql2');


//查询2D历史记录
router.get('/2D', async function (req, res, next) {
    const userId = req.userId;
    try {
        const upId=await upload.findAll({
            raw: true,
            attributes: ['id'],
            where: {
                userId: userId
            },
            order: [['id', 'DESC']],
        });

        
        const idArray = upId.map(item => item.id);
        console.log(idArray);
        const mathdatas = await mathData.findAll(
            {
                attributes: { exclude: ['userId', 'dimension', 'updatedAt'] },
                order: [['id', 'DESC']],
                limit: 5,
                where: {
                    uploadId:{
                        [Op.in]:idArray
                    },
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

    const userId = req.userId;
    try {
        const upId=await upload.findAll({
            raw: true,
            attributes: ['id'],
            where: {
                userId: userId
            },
            order: [['id', 'DESC']],
        });

        
        const idArray = upId.map(item => item.id);
        console.log(idArray);
        const mathdatas = await mathData.findAll(
            {
                attributes: { exclude: ['userId', 'dimension', 'updatedAt'] },
                order: [['id', 'DESC']],
                limit: 5,
                where: {
                    uploadId:{
                        [Op.in]:idArray
                    },
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
    const data = req.body;

    // 检查数据格式 
    if(!Array.isArray(data)||data.length===0){
        throw new BadRequestError('数据格式不正确。'); 
    }

    
    try {

        const newUpload = await upload.create({ userId: req.userId });
        const uploadId = newUpload.id;

        const entries = data.map(item => ({
            userid:req.userId,
            uploadId: uploadId,
            fn: item.fn,
            color: item.color,
            nSamples: item.nSamples,
            visible: item.visible
        }));
        
        await mathData.bulkCreate(entries);

        success(res, '添加历史记录成功。', { uploadId }, 201);
    } catch (error) {
        failure(res, error);
    }
});
module.exports = router;