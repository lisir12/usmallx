<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
import { reqRoleAdd, reqRoleListOne, reqRoleEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  components: {},
  props: ["info"],
  data() {
    return {
      width: "160px",
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
      requestRoleList: "role/requestRoleList",
    }),
    //重置
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      }
      this.form.menus =  this.$refs.tree.setCheckedKeys([])
    },
    hide(){
        this.info.isShow = false
    },
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // console.log(this.$refs.tree.getCheckedKeys())

      reqRoleAdd(this.form).then((res) => {
        this.empty()
        this.hide()
      });
      this.requestRoleList();
    },
    //获取一条数据
    look(id) {
      reqRoleListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.menus = this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
        this.form.id = id;
      }) 
    },
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleEdit(this.form).then((res) => {
        this.requestRoleList();
        this.hide()
      });
    },
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.requestMenuList();
    }
  },
};
</script>

<style scoped>
</style>