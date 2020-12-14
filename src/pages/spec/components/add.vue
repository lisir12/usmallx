<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
       
        <el-form-item label="规格属性" :label-width="width" v-for="(item,index) in arrAttr" :key="index">
          <el-row>
            <el-col :span='16'><el-input v-model="item.value" autocomplete="off"></el-input></el-col>
            <el-col :span='4'>
              <el-button type='primary' v-if="index==0" @click="addAttr">新增规格属性</el-button>
              <el-button type='danger' v-else @click="delAttr(index)">删除</el-button>
            </el-col>
          </el-row>        
        </el-form-item>
       

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqspecsAdd, reqspecsListOne, reqspecsEdit } from "../../../util/request"
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  components: {},
  props: ["info"],
  data() {
    return {
      width:'160px',
      arrAttr:[
        {value:''}
      ], 
      form: {
        specsname: "",
        attrs:'',
        status: 1,
      },
    };
  },
  methods: {
    addAttr(){
      this.arrAttr.push({
        value:''
      })
    },
    delAttr(index){
      this.arrAttr.splice(index,1)
    },
    ...mapActions({
        requestspecsList: "specs/requestspecsList",
    }),
    //重置
    empty() {
      this.form = {
        specsname: "",
        attrs:'',
        status: 1,
      };
    },
    hide() {
      this.info.isShow = false;
    },
    add() {
      this.form.attrs = JSON.stringify(this.arrAttr.map(item=>{return item.value}))
      reqspecsAdd(this.form).then((res) => {
        this.empty()
        this.hide()
        this.requestspecsList(); 
      });
      
    },
    //获取一条数据
    look(id) {
      reqspecsListOne({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.form.id = id;
        // console.log(this.form);
        this.arrAttr = JSON.parse(this.form.attrs).map(item=>{return {value:item}})
      })
    },
    update() {
      this.form.attrs = JSON.stringify(this.arrAttr.map(item=>{return item.value}))
      reqspecsEdit(this.form).then((res) => {
        this.requestspecsList();
        this.hide()
      });
    },
  },
  mounted() {
    
      this.requestspecsList();
   
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>