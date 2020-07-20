let urls = {};

let protocol = window.location.protocol;
let host = '';//window.location.host;
if (window.location.hostname === 'localhost') {//本地开发环境
    // host = 'tw.szedu.com';
    // host = '192.1.6.230:8080';
    host = '192.1.6.48:8088';
}
else if (window.location.port === '9101') {
    host = window.location.hostname + ':8080';
} else if (window.location.port === '9091') {
    host = window.location.hostname + ':8088';
}
else {
    // host = '172.18.8.138' + ':' + window.location.port; //  教育局地址 ===ip
    host = window.location.hostname + ':' + window.location.port; //  教育局地址 ===域名
    // host = '192.1.6.48:8080';
    // host = window.location.hostname + ':8080';
}
host += '/EduPhyHea';
// base Url 前端API调用地址
urls.baseApi = protocol + '//' + host;

urls.login = '/SysUser/Login';//登录
urls.getMenuPermision = '/SysFunction/GetFunctionByLogin'; // 获取权限路由

//用户信息
urls.dept_all_list = '/SysDepartment/GetAll';//学校列表

urls.user_list = '/SysUser/GetList';//列表
urls.user_edit = '/SysUser/Update';//修改
urls.user_add = '/SysUser/Add';//新增
urls.user_all = '/SysUser/GetAll';//获取所有

urls.user_update = '/SysUser/Update';//修改
urls.user_status = '/SysUser/Operation';//状态
urls.user_info = '/SysUser/GetById';//根据id获取某一个
urls.user_reset = '/SysUser/ResetPassord';//重置密码
urls.user_dept = '/SysDepartment/GetAll';//获取部门
urls.manage_list = '/Taskmanagement/GetTaskManageAll';//获取任务
urls.ChangePassword = '/SysUser/ChangePassword';//修改密码

//角色信息
urls.role_list = '/SysRole/GetList';//列表
urls.role_all = '/SysRole/GetAll';//获取角色下拉列表
urls.role_child = '/SysRole/GetChild';//获取角色下拉列表 child
urls.role_add = '/SysRole/Add';//新增
urls.role_edit = '/SysRole/Update';//编辑
urls.role_operation = '/SysRole/Operation';//状态
urls.role_function = '/SysFunction/GetList';//获取菜单普通下拉列表
urls.function_all = '/SysFunction/GetAll';//配置权限
urls.add_role_function = '/SysRoleFunction/AddRoleFunction';//
urls.getFunction = '/SysRole/GetFunctions';//配置权限

urls.role_fun = 'SysFunction/GetFunctionByRoleid';



//字典表信息管理
urls.dic_all = '/DictionaryCategory/GetAll';//所有
urls.dictionary_info = '/Dictionary/GetList';//字典表信息列表
urls.dictionary_add = '/Dictionary/Add';//新增
urls.dictionary_edit = '/Dictionary/Update';//修改
urls.dictionary_status = '/Dictionary/Operation';//状态
urls.dictionary_id = '/Dictionary/GetById';//状态
urls.dictionary_tree = '/Dictionary/GetTreeAll';//树

//日志
urls.system_log = '/SysLog/GetList';
urls.system_info = '/SysLog/GetById';

export default urls;
