<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 库位维护
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-select v-model="query.address" placeholder="库区代码" class="handle-select mr10">
                    <el-option key="1" label="111" value="1111"></el-option>
                    <el-option key="2" label="222" value="2222"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>

              <el-button type="primary"  icon="el-icon-circle-plus"
                         @click="dialogFormVisible = true">新建</el-button>
              <el-button
                  type="primary"
                  icon="el-icon-delete"
                  class="handle-del mr10"
                  @click="delAllSelection"
              >删除</el-button>
              <!--- 表单弹出 start--->
              <el-dialog title="库区维护" :visible.sync="dialogFormVisible" width="820px">
                <el-form :model="form" :label-position="left" label-width="150px" :inline="true">
                  <el-form-item label="库区代码">
                    <el-input v-model="form.ZoneCode"></el-input>
                  </el-form-item>
                  <el-form-item label="当库存小于或等于">
                    <el-input v-model="form.Qtycc"></el-input>
                  </el-form-item>
                  <el-form-item label="名称">
                    <el-input v-model="form.ZoneName"></el-input>
                  </el-form-item>
                  <el-checkbox v-model="ReplenishmentFlag">拣货时自动补货 </el-checkbox>
                  <el-form-item label="注释">
                    <el-input v-model="form.Notes"></el-input>
                  </el-form-item>
                  <el-form-item label="RF拣货中的数量确认" >
                    <el-select v-model="form.Pickcc" placeholder="请选择" style="width: 92%;">
                      <el-option label="允许" value="0"></el-option>
                      <el-option label="不允许" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="物理类型" label-width="135px">
                    <el-select v-model="form.Locationcategory" placeholder="请选择" style="width: 95%;margin-left: 5%">
                      <el-option label="其他" value="0"></el-option>
                      <el-option label="货架" value="1"></el-option>
                      <el-option label="高架" value="2"></el-option>
                      <el-option label="堆垛" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="补货级别" >
                    <el-select v-model="form.ReplenishmentHotlevel" placeholder="请选择" style="width: 92%;">
                      <el-option label="其他" value="0"></el-option>
                      <el-option label="货架" value="1"></el-option>
                      <el-option label="高架" value="2"></el-option>
                      <el-option label="堆垛" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="库区类型" label-width="135px">
                    <el-select v-model="form.RegionType" placeholder="请选择" style="width: 95%;margin-left: 5%">
                      <el-option label="其他" value="0"></el-option>
                      <el-option label="货架" value="1"></el-option>
                      <el-option label="高架" value="2"></el-option>
                      <el-option label="堆垛" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="用户自定义字段1">
                    <el-input v-model="form.Susr1"></el-input>
                  </el-form-item>
                  <el-form-item label="托盘上限/每种物料">
                    <el-input v-model="form.Maxpalletspermtl"></el-input>
                  </el-form-item>
                  <el-form-item label="用户自定义字段2">
                    <el-input v-model="form.Susr2"></el-input>
                  </el-form-item>
                  <el-form-item label="上架验证" label-width="135px">
                    <el-select v-model="form.Posvermethod" placeholder="请选择" style="width: 95%;margin-left: 5%">
                      <el-option label="无验证" value="0"></el-option>
                      <el-option label="校验码验证" value="1"></el-option>
                      <el-option label="库位验证" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="用户自定义字段3">
                    <el-input v-model="form.Susr3"></el-input>
                  </el-form-item>
                  <el-checkbox v-model="CleanLocation" style="margin-left: 15%">是否优先拣货 </el-checkbox>
                  <el-form-item label="用户自定义字段4" style="margin-left: 17%">
                    <el-input v-model="form.Susr4"></el-input>
                  </el-form-item>
                  <el-form-item label="缺省至库位">
                    <el-input v-model="form.Picktoloc"></el-input>
                  </el-form-item>
                  <el-form-item label="用户自定义字段5" >
                    <el-input v-model="form.Susr5"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="doSave()">确 定</el-button>
                </div>
              </el-dialog>
              <!--- 表单弹出 start--->

            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center" v-if="false"
                ></el-table-column>
                <el-table-column prop="WhCode" align="center" label="仓库编码"></el-table-column>
                <el-table-column prop="ZoneCode" align="center" label="库区代码"></el-table-column>
                <el-table-column prop="ZoneName" align="center" label="名称"></el-table-column>
                <el-table-column prop="RegionType" align="center" label="库区类型"></el-table-column>
                <el-table-column prop="Locationcategory" align="center" label="物理类型"></el-table-column>
                <el-table-column prop="Picktoloc" align="center" width="150" label="缺省拣货至库位"></el-table-column>
                <el-table-column prop="Posvermethod" label="上架验证方法"></el-table-column>


                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import $api from "@/api/index";
import {parseList} from "@/utils/qmListDeal";

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            idx: -1,
            id: -1,
            dialogFormVisible: false,
            fieldNames:["PKey","WhCode","ZoneCode","ZoneName","RegionType","Locationcategory","Picktoloc","Posvermethod"],
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
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
          let pageStart = (this.query.pageIndex - 1) * this.query.pageSize;
          let pageEnd = this.query.pageIndex* this.query.pageSize-1;
          $api.base.searchZoneList(
              {
                serviceName: "FusionTableService",
                methodName: "doPaging",
                client: "800",
                userName: this.$store.getters["user/userInfo"].userName,
                language: "zh_CN",
                guid: "9f16a6b3-f7a8-49b6-ab1b-94becd342144",
                tran: "bas202",
                backendVersion: "",
                sessionID:this.$store.getters["user/token"],
                paraValues: {
                  conditions:{
                    bind: [],
                    group: [],
                    orderby: [],
                    condition:[{key: "WhCode", value: "= '"+this.$store.getters["user/defaultWhCode"]+"'"}],
                  },
                  fieldNames:"PKey,WhCode,ZoneCode,ZoneName,RegionType,Locationcategory,Picktoloc,Posvermethod",
                  /**分页传入后台参数 ***/
                  range: `${pageStart},${pageEnd}`,
                  serviceName: "entity:BASZone"
                }
              }
          ).then(res => {
                this.tableData = parseList(res.result.resultObj.datas,this.fieldNames);
                this.pageTotal = res.result.resultObj.currentCount || 50;
          });
        },

       doSave(){
          debugger;
         $api.base.zoneSave(
             {
               serviceName: "Bas202Service",
               methodName: "doSave",
               client: "800",
               userName: this.$store.getters["user/userInfo"].userName,
               language: "zh_CN",
               guid: "9f16a6b3-f7a8-49b6-ab1b-94becd342144",
               tran: "bas202",
               backendVersion: "",
               loginTime: 1625202810099,
               sessionID:this.$store.getters["user/token"],
               paraValues: {
                 CleanLocation: "0",
                 CreateBy: "",
                 Locationcategory: "OTHER",
                 Maxpalletspermtl: "0",
                 Notes: "",
                 PKey: "",
                 Pickcc: "0",
                 Picktoloc: "PICKTO",
                 Posvermethod: "NONE",
                 Qtycc: "0",
                 RegionType: "STOCK",
                 ReplenishmentFlag: "0",
                 ReplenishmentHotlevel: "6",
                 Susr1: "",
                 Susr2: "",
                 Susr3: "",
                 Susr4: "",
                 Susr5: "",
                 WhCode: "PS",
                 ZoneCode: "1231",
                 ZoneName: "1231123"
               }
             }
         ).then(res => {
           debugger
           console.log(res);
           this.tableData = res.list;
           this.pageTotal = res.pageTotal || 50;
         });
       },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
