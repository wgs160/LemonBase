<template>
    <div class="bs_block">
        <p class="h2">表格</p>
        <p>排序，分页</p>
        <table class="table table-striped table-bordered">
            <thead>
            <tr>
                <th @click="sort('no')" >商品编号</th>
                <th>商品名称</th>
                <th  @click="sort('price')">价格</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>

            <template v-for="good in goods | orderBy sortparam order">
                <tr v-show="$index | isShowLine curPage maxLen">
                    <td>{{good.no}}</th>
                    <td>{{good.name}}</td>
                    <td>{{good.price}}</td>
                    <td><a @click="remove(good)" href="javascript:void 0" class="btn btn-danger">删除</a></td>
                </tr>
            </template>

            </tbody>
        </table>
        <nav>
            <ul class="pagination">
                <template v-for="page in pageLen">
                    <li :class="{'active': curPage == page }"><a  @click="pageGo(page)" href="javascript:void  0">{{page}}</a></li>
                </template>
            </ul>
        </nav>
    </div>
</template>

<script>

    var list_data = require("../data/goods.json");

    module.exports = {
        data: function () {
            return {
                sortparam:'',
                order:1,
                curPage:1,
                maxLen:4,
                goods:list_data.goods
            }
        },
        methods:{
            remove: function (good) {
                this.goods.$remove(good);
            },
            sort: function (param) {
                this.order = this.order * -1;
                this.sortparam = param;
            },
            pageGo: function (page) {
                this.curPage = page;
            }
        },
        computed:{
            pageLen: function () {
                var pageNum = Math.ceil(this.goods.length/this.maxLen);
                var array = [];
                for (var i = 0; i < pageNum; i++) {
                    array.push(i+1);
                }
                return array;
            }
        }
    }
</script>