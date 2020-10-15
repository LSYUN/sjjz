export const mainSource = [
    {
        key: 1,
        TableName: 'ACC_CS_NBR',
        sourceName: 'SRC>ACC_CS_NBR',
        database: 'SRC',
        isCompress: '是',
        type: 'MANAGERD',
        size: '6.68M',
        isPartition: '是',
        count: '5',
        input: 'org.apache.hadoop.mapred.TextInputFormat',
        output: 'org.apache.hadoop.hive.qi.io.HiveIgnoreKeyTextOutputFormat',
        position: 'hdfs://nameservice1/user/hive/warehouse/src.db/acc_cs_nbr',
        createTime: '2017-07-28 11:49:20',
        linuxUser: 'hdfs',
    },
    {
        key: 2,
        TableName: 'ACC_DB_NAA_D',
        sourceName: 'SRC>ACC_DB_NAA_D',
        database: 'SRC',
        isCompress: '否',
        type: 'MANAGERD',
        size: '40.66M',
        isPartition: '否',
        count: '4',
        input: 'org.apache.hadoop.mapred.TextInputFormat',
        output: 'org.apache.hadoop.hive.qi.io.HiveIgnoreKeyTextOutputFormat',
        position: 'hdfs://nameservice1/user/hive/warehouse/src.db/acc_db_naa_d',
        createTime: '2017-011-27 15:49:20',
        linuxUser: 'hdfs',
    },
    {
        key: 3,
        TableName: 'LOG_TAB_MO_CC',
        sourceName: 'SRC>LOG_TAB_MO_CC',
        database: 'SRC',
        isCompress: '是',
        type: 'MANAGERD',
        size: '2.56M',
        isPartition: '是',
        count: '6',
        input: 'org.apache.hadoop.mapred.TextInputFormat',
        output: 'org.apache.hadoop.hive.qi.io.HiveIgnoreKeyTextOutputFormat',
        position: 'hdfs://nameservice1/user/hive/warehouse/src.db/log_tab_mo_cc',
        createTime: '2018-01-23 14:55:28',
        linuxUser: 'hdfs',
    },
    {
        key: 4,
        TableName: 'PAT_SERV_XFF',
        sourceName: 'SRC>PAT_SERV_XFF',
        database: 'SRC',
        isCompress: '否',
        type: 'MANAGERD',
        size: '1.02G',
        isPartition: '否',
        count: '2',
        input: 'org.apache.hadoop.mapred.TextInputFormat',
        output: 'org.apache.hadoop.hive.qi.io.HiveIgnoreKeyTextOutputFormat',
        position: 'hdfs://nameservice1/user/hive/warehouse/src.db/pat_serv_xff',
        createTime: '2018-02-03 11:49:20',
        linuxUser: 'hdfs',
    },
    {
        key: 5,
        TableName: 'CONF_DDS_MMD',
        sourceName: 'SRC>CONF_DDS_MMD',
        database: 'SRC',
        isCompress: '否',
        type: 'MANAGERD',
        size: '90.03M',
        isPartition: '否',
        count: '3',
        input: 'org.apache.hadoop.mapred.TextInputFormat',
        output: 'org.apache.hadoop.hive.qi.io.HiveIgnoreKeyTextOutputFormat',
        position: 'hdfs://nameservice1/user/hive/warehouse/src.db/cong_dds_mmd',
        createTime: '2018-04-01 12:09:49',
        linuxUser: 'hdfs',
    },
    {
        key: 6,
        TableName: 'COUT_FDBD_YKY',
        sourceName: 'SRC>COUT_FDBD_YKY',
        database: 'SRC',
        isCompress: '是',
        type: 'MANAGERD',
        size: '4.50M',
        isPartition: '是',
        count: '1',
        input: 'org.apache.hadoop.mapred.TextInputFormat',
        output: 'org.apache.hadoop.hive.qi.io.HiveIgnoreKeyTextOutputFormat',
        position: 'hdfs://nameservice1/user/hive/warehouse/src.db/cout_fdbd_yky',
        createTime: '2018-04-20 19:49:29',
        linuxUser: 'hdfs',
    },
];

export const partitionSource = [
    {
        key: '1',
        keyward: 'mon_201706',
        time: '2017-07-11 17:18:52',
        size: '66.61m',
    }
];

export const structureSource = [
    {
        key: '1',
        index: '1',
        fieldName: 'all_sc',
        fieldType: 'String',
        fieldAlias: '',
        remark: '当月收视总时长',
    }, {
        key: '2',
        index: '2',
        fieldName: 'demang_type_cnt_top1',
        fieldType: 'string',
        fieldAlias: '',
        remark: 'TOP1热门点播类型及点播次数',
    }
];

export const dataSource = [
    {
        key: '1',
        index: '1',
        userid: '0200000000075',
        widthid: 'gzitvy00000075@iptv.gd',
        sum_month: '201706',
        times: '5.0',
    }, {
        key: '2',
        index: '2',
        userid: '0200000000132',
        widthid: 'gzitvy00000132@iptv.gd',
        sum_month: '201706',
        times: '17.0',
    }, {
        key: '3',
        index: '3',
        userid: '0200000000171',
        widthid: 'gzitvy00000171@iptv.gd',
        sum_month: '201706',
        times: '17.0',
    }
];

export const relationship = {
    data1: [
        'day',
        'is_wock',
        'month_kt'
    ],
    data2: [
        'access_opetr',
        'balance_fee1',
        'balance_fee2',
    ],
    data3: [
        'aaa_add',
        'acc_id',
        'acc_i_it_id1',
    ],
    data4: [
        'acc_ntr',
        'chgmod',
        'flux',
        'flux_cnt',
        'flux_cnt_roam',
        'flux_cnt_lotal',
        'flux_down',
    ],
    data5: [
        'acc_ntr',
        'chgmod',
        'flux',
        'flux_cnt',
        'flux_cnt_roam',
        'flux_cnt_lotal',
        'flux_down',
    ],
};


