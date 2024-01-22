<template>
    <div class="flex items-end justify-end" v-if="itsMe">
        <div class="bg-blue-500 p-3 rounded-lg">
            <p class="text-sm text-white">{{ message }}</p>
        </div>
        <img
            :src="avatar"
            alt="Other User Avatar"
            class="w-8 h-8 rounded-full ml-3"
        />
    </div>
    <div class="flex items-start justify-start" v-else>
        <img
            :src="avatar"
            alt="Other User Avatar"
            class="w-8 h-8 rounded-full ml-3"
        />
        <div class="ml-3 bg-gray-100 p-3 rounded-lg">
            <p class="text-sm text-gray-800">
                {{ message }}
            </p>
        </div>
    </div>
</template>
<script>
import { computed } from "vue";
export default {
    props: {
        itsMe: { default: false },
        message: null,
        role: { default: "member" },
    },
    setup(props) {
        const avatar = computed(() => {
            let avatar = "";
            switch (props.role) {
                case "owner":
                    avatar =
                        "https://res.cloudinary.com/vanh-tech/image/upload/v1705961446/dvanhsound/images/chat/user-crown_aifu5x.png";
                    break;

                case "dj":
                    avatar =
                        "https://res.cloudinary.com/vanh-tech/image/upload/v1705961446/dvanhsound/images/chat/user-dj_wlpht4.png";
                    break;

                default:
                    avatar =
                        "https://res.cloudinary.com/vanh-tech/image/upload/v1705961446/dvanhsound/images/chat/user-def_cr8ksz.png";
                    break;
            }
            return avatar;
        });
        return {
            avatar,
        };
    },
};
</script>
<style></style>
