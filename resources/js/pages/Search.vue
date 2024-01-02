<template lang="">
    <div></div>
</template>
<script>
import { useRoute } from "vue-router";
import { watch, reactive } from "vue";
export default {
    setup(props) {
        const route = useRoute();
         
        const initData = () => {
            return {
                searchList: [],
                searchListRender: [],
            };
        };
    },
};
</script>
<style lang=""></style>
