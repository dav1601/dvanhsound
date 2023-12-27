<template>
    <div>
        <label
            for="email"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            v-if="label"
        >
            {{ label }}
        </label>
        <slot name="prev"></slot>
        <input
            :type="type"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-500"
            v-model="textValue"
            @input="handleInput"
            v-bind="$attrs"
        />
        <slot name="after"></slot>
    </div>
</template>
<script>
import { ref } from "vue";
export default {
    props: {
        type: {
            type: String,
            default: "text",
        },
        label: {
            type: String,
            default: "",
        },
    },

    inheritAttrs: false,
    setup(props, { emit }) {
        const textValue = ref("");

        const handleInput = (event) => {
            textValue.value = event.target.value;
            emit("input", event.target.value); // Emit sự kiện input
        };

        return { textValue, handleInput };
    },
};
</script>
<style lang=""></style>
