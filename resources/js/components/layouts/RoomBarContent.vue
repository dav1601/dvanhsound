<template>
    <div class="w-full h-full justify-between items-center flex px-5">
        <div class="flex-1">
            <AvatarText
                v-if="isLoadedRoom"
                :isLoaded="true"
                :name="room.title"
                :desc="room.description"
                :src="
                    room.image
                        ? room.image
                        : 'https://res.cloudinary.com/vanh-tech/image/upload/v1704983327/dvanhsound/images/togethertogether_eral5g.jpg'
                "
            />
            <AvatarText v-else :isLoaded="false" />
        </div>
        <div class="actions">
            <v-btn prepend-icon="mdi-plus" class="bg-primary-600">
                <template v-slot:prepend>
                    <v-icon color="white"></v-icon>
                </template>

                <span class="mt-1"> bài hát</span>
            </v-btn>
            <v-btn prepend-icon="mdi-plus" class="bg-primary-600 ml-5">
                <template v-slot:prepend>
                    <v-icon color="white"></v-icon>
                </template>

                <span class="mt-1"> Thành viên</span>
            </v-btn>
        </div>
    </div>
</template>
<script>
import AvatarText from "@/components/app/AvatarText.vue";
import { useMusicRoom } from "@/stores/MusicRoom";
import { storeToRefs } from "pinia";
export default {
    components: { AvatarText },
    setup(props) {
        const roomMuisc = useMusicRoom();
        const { isLoadedRoom, room } = storeToRefs(roomMuisc);

        return {
            isLoadedRoom,
            room,
        };
    },
};
</script>
<style></style>
