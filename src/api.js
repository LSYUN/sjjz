
const context = '/wideband'
export default {
    // 登录接口
    login: `/bigdata/loginController.do?login`,
    // 退出接口
    logout: `/bigdata/loginController.do?logout`,
    // 获取数据易菜单接口
    menu: `/bigdata/nav/menu`,
    //获取sjjz菜单接口
    sjjzMenu: `/bigdata/syresourceController.do?querySyresourceTreeGridDatas&id&description=broadband`,
    // 测试是否登录的无聊接口
    confirmAuth: `${context}/register`,
    // 统计分析页面相关接口
    statisticalAnalysis: {
        // 获取表格数据接口
        getTableList: `${context}/analysis/listresult`,
        // 导出表格数据接口
        exportList: `${context}/analysis/export`,
        // 获取图表数据接口
        getChartData: `${context}/analysis/statistic`
    },
    // 用户画像相关接口
    userPortrait: {
        // 画像详情接口
        getPortraitDetail: `${context}/userPortrait/detail`
    },
    // 离网名单页面相关接口
    userOfflist: {
        // 获取离网用户列表
        getUserList: `${context}/escapeUserList/list`,
        // 导出离网用户列表
        exportList: `${context}/escapeUserList/export`,
        // 提交维挽建议
        giveAdvice: `${context}/escapeUserList/modAdvice`,
    }
}
