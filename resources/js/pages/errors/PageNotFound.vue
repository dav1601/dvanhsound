<template lang>
    <div class="w-100 h-100 mt-20 flex justify-center items-center">
        <div
            class="wp-404 flex flex-col justify-center items-center w-100 h-100"
        >
            <v-img
                :src="$getLogo('sm')"
                max-width="60"
                width="auto"
                height="auto"
                max-height="60"
            ></v-img>
            <h2 class="text-white font-bold text-xl my-4">
                Không tìm thấy trang
            </h2>
            <p class="text-gray-500">
                Chúng tôi không tìm thấy trang bạn muốn tìm.
            </p>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss"></style>
