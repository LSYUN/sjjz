export const data = {
    quality: {
        dataSource: [
            {
                key: 1,
                tableName: 'SRC.TB_CDMA_HFF_C_1X_D',
                sourceName: 'SRC.TB_CDMA_HFF_C_1X_D',
                quantity: '200G',
                date: '20180409',
                chain: '+10',
                sameAs: '0',
                updateTime: '2018-04-09 16:58:26',
            },
            {
                key: 2,
                tableName: 'SRC.TB_IPTV_SERV_USER_D',
                sourceName: 'SRC.TB_IPTV_SERV_USER_D',
                quantity: '10G',
                date: '20180419',
                chain: '-5',
                sameAs: '降低6',
                updateTime: '2018-04-09 19:58:26',
            },
            {
                key: 3,
                tableName: 'SRC.TB_CONT_SERV_U',
                sourceName: 'SRC.TB_CONT_SERV_U',
                quantity: '14G',
                date: '20180419',
                chain: '+0.4',
                sameAs: '+0.2',
                updateTime: '2018-04-09 19:58:26',
            },
            {
                key: 4,
                tableName: 'SRC.TB_PVCC_LIST',
                sourceName: 'SRC.TB_PVCC_LIST',
                quantity: '8G',
                date: '20180419',
                chain: '+25',
                sameAs: '+16',
                updateTime: '2018-04-09 19:58:26',
            },
            {
                key: 5,
                tableName: 'SRC.TB_MANA_IPFE',
                sourceName: 'SRC.TB_MANA_IPFE',
                quantity: '20G',
                date: '20180419',
                chain: '-2',
                sameAs: '-0.4',
                updateTime: '2018-04-09 19:58:26',
            },
        ]
    },
    collection: {
        dataSource: [
            {
                key: 1,
                tableName: 'SRC.TB_CDMA_YFF_YE_599_D',
                sourceName: 'SRC.TB_CDMA_YFF_YE_599_D',
                date: '20180410',
                error: '文件下载失败',
                detail: '采集步骤明细'
            },
            {
                key: 2,
                tableName: 'SRC.TB_MANA_IPFE',
                sourceName: 'SRC.TB_MANA_IPFE',
                date: '20180411',
                error: '数据库连接失败',
                detail: '采集步骤明细'
            },
            {
                key: 3,
                tableName: 'SRC.TB_CDMA_HFF_C_1X_D',
                sourceName: 'SRC.TB_CDMA_HFF_C_1X_D',
                date: '20180414',
                error: '数据上传出错',
                detail: '采集步骤明细'
            },
            {
                key: 4,
                tableName: 'SRC.TB_CONT_SERV_U',
                sourceName: 'SRC.TB_CONT_SERV_U',
                date: '20180414',
                error: '插入hive分区出错',
                detail: '采集步骤明细'
            },
            {
                key: 5,
                tableName: 'SRC.TB_IPTV_SERV_LOGIN_D',
                sourceName: 'SRC.TB_IPTV_SERV_LOGIN_D',
                date: '20180417',
                error: '文件下载失败',
                detail: '采集步骤明细'
            },
        ]
    },
    unCollectingTask: {
        dataSource: [
            {
                key: 1,
                tableName: 'SRC.TB_CDMA_YFF_WLAN_200_D',
                sourceName: 'SRC.TB_CDMA_YFF_WLAN_200_D',
                period: '每日下午四点三十分',
                latestBatch: '20180421',
            },
            {
                key: 2,
                tableName: 'SRC.TB_CDMA_HFF_C_WLAN_D',
                sourceName: 'SRC.TB_CDMA_HFF_C_WLAN_D',
                period: '每日下午四点五十分',
                latestBatch: '20180421',
            },
            {
                key: 3,
                tableName: 'SRC.TB_CDMA_CFF_WLAN_D',
                sourceName: 'SRC.TB_CDMA_CFF_WLAN_D',
                period: '每日上午十一点五十分',
                latestBatch: '20180422',
            },
            {
                key: 4,
                tableName: 'SRC.TB_CDMA_LOGIN_C_D',
                sourceName: 'SRC.TB_CDMA_LOGIN_C_D',
                period: '每日上午十二点五十分',
                latestBatch: '20180422',
            },
            {
                key: 5,
                tableName: 'SRC.TB_LOGIN_OUT_D',
                sourceName: 'SRC.TB_LOGIN_OUT_D',
                period: '每日下午九点五十分',
                latestBatch: '20180422',
            },
        ]
    },
    basic: {
        dataSource: [
            {
                key: 1,
                tableName: 'SRC.TB_CDMA_HFF_C_1X_D',
                sourceName: 'SRC.TB_CDMA_HFF_C_1X_D',
                average: '200G/18G',
                collection: '运行中',
                chain: '+10',
                sameAs: '+8',
                alarm: '1',
                updateTime: '2018-04-09 16:58:26',
            },
            {
                key: 2,
                tableName: 'SRC.TB_IPTV_SERV_USER_D',
                sourceName: 'SRC.TB_IPTV_SERV_USER_D',
                average: '124G/99G',
                collection: '待运行',
                chain: '0',
                sameAs: '0',
                alarm: '1',
                updateTime: '2018-04-09 19:58:26',
            },
            {
                key: 3,
                tableName: 'SRC.TB_CDMA_YFF_YE_599_D',
                sourceName: 'SRC.TB_CDMA_YFF_YE_599_D',
                average: '50G/33G',
                collection: '待运行',
                chain: '-15',
                sameAs: '-0.6',
                alarm: '-1',
                updateTime: '2018-04-09 19:58:26',
            },
            {
                key: 4,
                tableName: 'SRC.TB_IPTV_SERV_LOGIN_D',
                sourceName: 'SRC.TB_IPTV_SERV_LOGIN_D',
                average: '19G/6G',
                collection: '待运行',
                chain: '+1.05',
                sameAs: '+1.09',
                alarm: '1',
                updateTime: '2018-04-09 19:58:26',
            },
            {
                key: 5,
                tableName: 'SRC.TB_MANA_IPFE',
                sourceName: 'SRC.TB_MANA_IPFE',
                average: '10G/9G',
                collection: '待运行',
                chain: '-10.55',
                sameAs: '-8.09',
                alarm: '-1',
                updateTime: '2018-04-09 19:58:26',
            },
        ]
    },
    condition: {
        dataSource: [
            {
                key: 1,
                tableName: 'SRC.TB_CDMA_HFF_C_1X_D',
                sourceName: 'SRC.TB_CDMA_HFF_C_1X_D',
                average: '200G/18G',
                collection: '运行中',
                chain: '+3.02',
                sameAs: '-0.02',
                alarm: '1',
                updateTime: '2018-04-09 16:58:26',
            },
            {
                key: 2,
                tableName: 'SRC.TB_IPTV_SERV_USER_D',
                sourceName: 'SRC.TB_IPTV_SERV_USER_D',
                average: '10G/1G',
                collection: '待运行',
                chain: '-5.99',
                sameAs: '0',
                alarm: '-1',
                updateTime: '2018-04-09 19:58:26',
            },
            {
                key: 3,
                tableName: 'SRC.TB_CONT_SERV_U',
                sourceName: 'SRC.TB_CONT_SERV_U',
                average: '18G/6G',
                collection: '待运行',
                chain: '+51',
                sameAs: '+80',
                alarm: '1',
                updateTime: '2018-04-09 19:58:26',
            },
            {
                key: 4,
                tableName: 'SRC.TB_PVCC_LIST',
                sourceName: 'SRC.TB_PVCC_LIST',
                average: '1G/668M',
                collection: '运行中',
                chain: '+2.33',
                sameAs: '-0.29',
                alarm: '1',
                updateTime: '2018-04-09 19:58:26',
            },
            {
                key: 5,
                tableName: 'SRC.TB_MANA_IPFE',
                sourceName: 'SRC.TB_MANA_IPFE',
                average: '1024M/233M',
                collection: '运行中',
                chain: '0',
                sameAs: '0',
                alarm: '-1',
                updateTime: '2018-04-09 19:58:26',
            },
        ]

    }
};

