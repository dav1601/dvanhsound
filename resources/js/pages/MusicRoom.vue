<template>
    <div class="content-spacing"></div>
</template>
<script>
import { useRoute } from "vue-router";
import {
    reactive,
    computed,
    toRef,
    onMounted,
    watch,
    onBeforeUnmount,
} from "vue";
import { useUsers } from "@/stores/Users";
import { useAuthStore } from "@/stores/AuthStore";
import { useResponsive } from "@/stores/Responsive";
import { useSongPlay } from "@/stores/SongPlay";
import { storeToRefs } from "pinia";
import { useMusicRoom } from "@/stores/MusicRoom";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import Echo from "laravel-echo";
const usersRepo = RepositoryFactory.get("user");
export default {
    setup(props) {
        const auth = useAuthStore();
        const songPlay = useSongPlay();
        const musicRoom = useMusicRoom();
        const route = useRoute();
        const initData = () => {
            return {
                channel: null,
            };
        };
        const stateReactive = reactive({ ...initData() });
        //
        onBeforeUnmount(() => {
            window.Echo.leave(`room.music.` + musicRoom.room.id);
            musicRoom.resetRoom();
        });
        //
        const uuid = computed(() => {
            return route.params.id;
        });
        const initStream = () => {
            stateReactive.channel = window.Echo.join(
                `room.music.` + musicRoom.room.id
            )
                .here((users) => {
                    musicRoom.usersOnline = users;
                })
                .joining((user) => {
                    musicRoom.addUserOnline(user);
                    console.log({ userJoin: user });
                })
                .leaving((user) => {
                    musicRoom.removeUserOnline(user);
                    console.log({ userLeave: user });
                });
        };
        usersRepo.loadRoom(uuid.value).then((res) => {
            const { data } = res.data;
            musicRoom.setRoom(data);
            initStream();
        });
    },
};
</script>
<style lang=""></style>
