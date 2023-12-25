<template lang>
    <div class="w-100 h-100 mt-40 flex justify-center items-center">
        <div
            class="wp-404 content-spacing flex flex-col justify-center items-center max-w-[600px]"
        >
            <v-img
                :src="$getLogo('sm')"
                max-width="60"
                width="auto"
                height="auto"
                max-height="60"
            ></v-img>
            <h2 class="text-white font-bold text-xl my-6">
                {{ message }}
            </h2>
            <div class="flex items-center">
                <v-btn rounded="lg" class="mr-2" :to="{ name: 'Home' }"
                    >Trang chu</v-btn
                >
                <v-btn rounded="lg" @click="reload">Tai lai</v-btn>
            </div>
        </div>
    </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
export default {
    props: ["message"],
    setup() {
        const route = useRoute();
        const router = useRouter();
        const reload = () => {
            return router.go(route.fullPath);
        };
        return {
            reload,
        };
    },
};
</script>
<style lang="scss"></style>
