<template>
    <div class="flex justify-start items-center flex-shrink-1">
        <v-btn
            size="small"
            v-for="(item, index) in state.listPlf"
            :key="item"
            :type="index"
            class="vtf-def mx-1"
            @click="clickEvent(index)"
            :class="{ active: state.activePlf === index }"
            >{{ item }}</v-btn
        >
    </div>
</template>
<script>
import { toRef, reactive } from "vue";
export default {
    setup(props, ctx) {
        const initData = () => {
            return {
                activePlf: "all",
                listPlf: {
                    all: "All",
                    yt: "Yt Music",
                    st: "Spotify",
                    dvs: "Dvanhsound",
                },
                dialogSync: false,
            };
        };

        const stateReactive = reactive({ ...initData() });
        const clickEvent = (index) => {
            stateReactive.activePlf = index;
            return ctx.emit("change-plf", `${index}`);
        };
        return {
            clickEvent,
            state: toRef(stateReactive),
        };
    },
};
</script>
<style scoped lang="scss">
.vtf-def.active {
    background: white !important;
    color: $dvs-black;
    transition: background 0.25s ease-in-out;
}
</style>
