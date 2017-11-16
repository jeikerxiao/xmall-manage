<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input v-model="inputSearch" placeholder="请输入订单编号"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="searchBtn()">搜索</el-button>
                </el-col>
            </el-row>
            <div class="top20"></div>
            <el-table
                :data="tableData"
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                style="width: 100%">
                <el-table-column type="expand">

                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="收货人">
                                <span>{{ props.row.shippingVo.receiverName }}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{ props.row.shippingVo.receiverMobile }}</span>
                            </el-form-item>
                            <el-form-item label="收货城市">
                                <span>{{ props.row.shippingVo.receiverCity }}</span>
                            </el-form-item>
                            <el-form-item label="收货邮编">
                                <span>{{ props.row.shippingVo.receiverZip }}</span>
                            </el-form-item>
                            <el-form-item label="收货地址">
                                <span>{{ props.row.shippingVo.receiverAddress }}</span>
                            </el-form-item>
                        </el-form>
                    </template>

                </el-table-column>
                <el-table-column
                    label="订单 ID"
                    prop="orderNo">
                </el-table-column>
                <el-table-column
                    label="总价格"
                    prop="payment">
                </el-table-column>
                <el-table-column
                    label="订单状态"
                    prop="statusDesc">
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
    import { orderList, orderSearch } from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [
                    {
                        "orderNo": 1492091141269,
                        "payment": 22894,
                        "paymentType": 1,
                        "paymentTypeDesc": "在线支付",
                        "postage": 0,
                        "status": 20,
                        "statusDesc": "已付款",
                        "paymentTime": "2017-04-13 21:46:06",
                        "sendTime": "",
                        "endTime": "",
                        "closeTime": "",
                        "createTime": "2017-04-13 21:45:41",
                        "shippingId": 29,
                        "receiverName": "吉利",
                        "shippingVo": {
                            "receiverName": "吉利",
                            "receiverPhone": null,
                            "receiverMobile": "13800138000",
                            "receiverProvince": "北京",
                            "receiverCity": "北京",
                            "receiverDistrict": "海淀区",
                            "receiverAddress": "海淀区中关村",
                            "receiverZip": "100000"
                        }
                    }
                ],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                restaurant_id: null,
                expendRow: [],
                inputSearch: '',
            }
        },
        components: {
            headTop,
        },
        created(){
//            this.restaurant_id = this.$route.query.restaurant_id;
            this.initData();
        },
        mounted(){

        },
        methods: {
            async initData(){
                try {
                    this.getOrders();
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
                this.getOrders()
            },
            async getOrders(){
                const Result = await orderList({
                    pageNum: this.offset,
                    pageSize: this.limit
                });
                this.tableData = [];
                console.log("==> getOrders {}", Result.data)
                this.tableData = [];
                if (Result.status === 0) {
//                    this.tableData = Result.data.list;
                    Result.data.list.forEach(item => {
                        const tableData = {};
                        tableData.orderNo = item.orderNo;
                        tableData.payment = '￥' + item.payment;
                        tableData.statusDesc = item.statusDesc;
                        tableData.shippingVo = item.shippingVo;
                        this.tableData.push(tableData);
                    })
                    this.count = this.tableData.length;
                } else {
                    throw new Error('getOrders 获取数据失败');
                }
            },
            async expand(row, status){
//                if (status) {
//                    const restaurant = await getResturantDetail(row.restaurant_id);
//                    const userInfo = await getUserInfo(row.user_id);
//                    const addressInfo = await getAddressById(row.address_id);
//
//                    this.tableData.splice(row.index, 1, {
//                        ...row, ...{
//                            restaurant_name: restaurant.name,
//                            restaurant_address: restaurant.address,
//                            address: addressInfo.address,
//                            user_name: userInfo.username
//                        }
//                    });
//                    this.$nextTick(() => {
//                        this.expendRow.push(row.index);
//                    })
//                } else {
//                    const index = this.expendRow.indexOf(row.index);
//                    this.expendRow.splice(index, 1)
//                }
            },
            searchBtn(){
                console.log(this.inputSearch)
                this.orderSearch()
            },
            async orderSearch(){
                const Result = await orderSearch({
                    id : this.inputSearch,
                    pageNum: this.offset,
                    pageSize: this.limit,
                });
                this.tableData = [];
                if (Result.status === 0) {
                    Result.data.list.forEach(item => {
                        const tableData = {};
                        tableData.orderNo = item.orderNo;
                        tableData.payment = '￥' + item.payment;
                        tableData.statusDesc = item.statusDesc;
                        tableData.shippingVo = item.shippingVo;
                        this.tableData.push(tableData);
                    })
                    this.count = this.tableData.length;
                } else {
                    throw new Error('getProducts 获取数据失败');
                }
            },
        },
    }
</script>

<style lang="less">
    @import '../../style/mixin';

    .table_container {
        padding: 20px;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
