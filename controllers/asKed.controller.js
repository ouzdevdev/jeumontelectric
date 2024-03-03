// asked.controller.js
const { Op } = require('sequelize');
const { Asked, Ship, Status, Fleet, Customer, PRFS, PRFM, PRMP } = require('../models');

/**
* Nom de la fonction : getAllAsked
* Description : Chercher les tickets.
* @query {String} asked_description . 
* @query {String} sort - L'element de trie. 
* @query {Integer} item_size - Le nombre d'elements. 
* @query {Integer} typeFilter - type de ticket. 
* @query {Integer} statusFilter - status de ticket. 
* @query {String} clientFilter - client. 
* @query {String} shipFilter - bateau. 
* @query {String} sortOption - ASC / DESC.
* @query {Integer} page - le nombre des page.
* @returns {Type} - JSON ({ TICKETS, NOMBRE DES TICKETS }).
* @example
* // Exemple d'utilisation de la fonction
* getAllAsked();
*/
const getAllAsked = async (req, res) => {
    try {
        const { asked_description, sort, item_size, typeFilter, statusFilter, clientFilter, shipFilter, sortOption, page } = req.query;

        const offset = (page - 1) * item_size;

        const count = await Asked.findAll({
            where: {
                [Op.and]: [
                    asked_description ? {
                        [Op.or]: [
                            {
                                asked_description: {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            },
                            {
                                asked_ref: {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            },
                            {
                                '$Ship.ship_name$': {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            }
                        ],
                    } : {},
                    statusFilter ? { status_id: parseInt(statusFilter) } : {},
                    clientFilter ? { '$Ship.Fleet.Customer.customer_uuid$': clientFilter } : {},
                    shipFilter ? { ship_uuid: shipFilter } : {},
                    typeFilter ? { type_asked: typeFilter } : {},
                    { type_asked: { [Op.not]: null } },
                ]
            },
            include: [
                {
                    model: Status,
                    as: 'Status',
                    attributes: ['status_label', 'status_id'] 
                },
                {
                    model: Ship,
                    as: 'Ship',
                    include: [
                        {
                            model: Fleet,
                            as: 'Fleet',
                            include: [
                                {
                                    model: Customer,
                                    as: 'Customer',
                                    attributes: ['customer_name', 'customer_uuid']
                                }
                            ]
                        }
                    ]
                }
            ],
            group: [
                'asked_uuid',
                'asked_ref',
                'Status.status_label',
                'Status.status_id',
                'Ship.ship_uuid',
                'Ship.Fleet.fleet_id',
                'Ship.Fleet.Customer.customer_name',
                'Ship.Fleet.Customer.customer_uuid'    
            ],
        });

        const askedsList = await Asked.findAll({
            where: {
                [Op.and]: [
                    asked_description ? {
                        [Op.or]: [
                            {
                                asked_description: {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            },
                            {
                                asked_ref: {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            },
                            {
                                '$Ship.ship_name$': {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            }
                        ],
                    } : {},
                    statusFilter ? { status_id: parseInt(statusFilter) } : {},
                    clientFilter ? { '$Ship.Fleet.Customer.customer_uuid$': clientFilter } : {},
                    shipFilter ? { ship_uuid: shipFilter } : {},
                    typeFilter ? { type_asked: typeFilter } : {},
                ]
            },
            offset,
            limit: item_size,
            order: [
                sort === 'ship' ?
                    [
                        'Ship',
                        'ship_name',
                        sortOption === 'asc' ? 'ASC' : 'DESC'
                    ] 
                :
                sort === 'client_name' ?
                    [
                        'Ship',
                        'Fleet',
                        'Customer',
                        'customer_name',
                        sortOption === 'asc' ? 'ASC' : 'DESC'
                    ] 
                :
                sort === 'status' ? 
                    [ 
                        'Status', 
                        'status_label', 
                        sortOption === 'asc' ? 'ASC' : 'DESC'
                    ] 
                :
                sort === 'asked_updated_date' ?
                    [
                        'asked_updated_date',
                        sortOption === 'asc' ? 'ASC NULLS LAST' : 'DESC NULLS LAST'
                    ]
                : 
                sort !== '' ?  
                    [ 
                        sort, 
                        sortOption === 'asc' ? 'ASC' : 'DESC'  
                    ]
                :    
                    ['asked_created_date', 'DESC']
                
            ], 
            distinct: true,
            include: [
                {
                    model: Status,
                    as: 'Status',
                    attributes: ['status_label', 'status_id'] 
                },
                {
                    model: Ship,
                    as: 'Ship',
                    include: [
                        {
                            model: Fleet,
                            as: 'Fleet',
                            include: [
                                {
                                    model: Customer,
                                    as: 'Customer',
                                    attributes: ['customer_name', 'customer_uuid']
                                }
                            ]
                        }
                    ]
                }
            ],
            group: [
                'asked_uuid',
                'asked_ref',
                'Status.status_label',
                'Status.status_id',
                'Ship.ship_uuid',
                'Ship.Fleet.fleet_id',
                'Ship.Fleet.Customer.customer_name',
                'Ship.Fleet.Customer.customer_uuid'    
            ],
        });        

        if (!askedsList.length) {
            return res.status(404).json({ 
                message: "L’information que vous cherchez n’existe pas" 
            });
        }

        res.json({
            askedsList,
            count: count.length
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
* Nom de la fonction : getAllAskedClient
* Description : Chercher les tickets d'un client.
* @query {String} asked_description . 
* @query {String} sort - L'element de trie. 
* @query {Integer} item_size - Le nombre d'elements. 
* @query {Integer} typeFilter - type de ticket. 
* @query {Integer} statusFilter - status de ticket. 
* @query {String} clientFilter - client. 
* @query {String} shipFilter - bateau. 
* @query {String} sortOption - ASC / DESC.
* @query {Integer} page - le nombre des page.
* @returns {Type} - JSON ({ TICKETS, NOMBRE DES TICKETS }).
* @example
* // Exemple d'utilisation de la fonction
* getAllAskedClient();
*/
const getAllAskedClient = async (req, res) => {
    try {
        const { asked_description, sort, item_size, typeFilter, statusFilter, clientFilter, sortOption, page } = req.query;

        const offset = (page - 1) * item_size;

        const count = await Asked.findAll({
            where: {
                [Op.and]: [
                    asked_description ? {
                        [Op.or]: [
                            {
                                asked_description: {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            },
                            {
                                asked_ref: {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            },
                            {
                                '$Ship.ship_name$': {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            }
                        ],
                    } : {},
                    statusFilter ? { status_id: parseInt(statusFilter) } : {},
                    clientFilter ? { '$Ship.user_uuid$': clientFilter } : {},
                    typeFilter ? { type_asked: typeFilter } : {},
                    { type_asked: { [Op.not]: null } },
                ]
            },
            include: [
                {
                    model: Status,
                    as: 'Status',
                    attributes: ['status_label', 'status_id'] 
                },
                {
                    model: Ship,
                    as: 'Ship',
                    include: [
                        {
                            model: Fleet,
                            as: 'Fleet',
                            include: [
                                {
                                    model: Customer,
                                    as: 'Customer',
                                    attributes: ['customer_name', 'customer_uuid']
                                }
                            ]
                        }
                    ]
                }
            ],
            group: [
                'asked_uuid',
                'asked_ref',
                'Status.status_label',
                'Status.status_id',
                'Ship.ship_uuid',
                'Ship.Fleet.fleet_id',
                'Ship.Fleet.Customer.customer_name',
                'Ship.Fleet.Customer.customer_uuid'    
            ],
        });

        const askedsList = await Asked.findAll({
            where: {
                [Op.and]: [
                    asked_description ? {
                        [Op.or]: [
                            {
                                asked_description: {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            },
                            {
                                asked_ref: {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            },
                            {
                                '$Ship.ship_name$': {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            }
                        ],
                    } : {},
                    statusFilter ? { status_id: parseInt(statusFilter) } : {},
                    clientFilter ? { '$Ship.user_uuid$': clientFilter } : {},
                    typeFilter ? { type_asked: typeFilter } : {},
                    { type_asked: { [Op.not]: null } },
                ]
            },
            offset,
            limit: item_size,
            order: [
                sort === 'ship' ?
                    [
                        'Ship',
                        'ship_name',
                        sortOption === 'asc' ? 'ASC' : 'DESC'
                    ] 
                :
                sort === 'client_name' ?
                    [
                        'Ship',
                        'Fleet',
                        'Customer',
                        'customer_name',
                        sortOption === 'asc' ? 'ASC' : 'DESC'
                    ] 
                :
                sort === 'status' ? 
                    [ 
                        'Status', 
                        'status_label', 
                        sortOption === 'asc' ? 'ASC' : 'DESC'
                    ] 
                :
                sort === 'asked_updated_date' ?
                    [
                        'asked_updated_date',
                        sortOption === 'asc' ? 'ASC NULLS LAST' : 'DESC NULLS LAST'
                    ]
                : 
                sort !== '' ?  
                    [ 
                        sort, 
                        sortOption === 'asc' ? 'ASC' : 'DESC'  
                    ]
                :    
                    ['asked_created_date', 'DESC']
                
            ], 
            distinct: true,
            include: [
                {
                    model: Status,
                    as: 'Status',
                    attributes: ['status_label', 'status_id'] 
                },
                {
                    model: Ship,
                    as: 'Ship',
                    include: [
                        {
                            model: Fleet,
                            as: 'Fleet',
                            include: [
                                {
                                    model: Customer,
                                    as: 'Customer',
                                    attributes: ['customer_name', 'customer_uuid']
                                }
                            ]
                        }
                    ]
                }
            ],
            group: [
                'asked_uuid',
                'asked_ref',
                'Status.status_label',
                'Status.status_id',
                'Ship.ship_uuid',
                'Ship.Fleet.fleet_id',
                'Ship.Fleet.Customer.customer_name',
                'Ship.Fleet.Customer.customer_uuid'    
            ],
        });

        if (!askedsList.length) {
            return res.status(404).json({ 
                message: "L’information que vous cherchez n’existe pas"
            });
        }

        res.json({
            count: count.length,
            askedsList
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
* Nom de la fonction : getAllAskedPRFMSimple
* Description : Chercher les tickets prfm.
* @query {String} asked_description.
* @returns {Type} - JSON({ TICKETS PRFS}).
* @example
* // Exemple d'utilisation de la fonction
* getAllAskedPRFMSimple();
*/
const getAllAskedPRFMSimple = async (req, res) => {
    try {
        const { asked_description } = req.query;

        const askedsList = await PRFM.findAll({
            where: {
                [Op.and]: [
                    asked_description ? {
                        [Op.or]: [
                            {
                                asked_ref: {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            },
                        ],
                    } : {},
                ]
            },
            order: [
                ['asked_created_date', 'DESC']
            ], 
        });

        if (!askedsList.length) {
            return res.status(404).json({ 
                message: 'No asked found' 
            });
        }

        res.json(askedsList);
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
}

/**
* Nom de la fonction : getAllAskedPRMASimple
* Description : Chercher les tickets prma.
* @query {String} asked_description.
* @returns {Type} - JSON({ TICKETS PRFS}).
* @example
* // Exemple d'utilisation de la fonction
* getAllAskedPRMASimple();
*/
const getAllAskedPRMASimple = async (req, res) => {
    try {
        const { asked_description } = req.query;

        const askedsList = await PRMP.findAll({
            where: {
                [Op.and]: [
                    asked_description ? {
                        [Op.or]: [
                            {
                                asked_ref: {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            },
                        ],
                    } : {},
                ]
            },
            order: [
                ['asked_created_date', 'DESC']
            ], 
        });

        if (!askedsList.length) {
            return res.status(404).json({ 
                message: 'No asked found' 
            });
        }

        res.json(askedsList);
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
}

/**
* Nom de la fonction : getAllAskedPRFSSimple
* Description : Chercher les tickets prfs.
* @query {String} asked_description.
* @returns {Type} - JSON({ TICKETS PRFS}).
* @example
* // Exemple d'utilisation de la fonction
* getAllAskedPRFSSimple();
*/
const getAllAskedPRFSSimple = async (req, res) => {
    try {
        const { asked_description } = req.query;

        const askedsList = await PRFS.findAll({
            where: {
                [Op.and]: [
                    asked_description ? {
                        [Op.or]: [
                            {
                                asked_ref: {
                                    [Op.iLike]: `%${asked_description}%`
                                }
                            },
                        ],
                    } : {},
                ]
            },
            order: [
                ['asked_created_date', 'DESC']
            ], 
        });

        if (!askedsList.length) {
            return res.status(404).json({ 
                message: 'No asked found' 
            });
        }

        res.json(askedsList);
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
}

/**
* Nom de la fonction : getGlobalStatisticsAskedForChart
* Description : les statistiques des tickets.
* @query {Integer} selectedDuration - duree. 
* @query {String | uuid} client - client. 
* @query {String | uuid} ship - bateau. 
* @returns {Type} - Json{( Info )}.
* @example
* // Exemple d'utilisation de la fonction
* getGlobalStatisticsAskedForChart();
*/
const getGlobalStatisticsAskedForChart = async (req, res) => {
    try {

        const { selectedDuration, client, ship, skill, effect, side, tag, effectType, level } = req.query; 
        
        const currentDate = new Date();
        const selectedDate = new Date(currentDate.getTime() - selectedDuration * 60 * 60 * 1000);
        
        const statusList = await Status.findAll();
        let whereClause = {}; 

        if ( Number(selectedDuration) != -1 ) {
            whereClause = {
                asked_created_date : {
                    [Op.gte]: selectedDate, 
                },
            };
        }

        if ( client ) {
            whereClause['$Ship.Fleet.customer_uuid$'] = client;
        }

        if ( ship ) {
            whereClause.ship_uuid = ship;
        }
        
        const askedCount = await Asked.count({
            include: [{
                model: Ship,
                include: [{
                    model: Fleet
                }],
            }],
            where: whereClause,
        })

        const statistics = await Promise.all(
            statusList.map(async (status) => {
                let whereClause = {
                    status_id: status.status_id,
                };
    
                if (Number(selectedDuration) != -1) {
                    whereClause.asked_created_date = {
                        [Op.gte]: selectedDate, 
                    };
                }

                if ( client ) {
                    whereClause['$Ship.Fleet.customer_uuid$'] = client;
                }
        
                if ( ship ) {
                    whereClause.ship_uuid = ship;
                }
                        
                const count = await Asked.count({
                    include: [{
                        model: Ship,
                        include: [{
                            model: Fleet,
                        }],
                    }],
                    where: whereClause,
                });

                return {
                    status_id: status.status_id,
                    status_label: status.status_label,
                    count,
                };
            })
        );

        const oneTouchCount = statistics.find(stat => stat.status_id === 6);

        const percentageStatistics = statistics.map(stat => ({
            status_id: stat.status_id,
            status_label: stat.status_label,
            count: stat.count,
            percentage: (stat.count / askedCount) * 100, 
        }));

        res.json({
            statistics: percentageStatistics,
            one_touch_count: oneTouchCount.count,
            askedCount
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
* Nom de la fonction : getGlobalStatisticsAskedForChartClient
* Description : les statistiques des tickets d'un client.
* @query {Integer} selectedDuration - duree. 
* @query {String | uuid} client - client. 
* @query {String | uuid} ship - bateau. 
* @returns {Type} - Json{( Info )}.
* @example
* // Exemple d'utilisation de la fonction
* getGlobalStatisticsAskedForChartClient();
*/
const getGlobalStatisticsAskedForChartClient = async (req, res) => {
    try {

        const { selectedDuration, client, ship } = req.query; 
        
        const currentDate = new Date();
        const selectedDate = new Date(currentDate.getTime() - selectedDuration * 60 * 60 * 1000);
        
        const statusList = await Status.findAll();
        let whereClause = {}; 

        if ( Number(selectedDuration) != -1 ) {
            whereClause = {
                asked_created_date : {
                    [Op.gte]: selectedDate, 
                },
            };
        }

        if ( client ) {
            whereClause['$Ship.user_uuid$'] = client;
        }

        if ( ship ) {
            whereClause.ship_uuid = ship;
        }
        
        const askedCount = await Asked.count({
            include: [{
                model: Ship,
                include: [{
                    model: Fleet
                }],
            }],
            where: whereClause,
        })

        const statistics = await Promise.all(
            statusList.map(async (status) => {
                let whereClause = {
                    status_id: status.status_id,
                };
    
                if (Number(selectedDuration) != -1) {
                    whereClause.asked_created_date = {
                        [Op.gte]: selectedDate, 
                    };
                }

                if ( client ) {
                    whereClause['$Ship.user_uuid$'] = client;
                }
        
                if ( ship ) {
                    whereClause.ship_uuid = ship;
                }
                        
                const count = await Asked.count({
                    include: [{
                        model: Ship,
                        include: [{
                            model: Fleet,
                        }],
                    }],
                    where: whereClause,
                });

                return {
                    status_id: status.status_id,
                    status_label: status.status_label,
                    count,
                };
            })
        );

        const oneTouchCount = statistics.find(stat => stat.status_id === 6);

        const percentageStatistics = statistics.map(stat => ({
            status_id: stat.status_id,
            status_label: stat.status_label,
            count: stat.count,
            percentage: (stat.count / askedCount) * 100, 
        }));

        res.json({
            statistics: percentageStatistics,
            one_touch_count: oneTouchCount.count,
            askedCount
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
* Nom de la fonction : getGlobalStatisticsAsked
* Description : statistiques tickets.
* @returns {Type} - Json({ INFO }).
* @example
* // Exemple d'utilisation de la fonction
* getGlobalStatisticsAsked();
*/
const getGlobalStatisticsAsked = async (req, res) => {
    try {
        const askeds = await Asked.findAll();

        const statistics = {
            opened: 0,
            resolved: 0,
            unresolved: 0,
            oneTouch: 0,
            totalResponseTime: 0
        };

        askeds.forEach((asked) => {
            if (asked.status_id === 1){
                statistics.oneTouch ++;
                statistics.opened++;
            } else if (asked.status_id === 6){
                statistics.resolved++;
                statistics.totalResponseTime += (asked.asked_updated_date - asked.asked_created_date); 
            } else {
                statistics.unresolved++;
                statistics.oneTouch ++;
            }
        });

        statistics.oneTouch = (statistics.oneTouch / askeds.length) * 100 ;

        res.json({
            statistics,
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
* Nom de la fonction : getGlobalStatisticsAskedClient
* Description : statistiques tickets.
* @returns {Type} - Json({ INFO }).
* @example
* // Exemple d'utilisation de la fonction
* getGlobalStatisticsAskedClient();
*/
const getGlobalStatisticsAskedClient = async (req, res) => {
    try {
        const { client } = req.query; 

        let whereClause = {}; 

        if ( client ) {
            whereClause['$Ship.user_uuid$'] = client;
        }
        

        const askeds = await Asked.findAll({
            include: [{
                model: Ship,
            }],
            where: whereClause,
        });


        const statistics = {
            opened: 0,
            resolved: 0,
            unresolved: 0,
            oneTouch: 0,
            totalResponseTime: 0
        };

        askeds.forEach((asked) => {
            if (asked.status_id === 1){
                statistics.oneTouch ++;
                statistics.opened++;
            } else if (asked.status_id === 6){
                statistics.resolved++;
                statistics.totalResponseTime += (asked.asked_updated_date - asked.asked_created_date); 
            } else {
                statistics.unresolved++;
                statistics.oneTouch ++;
            }
        });

        statistics.oneTouch = (statistics.oneTouch / askeds.length) * 100 ;

        res.json({
            statistics,
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
* Nom de la fonction : getAskedById
* Description : Chercher un ticket.
* @query {String | uuid } id - l'identifiant d'un ticket.
* @returns {Type} - JSON({Ticket}).
* @example
* // Exemple d'utilisation de la fonction
* getAskedById();
*/
const getAskedById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if ( !id ) {
            return res.status(400).json({ message: 'Asked ID is required' });
        }
        
        const askedItem = await Asked.findOne({ where: { asked_uuid: id } });
        
        if ( !askedItem ) {
            return res.status(404).json({ message: 'Asked not found' });
        }
        
        res.json(askedItem);
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
}

/**
* Nom de la fonction : deleteAsked
* Description : supprimer un ticket.
* @query {String | uuid } id - l'identifiant d'un ticket.
* @returns {Type} - JSON({Ticket}).
* @example
* // Exemple d'utilisation de la fonction
* deleteAsked();
*/
const deleteAsked = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
          return res.status(400).json({ message: 'Asked ID is required' });
        }
        const deletedCount = await Asked.destroy({ where: { asked_uuid: id } });
        if (!deletedCount) {
          return res.status(404).json({ message: 'Asked not found' });
        }
        res.json({ message: 'Asked deleted successfully' });
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
}

module.exports = {
    getAllAsked,
    getAllAskedClient,
    getAllAskedPRFSSimple,
    getAllAskedPRFMSimple,
    getAllAskedPRMASimple,
    getAskedById,
    deleteAsked,
    getGlobalStatisticsAsked,
    getGlobalStatisticsAskedClient,
    getGlobalStatisticsAskedForChart,
    getGlobalStatisticsAskedForChartClient
}
