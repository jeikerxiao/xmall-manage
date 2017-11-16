<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-row>
                <el-col :span="4">
                    <el-button type="primary">新增类别</el-button>
                </el-col>
            </el-row>
            <div class="top20"></div>
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="id"
                  label="类别ID"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="name"
                  label="类别名称"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="createTime"
                  label="创建时间">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
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
    import headTop from '@/components/headTop'
    import dtime from 'time-formater'
    import { categorySelect } from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [
                    {
                        "id": 100001,
                        "parentId": 0,
                        "name": "家用电器",
                        "status": true,
                        "sortOrder": null,
                        "createTime": 1490431560000,
                        "updateTime": 1490431560000
                    },
                    {
                        "id": 100002,
                        "parentId": 0,
                        "name": "数码3C",
                        "status": true,
                        "sortOrder": null,
                        "createTime": 1490431581000,
                        "updateTime": 1490431581000
                    }
                ],
                currentRow: null,
                offset: 1,
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
                try{
//                    const countData = await getUserCount();
//                    if (countData.status == 1) {
//                        this.count = countData.count;
//                    }else{
//                        throw new Error('获取数据失败');
//                    }
                    this.getCategory();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
//                this.getUsers()
            },
            async getCategory(){
                // 获取产品列表接口
                const Result = await categorySelect({ id: 0 });
                console.log("==> getCategory {}", Result.data)
                this.tableData = [];
                if (Result.status === 0) {
//                    this.tableData = Result.data;
                    Result.data.forEach(item => {
                        const tableData = {};
                        tableData.id = item.id;
                        tableData.name = item.name;
                        tableData.createTime = dtime(item.createTime).format('YYYY-MM-DD HH:MM:SS');
                        this.tableData.push(tableData);
                    })
                    this.count = this.tableData.length;
                } else {
                    throw new Error('getCategory 获取数据失败');
                }

            },
            handleClick(row) {
                console.log(row);
            },
        },
    }
</script>

<style lang="less">
	@import '../../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
