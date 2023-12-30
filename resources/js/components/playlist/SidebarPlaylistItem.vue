<template>
    <list-item
        :isActive="active"
        :to="{ name: 'Playlist', params: { plf: plf, id: item.id } }"
        class="mr-2"
    >
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
import { useRoute } from "vue-router";
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
        const route = useRoute();
        const info = computed(() => {
            return storeSongPlay.getInfoStandards(
                props.item,
                props.plf,
                "playlist"
            );
        });
        const active = computed(() => {
            if (route.name !== "Playlist") return false;
            return route.params.id === info.value.id;
        });
        console.log(info);
        return {
            info,
            active,
        };
    },
};
</script>
<style lang=""></style>
