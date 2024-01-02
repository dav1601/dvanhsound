<template>
    <div class="h-full w-full flex justify-between items-center">
        <router-link :to="{ name: 'Home' }">
            <v-img
                width="146"
                height="44"
                class="ml-8"
                :src="$getLogo()"
            ></v-img>
        </router-link>
        <div id="dvs-app-bar-content" class="flex justify-between items-center">
            <div
                class="bg-[#282828cc] flex justify-start items-center ml-8 w-[480px] relative border-solid border border-[rgba(255 , 255 ,255 , 0.15)] h-[40px] rounded-lg p-3 text-[#595656]"
                id="dvs-search-box"
                v-if="$route.name === 'Search'"
            >
                <v-icon icon="mdi-magnify mr-2"></v-icon>
                <input
                    type="text"
                    class="flex-1 text-sm focus:!text-white focus:font-semibold"
                    placeholder="Tìm bài hát, nghệ sĩ, podcast..."
                    v-model="kw"
                />
            </div>
            <div v-else></div>
            <div class="flex justify-end items-center mr-10">
                <v-btn
                    class="capitalize rounded-full text-center text-sm dvs-dark-bg"
                    prepend-icon="mdi-download-circle-outline"
                >
                    <span class="mt-1"> cai dat ung dung</span>
                </v-btn>
                <!-- menu -->
                <v-menu transition="slide-x-transition" v-if="isAuthenticated">
                    <template v-slot:activator="{ props }">
                        <v-btn
                            density="comfortable"
                            class="dvs-dark-bg ml-4"
                            icon="mdi-account-outline"
                            v-bind="props"
                        >
                        </v-btn>
                    </template>
                    <v-list class="w-[200px] mt-3">
                        <list-item
                            icon="mdi-logout"
                            title="Đăng Xuất"
                            class="h-[40px]"
                            @click="logout"
                        ></list-item>
                    </v-list>
                </v-menu>
                <!-- login  -->
                <div class="flex items-center" v-else>
                    <v-btn
                        class="capitalize rounded-full mx-4 text-center text-sm dvs-dark-bg"
                        :to="{ name: 'Register' }"
                        >Đăng ký</v-btn
                    >
                    <v-btn
                        class="capitalize rounded-full text-center text-sm dvs-dark-bg"
                        :to="{ name: 'Login' }"
                        >Đăng nhập</v-btn
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useAuthStore } from "@/stores/AuthStore";
import { storeToRefs } from "pinia";
import ListItem from "@/components/app/ListItem.vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { debounce } from "lodash";
import { useSongPlay } from "@/stores/SongPlay";
export default {
    components: { ListItem },
    setup(props) {
        const auth = useAuthStore();
        const route = useRoute();
        const storeSong = useSongPlay();
        const kw = ref(route.params.kw);
        const { isAuthenticated } = storeToRefs(auth);

        const logout = () => {
            auth.logout();
        };
        const search = debounce((newKw) => {
            storeSong.search(newKw);
        }, 300);
        watch(kw, (newKw) => {
            search(newKw);
        });

        return {
            isAuthenticated,
            logout,
            kw,
        };
    },
};
</script>
<style lang=""></style>
