/* eslint-disable no-undef */
const menu = {
        
            'title': '首页',
            'name': 'index',
            'children': [
                {
                    'title': '系统管理',
                    'name': 'system',
                    'icon': require('../assets/menu/user.png'),
                    'children': [
                        {
                            'title': '用户管理',
                            'icon': require('../assets/menu/user.png'),
                            'name': 'user'
                        },
                        {
                            'title': '角色管理',
                            'icon': require('../assets/menu/role.png'),
                            'name': 'role'
                        },
                        {
                            'title': '字典信息管理',
                            // 'icon': 'iconfont iconzidianxinxiguanli',
                            'icon': require('../assets/menu/dictionaryInfo.png'),
                            'name': 'dictionaryInfo'
                        },
                        {
                            'title': '系统日志',
                            'icon': require('../assets/menu/basicFoundation.png'),
                            'name': 'systemDialog'
                        }
                    ]
                }
            ]
        
    
};
export default menu;
