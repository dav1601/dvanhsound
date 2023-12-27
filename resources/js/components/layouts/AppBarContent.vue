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
            >
                <v-icon icon="mdi-magnify mr-2"></v-icon>
                <input
                    type="text"
                    class="flex-1 text-sm focus:!text-white focus:font-semibold"
                    placeholder="Tìm bài hát, nghệ sĩ, podcast..."
                />
            </div>
            <div class="flex justify-end items-center mr-10">
                <v-btn
                    class="capitalize rounded-full text-center text-sm dvs-dark-bg"
                    prepend-icon="mdi-download-circle-outline"
                >
                    <span class="mt-1"> cai dat ung dung</span>
                </v-btn>
                <v-btn
                    density="comfortable"
                    class="ml-2 dvs-dark-bg"
                    icon="mdi-account-outline"
                ></v-btn>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
