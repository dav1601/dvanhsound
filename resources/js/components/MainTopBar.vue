<template lang="">
    <div id="m-t-bar">
        <div class="flex justify-between items-center">
            <div class="m-t-bar-start d-flex items-center justify-start">
                <v-btn
                    density="default"
                    icon="mdi-chevron-left"
                    width="50"
                    height="50"
                    class="m-t-bar-btn"
                ></v-btn>
                <v-breadcrumbs :items="[$route.name]" class="ml-3">
                    <template v-slot:divider>
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </template>
                </v-breadcrumbs>
            </div>
            <!-- ANCHOR end playlist bar start --------------------------------- -->
            <div class="m-t-bar-end flex">
                <!-- ANCHOR search box --------------------------------- -->
                <div
                    class="search-box rounded-xl flex justify-start align-items-center"
                >
                    <v-icon icon="mdi-magnify" color="search-box-icon"></v-icon>
                    <input
                        type="text"
                        class="search-box-input ml-3"
                        placeholder="Search music, artist, albums..."
                    />
                </div>
                <!-- ANCHOR alert icon --------------------------------- -->
                <v-btn
                    density="default"
                    icon="mdi-bell"
                    width="50"
                    height="50"
                    class="m-t-bar-btn ml-6"
                ></v-btn>
            </div>
            <!-- ANCHOR end playlist bar end --------------------------------- -->
        </div>
        <!-- ---------- -->
    </div>
    <!-- ANCHOR end playlist bar --------------------------------- -->
</template>
<script>
export default {};
</script>
<style lang="scss">
.m-t-bar-btn {
    border-radius: 12px !important;
    background: $secondary;
}
.m-t-bar-end {
    .search-box {
        background: $secondary;
        padding: 13px 16px;
        padding-right: 46px;
        width: 318px;
        color: $white-72;

        &-input {
            width: 220px;

            &::placeholder {
                color: #797979;
            }
            font-weight: 400;
        }
    }
}
</style>
