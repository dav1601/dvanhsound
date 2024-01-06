<template>
    <span
        class="text-header d-block w-full text-white leading-[38px] text-2xl truncate"
    >
        {{ content }}
    </span>
</template>
<script>
export default {
    props: {
        content: {
            default: "",
        },
    },
};
</script>
<style lang=""></style>