export const logoPie = {
    color: ['#00A0E9', '#8FC31F'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        show: false,
        data: ['平台天气', '今日天气']
    },
    series: [
        {
            name: '天气',
            type: 'pie',
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 1010, name: '平台天气'},
                {value: 135, name: '今日天气'},
            ]
        }
    ]
}

export const quantityPie = {
    color: ['#F39800', '#8FC31F', '#00A0E9'],
    title: {
        text: '数据量',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['采集', '生产', '分发'],
        selected: [{'采集': true}, {'生产': false}, {'分发': true}]
    },
    series: [
        {
            name: '类型',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: [{name: '采集', value: 26}, {name: '生产', value: 16}, {name: '分发', value: 96}],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

export const quantityBar = {
    grid: {
        left: 100,
    },
    xAxis: {
        type: 'category',
        show: true,
        data: ['2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12', '2018-01', '2018-02', '2018-03']
    },
    yAxis: {
        type: 'value',
        show: true,
    },
    series: [{
        data: [88888, 90000, 95000, 101570, 126560, 99999, 116560, 126060, 136560, 120560, 120660, 126560],
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
            color: '#2EC25B'
        }
    }]
};

export const recordPie = {
    color: ['#F39800', '#8FC31F', '#00A0E9'],
    title: {
        text: '数据量',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['采集', '生产', '分发'],
        selected: [{'采集': true}, {'生产': false}, {'分发': true}]
    },
    series: [
        {
            name: '类型',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: [{name: '采集', value: 200}, {name: '生产', value: 130}, {name: '分发', value: 660}],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

export const recordBar = {
    grid: {
        left: 100,
    },
    xAxis: {
        type: 'category',
        show: true,
        data: ['2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12', '2018-01', '2018-02', '2018-03']
    },
    yAxis: {
        type: 'value',
        show: true,
    },
    series: [{
        data: [88888, 90000, 95000, 101570, 126560, 99999, 116560, 126060, 136560, 120560, 120660, 126560],
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
            color: '#2EC25B'
        }
    }]
};

export const exceptionPie = {
    color: ['#00A0E9', '#8FC31F'],
    title: {
        text: '异常监控',
        // subtext: '纯属虚构',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['正常数量', '异常数量'],
        selected: [
            {'正常数量': true},
            {'异常数量': true},
        ]
    },
    series: [
        {
            name: '情况',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: [
                {name: '正常数量', value: 166},
                {name: '异常数量', value: 25},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

export const exceptionBar = {
    grid: {
        left: 100,
    },
    xAxis: {
        type: 'category',
        show: true,
        data: ['2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12', '2018-01', '2018-02', '2018-03']
    },
    yAxis: {
        type: 'value',
        show: true,
    },
    series: [{
        data: [88888, 90000, 95000, 101570, 126560, 99999, 116560, 126060, 136560, 120560, 120660, 126560],
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
            color: '#2EC25B'
        }
    }]
};