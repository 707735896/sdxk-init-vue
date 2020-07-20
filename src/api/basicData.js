import $axios from '@/service/BaseServive';

import urls from '@/service/Urls';

export function getAllDep(flag) { /// =========== 学校列表
    let data = {};
    if (!flag) {
        data.dep_id = sessionStorage.getItem('dep_id')
    }
    return $axios({
        url: urls.dept_all_list,
        data: data
    })
}

export function getAllSchool(flag) { /// =========== 学校列表
    let data = {};
    if (!flag) {
        data.dep_id = sessionStorage.getItem('dep_id');
        data.type = 2;
        data.status = 1;
    }
    return $axios({
        url: urls.dept_all_list,
        data: data
    })
}

export function area_all_list() {
    return $axios({ // 区域1
        url: urls.area_all_list,
        data: {}
    })
}

export function getFitStudentList(id) {
    return $axios({
        url: urls.proofreading_info,
        data: {
            id: id
        }
    })
}

export function getTempStudentList(id) {
    return $axios({
        url: urls.temporary_info,
        data: {
            id: id
        }
    })
}

export function getAllGrade() {
    return $axios({
        url: urls.get_all_grade
    })
}
