<template>
    <div
        class="card-song w-[183px] p-[12.99999px] h-[260px] rounded-[5.152px] bg-[#161616] cursor-pointer hover:bg-[#282828] transition-all relative"
        @mouseenter="hoverIn"
        @mouseleave="hoverOut"
    >
        <v-btn
            icon="mdi-play"
            class="bg-[#1db954] text-black absolute right-[26px] bottom-[106px] z-10 hidden card-song-play animate__animated"
        ></v-btn>
        <v-img
            :src="item.snippet.thumbnails.medium.url"
            height="150"
            width="150"
            class="rounded-[5.152px]"
            cover
            v-if="isLoaded"
        ></v-img>
        <v-skeleton-loader
            v-else
            class="rounded-[5.152px]"
            height="150"
            width="150"
            type="image"
        ></v-skeleton-loader>
        <span
            truncate
            class="card-song-title text-white truncate font-bold mt-[17.17px] mb-[12.88px] leading-4 d-block"
            v-if="isLoaded"
        >
            <v-tooltip activator="parent" location="bottom start">{{ item.snippet.title }}</v-tooltip>
            {{ item.snippet.title }}
        </span>
        <v-skeleton-loader
            v-else
            width="100%"
            type="heading"
        ></v-skeleton-loader>
        <span
            class="card-song-desc line-clamp-2 text-[#B3B3B3] text-[14px]"
            v-if="isLoaded"
            >{{ item.snippet.channelTitle }}
        </span>
        <v-skeleton-loader v-else type="text"></v-skeleton-loader>
    </div>
</template>
<script>
import "animate.css";
export default {
    props: ["item", "isLoaded"],
    setup(props) {
        // SECTION Lifecycle Hooks //////////////////////////////////////////////////////

        // !SECTION End Lifecycle Hooks //////////////////////////////////////////////////////

        // SECTION Store //////////////////////////////////////////////////////

        // !SECTION End Store //////////////////////////////////////////////////////

        // SECTION State //////////////////////////////////////////////////////

        // !SECTION End State //////////////////////////////////////////////////////

        // SECTION Computed //////////////////////////////////////////////////////

        // !SECTION End Computed //////////////////////////////////////////////////////

        // SECTION Methods //////////////////////////////////////////////////////
        const hoverIn = (e) => {
            const el = e.target;
            const playBtn = el.querySelector(".card-song-play");
            if (playBtn) {
                playBtn.classList.remove("animate__fadeOutDown");
                playBtn.classList.add("animate__fadeInUp");
                playBtn.classList.remove("hidden");
            }
        };
        const hoverOut = (e) => {
            const el = e.target;
            const playBtn = el.querySelector(".card-song-play");
            if (playBtn) {
                playBtn.classList.remove("animate__fadeInUp");
                playBtn.classList.add("animate__fadeOutDown");
            }
        };
        // !SECTION End Methods //////////////////////////////////////////////////////

        // SECTION Watch //////////////////////////////////////////////////////

        // !SECTION End Watch //////////////////////////////////////////////////////

        // SECTION return //////////////////////////////////////////////////////
        return {
            hoverIn,
            hoverOut,
        };
    },
};
</script>
<style lang="scss">
.cart-song {
    &:hover {
        &-play {
            display: block !important;
        }
    }
}
</style>