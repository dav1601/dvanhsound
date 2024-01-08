<template>
    <div class="h-full w-full flex justify-between items-center">
        <v-btn
            icon="mdi-menu"
            density="comfortable"
            class="ml-5 lg:hidden bg-dvs-gray-1"
            @click="emitToggle"
        >
        </v-btn>
        <router-link :to="{ name: 'Home' }">
            <v-img
                width="146"
                height="44"
                class="ml-3 mr-3 md:mr-0 md:ml-8"
                :src="$getLogo()"
            ></v-img>
        </router-link>

        <div
            id="dvs-app-bar-content"
            class="flex flex-1 lg:ml-[65px] justify-between items-center"
        >
            <SearchInput :show="showSearch" />
            <div class="lg:hidden"></div>

            <div class="flex justify-end items-center mr-10">
                <v-btn
                    density="comfortable"
                    icon="mdi-magnify"
                    :to="{ name: 'Search' }"
                    class="mr-2 lg:hidden bg-dvs-gray-1"
                >
                </v-btn>
                <v-btn
                    class="capitalize rounded-full text-center text-sm dvs-dark-bg hidden md:flex"
                    prepend-icon="mdi-download-circle-outline"
                >
                    <span class="mt-1"> cai dat ung dung</span>
                </v-btn>
                <v-btn
                    density="comfortable"
                    class="dvs-dark-bg md:hidden"
                    icon="mdi-download-circle-outline"
                >
                </v-btn>
                <!-- menu -->
                <v-menu transition="slide-x-transition" v-if="isAuthenticated">
                    <template v-slot:activator="{ props }">
                        <v-btn
                            density="comfortable"
                            class="dvs-dark-bg ml-2 md:ml-4"
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
import SearchInput from "@/components/app/SearchInput.vue";
import { useSongPlay } from "@/stores/SongPlay";
export default {
    components: { ListItem, SearchInput },
    props: {
        showSearch: {
            default: true,
        },
    },
    setup(props, ctx) {
        const auth = useAuthStore();
        const storeSong = useSongPlay();
        const { isAuthenticated } = storeToRefs(auth);
        const { showPlayerPage } = storeToRefs(storeSong);
        const logout = () => {
            auth.logout();
        };

        const emitToggle = () => {
            return ctx.emit("toggle-nav");
        };

        return {
            isAuthenticated,
            logout,

            emitToggle,
            showPlayerPage,
        };
    },
};
</script>
<style lang=""></style>
