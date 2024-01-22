<template>
    <div class="flex flex-col justify-start items-start mx-2">
        <v-list density="compact">
            <text-header
                content="Chủ phòng"
                class="text-uppercase text-base"
            ></text-header>
            <AvatarText
                icon="mdi-shield-crown"
                :name="room.owner.name"
                :isLoaded="isLoadedRoom"
                :sizeImage="40"
                class="ml-2"
                v-if="isLoadedRoom"
            />
        </v-list>
        <!-- <v-divider class="w-full" :thickness="2"></v-divider> -->
        <v-list density="compact" v-if="roomDj">
            <text-header
                content="DJ"
                class="text-uppercase text-base"
            ></text-header>
            <div v-if="isLoadedRoom">
                <AvatarText
                    v-for="dj in listDj"
                    :key="'dj-' + dj.id"
                    icon="mdi-shield-crown"
                    :name="dj.name"
                    :isLoaded="true"
                    :sizeImage="40"
                    class="ml-2"
                />
            </div>
        </v-list>
        <v-divider class="w-full" :thickness="2" v-if="roomDj"></v-divider>
        <v-list
            density="compact"
            class="flex-1 h-full overflow-x-hidden overflow-y-auto w-full"
        >
            <text-header
                content="Thành viên"
                class="text-uppercase text-base"
            ></text-header>
            <div v-if="isLoadedRoom">
                <AvatarText
                    v-for="member in usersRoom"
                    :key="'user-' + member.user.id"
                    icon="mdi-account"
                    :name="member.user.name"
                    :isLoaded="true"
                    :sizeImage="40"
                    class="mx-2 my-2"
                />
            </div>
        </v-list>
    </div>
</template>
<script>
import { useMusicRoom } from "@/stores/MusicRoom";
import { storeToRefs } from "pinia";
import AvatarText from "@/components/app/AvatarText.vue";
import TextHeader from "@/components/ui/TextHeader.vue";
export default {
    components: { AvatarText, TextHeader },
    setup(props) {
        const roomMusic = useMusicRoom();
        const { room, usersRoom, isLoadedRoom, roomDj, listDj } =
            storeToRefs(roomMusic);
        return {
            room,
            usersRoom,
            isLoadedRoom,
            roomDj,
            listDj,
        };
    },
};
</script>
<style lang=""></style>
