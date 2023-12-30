<template>
    <list-item :to="{ name: 'Playlist', params: { plf: plf, id: item.id } }">
        <template v-slot:center>
            <span
                class="block truncate font-semibold text-white leading-[1.25rem]"
            >
                {{ info.title }}
            </span>
            <span
                class="block truncate text-white text-opacity-70 leading-4 text-sm mt-1"
                >{{ info.description }}</span
            >
        </template>
    </list-item>
</template>
<script>
import ListItem from "@/components/app/ListItem.vue";
import { computed } from "vue";
import { useSongPlay } from "@/stores/SongPlay";
export default {
    props: {
        item: null,
        plf: {
            type: String,
            default: "yt",
        },
    },
    components: { ListItem },
    setup(props) {
        const storeSongPlay = useSongPlay();
        const info = computed(() => {
            return storeSongPlay.getInfoStandards(
                props.item,
                props.plf,
                "playlist"
            );
        });
        console.log(info);
        return {
            info,
        };
    },
};
</script>
<style lang=""></style>
