<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-row>
                <el-col :span="4">
                    <el-button type="primary" @click="dialogFormVisible = true">新增产品</el-button>
                </el-col>
            </el-row>
            <div class="top20"></div>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input v-model="inputSearch" placeholder="请输入产品编号"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="searchBtn()">搜索</el-button>
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
                    property="name"
                    label="名称"
                    width="600">
                </el-table-column>
                <el-table-column
                    property="subtitle"
                    label="子名称"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="price"
                    label="价格">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
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
            <!-- dialog -->
            <el-dialog title="新增产品" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="产品名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="产品子名称" :label-width="formLabelWidth">
                        <el-input v-model="form.subtitle" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="产品价格" :label-width="formLabelWidth">
                        <el-input v-model="form.price" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="产品类别" :label-width="formLabelWidth">
                        <el-select v-model="form.categoryId" placeholder="请选择产品类别">
                            <el-option label="类别1" value="10001"></el-option>
                            <el-option label="类别2" value="10002"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品库存" :label-width="formLabelWidth">
                        <el-input v-model="form.stock" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="产品描述" :label-width="formLabelWidth">
                        <el-input v-model="form.detail" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import {productList, productSearch} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [
                    {
                        "id": 26,
                        "categoryId": 100002,
                        "name": "Apple iPhone 7 Plus (A1661) 128G 玫瑰金色 移动联通电信4G手机",
                        "subtitle": "iPhone 7，现更以红色呈现。",
                        "mainImage": "241997c4-9e62-4824-b7f0-7425c3c28917.jpeg",
                        "price": 6999,
                        "status": 1,
                        "imageHost": "http://img.happymmall.com/"
                    },
                    {
                        "id": 29,
                        "categoryId": 100008,
                        "name": "Haier/海尔HJ100-1HU1 10公斤滚筒洗衣机全自动带烘干家用大容量 洗烘一体",
                        "subtitle": "门店机型 德邦送货",
                        "mainImage": "173335a4-5dce-4afd-9f18-a10623724c4e.jpeg",
                        "price": 4299,
                        "status": 1,
                        "imageHost": "http://img.happymmall.com/"
                    }
                ],
                currentRow: null,
                offset: 1,
                limit: 20,
                count: 0,
                currentPage: 1,

                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',

                inputSearch: '',
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
//                    const countData = await getUserCount();
//                    if (countData.status == 1) {
//                        this.count = countData.count;
//                    }else{
//                        throw new Error('获取数据失败');
//                    }
                    this.getProducts();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            async getProducts(){
                // 获取产品列表接口
                const Result = await productList({pageNum: this.offset, pageSize: this.limit});
                console.log("==> getProducts {}", Result.data)
                this.tableData = [];
                if (Result.status === 0) {
//                    this.tableData = Result.data.list;
                    Result.data.list.forEach(item => {
                        const tableData = {};
                        tableData.name = item.name;
                        tableData.subtitle = item.subtitle;
                        tableData.price = '￥' + item.price;
                        this.tableData.push(tableData);
                    })
                    this.count = Result.data.size;
                } else {
                    throw new Error('getProducts 获取数据失败');
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
            handleClick(row) {
                console.log(row);
            },
            async productSearch(){
                const Result = await productSearch({
                    id : this.inputSearch,
                    pageNum: this.offset,
                    pageSize: this.limit,
                });
                this.tableData = [];
                if (Result.status === 0) {
//                    this.tableData = Result.data.list;
                    Result.data.list.forEach(item => {
                        const tableData = {};
                        tableData.name = item.name;
                        tableData.subtitle = item.subtitle;
                        tableData.price = '￥' + item.price;
                        this.tableData.push(tableData);
                    })
                    this.count = Result.data.size;
                } else {
                    throw new Error('getProducts 获取数据失败');
                }
            },
            searchBtn() {
                console.log(this.inputSearch);
                this.productSearch();
            },


        },
    }
</script>

<style lang="less">
    @import '../../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>
