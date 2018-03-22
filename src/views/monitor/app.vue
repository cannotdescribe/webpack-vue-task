<template>
    <el-container>
        <el-header>
            <!--<Nav></Nav>-->
        </el-header>
        <el-container>
            <el-aside width="200px">
                <!--<LeftTree></LeftTree>-->
            </el-aside>
            <el-container>
                <el-main>Main</el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import "../../assets/style/main.styl"
    import Nav from "../../components/nav.vue"
    import LeftTree from "./leftTree.vue"

    export default {
        components: {
            Nav,
            LeftTree,
        }
    }
</script>

<style>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>