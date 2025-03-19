const express = require('express');
const router = express.Router();
const { mathData, upload,change } = require('../models');
const { success, failure } = require('../utils/responses');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const { where, Op } = require('sequelize');
const { raw } = require('mysql2');
const { BadRequestError } = require('../utils/errors');



//查询2D历史记录
router.get('/2D', async function (req, res, next) {
    const userId = req.userId;
    const query = req.query;
    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;

    try {
        const upId = await upload.findAll({
            raw: true,
            attributes: ['id'],
            where: {
                userId: userId
            },
            order: [['id', 'DESC']],
        });


        const idArray = upId.map(item => item.id);

        const condition = {
            attributes: { exclude: ['userId','updatedAt'] },
            order: [['id', 'DESC']],
            limit: pageSize,
            offset: offset,
            where: {
                uploadId: {
                    [Op.in]: idArray
                },
                dimension: 2
            }
        };

        const { count, rows } = await mathData.findAndCountAll(condition);
        const totalPages = Math.ceil(count / pageSize);
        const mathdatas = rows;

        if (mathdatas.length === 0) {
            success(res, '没有查询到历史记录。');
            return;
        } else {
            success(res, '查询历史记录成功。', {
                pagination: {
                    currentPage,
                    pageSize,
                    totalRecords: count,
                    totalPages,
                },
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
    const query = req.query;
    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;

    try {
        const upId = await upload.findAll({
            raw: true,
            attributes: ['id'],
            where: {
                userId: userId
            },
            order: [['id', 'DESC']],
        });

        const idArray = upId.map(item => item.id);

        const condition = {
            attributes: { exclude: ['userId', 'updatedAt'] },
            order: [['id', 'DESC']],
            limit: pageSize,
            offset: offset,
            where: {
                uploadId: {
                    [Op.in]: idArray
                },
                dimension: 3
            }
        };

        const { count, rows } = await mathData.findAndCountAll(condition);
        const totalPages = Math.ceil(count / pageSize);
        const mathdatas = rows;

        if (mathdatas.length === 0) {
            success(res, '没有查询到历史记录。');
            return;
        } else {
            success(res, '查询历史记录成功。', {
                pagination: {
                    currentPage,
                    pageSize,
                    totalRecords: count,
                    totalPages,
                },
                mathdatas
            });
        }
    } catch (error) {
        failure(res, error);
    }
});


//查询上传批次
router.get('/upload', async function (req, res, next) {
    const userId = req.userId;
    try {
        const uploads = await upload.findAll({
            raw: true,
            attributes: ['id', 'createdAt'],
            where: {
                userId: userId
            },
            order: [['id', 'DESC']],
        });
        if (uploads.length === 0) {
            success(res, '没有查询到上传批次。');
            return;
        }else{
            success(res, '查询上传批次成功。', { uploads });
        }
    } catch (error) {
        failure(res, error);
    }
});

//添加历史记录
router.post('/', async function (req, res) {
    const data = req.body;
    
    try {
        
        // 检查数据格式
        if(!Array.isArray(data)||data.length===0){
            throw new BadRequestError('数据格式不正确。'); 
        }

        const newUpload = await upload.create({ userId: req.userId });
        const uploadId = newUpload.id;
        const entries = data.map(item => ({
            userid: req.userId,
            uploadId: uploadId,
            fn: item.fn,
            color: item.color,
            nSamples: item.nSamples,
            visible: item.visible,
            dimension: item.dimension,
            graphType: item.graphType || 'interval',
            closed: item.closed || false,
            range: item.range || null
        }));

        await mathData.bulkCreate(entries);

        success(res, '添加历史记录成功。', { uploadId }, 201);
    } catch (error) {
        failure(res, error);
    }
});

//删除历史记录
router.delete('/', async function (req, res) {
    const data = req.body;
    try {
        if (!Array.isArray(data) || data.length === 0) {
            throw new BadRequestError('数据格式不正确。');
        }

        const ids = data.map(item => item.id);
        await mathData.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        });

        success(res, '删除历史记录成功。');
    } catch (error) {
        failure(res, error);
    }
});

//新增变动数据
router.post('/change', async function (req, res) {
    const data = req.body;
    try {
        if (!Array.isArray(data) || data.length === 0) {
            throw new BadRequestError('数据格式不正确。');
        }

        const entries = data.map(item => ({
            userId: req.userId,
            dimension: item.dimension,
            fn: item.fn,
            color: item.color,
            nSamples: item.nSamples,
            visible: item.visible,
            graphType: item.graphType || 'interval',
            closed: item.closed || false,
            range: item.range || null
        }));

        await change.bulkCreate(entries);

        success(res, '添加变动数据成功。',{} ,201);
    } catch (error) {
        failure(res, error);
    }
});

//删除变动数据
router.delete('/change', async function (req, res) {
    const data = req.body;
    try {
        if (!Array.isArray(data) || data.length === 0) {
            throw new BadRequestError('数据格式不正确。');
        }

        const ids = data.map(item => item.id);
        await change.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        });

        success(res, '删除变动数据成功。');
    } catch (error) {
        failure(res, error);
    }
});

//查询变动数据
router.get('/change', async function (req, res, next) {
    const userId = req.userId;
    const query = req.query;
    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 4;
    const offset = (currentPage - 1) * pageSize;

    try {
        
        const condition = {
            attributes: { exclude: ['userId','updatedAt'] },
            order: [['id', 'DESC']],
            limit: pageSize,
            offset: offset,
            where: {
                userId: userId
            }
        };

        const { count, rows } = await change.findAndCountAll(condition);
        const totalPages = Math.ceil(count / pageSize);
        const mathdatas = rows;

        if (mathdatas.length === 0) {
            success(res, '没有查询到历史记录。');
            return;
        } else {
            success(res, '查询历史记录成功。', {
                pagination: {
                    currentPage,
                    pageSize,
                    totalRecords: count,
                    totalPages,
                },
                mathdatas
            });
        }
    } catch (error) {
        failure(res, error);
    }
});


module.exports = router;