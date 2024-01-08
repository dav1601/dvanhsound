<template>
    <div
        class="bg-[#282828cc] lg:flex hidden mr-8 justify-start items-center w-[480px] ml-8 relative border-solid border border-[rgba(255 , 255 ,255 , 0.15)] h-[40px] rounded-lg p-3 text-[#595656]"
        v-if="show"
        id="dvs-search-box"
    >
        <v-icon icon="mdi-magnify mr-2"></v-icon>
        <input
            type="text"
            class="flex-1 text-sm font-semibold text-zinc-300 focus:!text-white"
            placeholder="Tìm bài hát, nghệ sĩ, podcast..."
            v-model="kw"
        />
    </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { debounce } from "lodash";
import { useSongPlay } from "@/stores/SongPlay";

export default {
    props: {
        show: {
            default: true,
        },
    },
    setup(props) {
        const storeSong = useSongPlay();
        const route = useRoute();
        const nameRoute = ref(route.name);
        const router = useRouter();
        const kw = ref(route.params.kw);
        const search = debounce((newKw) => {
            storeSong.search(newKw);
        }, 300);

        watch(
            () => route.params.kw,
            (newVal) => {
                console.log(newVal);
                if (route.name === "Search") kw.value = newVal;
            }
        );
        watch(
            () => kw.value,
            (newVal) => {
                if (newVal) {
                    search(newVal);
                    if (route.name === "Search") {
                        router.replace({
                            name: "Search",
                            params: { kw: newVal },
                        });
                    } else {
                        router.push({ name: "Search", params: { kw: newVal } });
                    }
                }
            }
        );
        watch(
            () => route.name,
            (newVal) => {
                if (newVal !== "Search") {
                    kw.value = "";
                }
            }
        );
        return {
            kw,
            nameRoute,
        };
    },
};
</script>
<style lang=""></style>
