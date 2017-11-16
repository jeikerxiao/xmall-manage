<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="100">
                </el-table-column>
                <el-table-column
                    property="createTime"
                    label="注册日期"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="username"
                    label="用户姓名"
                    width="200">
                </el-table-column>
                <el-table-column
                    property="phone"
                    label="手机"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="role"
                    label="角色"
                    width="120">
                </el-table-column>
                <el-table-column
                    property="email"
                    label="邮箱"
                    width="220">
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import dtime from 'time-formater'
    import {userList} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [
                    {
                        "id": 1,
                        "username": "admin",
                        "email": "admin@happymmall.com",
                        "phone": "13800138000",
                        "role": 1,
                        "createTime": 1478422605000,
                        "updateTime": 1510551455000
                    }
                ],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
        components: {
            headTop,
        },
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try {
                    this.getUsers();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getUsers()
            },
            async getUsers(){
                const Users = await userList();
                this.tableData = [];
                Users.data.forEach(item => {
                    const tableData = {};
                    tableData.username = item.username;
                    tableData.phone = item.phone;
                    tableData.email = item.email;
                    tableData.role = item.role;
                    tableData.createTime = dtime(item.createTime).format('YYYY-MM-DD HH:MM:SS');
                    this.tableData.push(tableData);
                })
            }
        },
    }
</script>

<style lang="less">
    @import '../../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>
