import * as constants from '../../../static/js/constants.js'

export const login = {
    url: 'api/example/Authorize',
    type: constants.POST,
    mock: 'mock/js/example/login.js',
    data: {
        model: 'body|object|stringify'
    }
}

export const getUser = {
    url: 'api/example/users/{userId}',
    type: constants.GET,
    mock: true,
    data: {
        userId: 'required|path|string'
    }
}

export const deleteUser = {
    url: 'api/example/users/{userId}',
    type: constants.DELETE,
    data: {
        userId: 'required|path|string'
    }
}

export const updateUser = {
    url: 'api/example/users',
    type: constants.PUT,
    data: {
        userModel: 'body|stringify|object'
    }
}

export const getUserList = {
    url: 'api/example/users/{pageIndex}',
    type: constants.GET,
    mock: 'mock/json/example/user.json',
    data: {
        pageIndex: 'required|path|number',
        pageSize: 'required|query|number',
        sortName: 'query|string',
        sortType: 'query|string',
        keyword: 'query|string',
        isEnabled: 'query|boolean'
    }
}

export const getPositionList = {
    url: 'api/example/positions/{pageIndex}',
    type: constants.GET,
    mock: 'mock/json/example/position.json',
    data: {
        pageIndex: 'required|path|number',
        pageSize: 'required|query|number',
        sortName: 'query|string',
        sortType: 'query|string',
        keyword: 'query|string'
    }
}

export const getEmployeeList = {
    url: 'api/example/employees/{pageIndex}',
    type: constants.GET,
    mock: 'mock/json/example/employee.json',
    data: {
        pageIndex: 'required|path|number',
        pageSize: 'required|query|number',
        sortName: 'query|string',
        sortType: 'query|string',
        keyword: 'query|string'
    }
}

export const getStructuresList = {
    url: 'api/example/structures',
    type: constants.GET,
    data: {
        withDept: 'query|boolean'
    }
}

export const getRoleList = {
    url: '/api/roles/{pageIndex}',
    type: constants.GET,
    data: {
        pageIndex: 'required|path|number',
        pageSize: 'required|query|number',
        sortName: 'query|string',
        sortType: 'query|string',
        keyword: 'query|string'
    }
}
