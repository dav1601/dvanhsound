<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-900">
        <form
            class="bg-dark shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[400px] dark:bg-gray-800"
        >
            <router-link :to="{ name: 'Home' }">
                <v-img
                    width="146"
                    height="44"
                    class="mx-auto mb-4"
                    :src="$getLogo()"
                ></v-img>
            </router-link>
            <div class="mb-4">
                <label
                    class="block text-white text-sm font-bold mb-2"
                    for="username"
                >
                    Email
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="email"
                    placeholder="Email"
                />
            </div>
            <div class="">
                <label
                    class="block text-white text-sm font-bold"
                    for="password"
                >
                    Password
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="********"
                />
            </div>

            <div class="flex justify-between items-center">
                <v-checkbox
                    value="1"
                    label="Remember me"
                    type="checkbox"
                ></v-checkbox>
            </div>

            <div class="flex items-center justify-between">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                >
                    Đăng nhập
                </button>
                <a
                    class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="#"
                >
                    Quên mật khẩu?
                </a>
            </div>
            <div class="mt-4 flex items-center">
                <button
                    class="border text-blue-500 hover:text-white hover:bg-blue-500 font-bold py-2 px-4 rounded !border-blue-500 !border-solid"
                >
                    <span class="mr-2">
                        <v-icon icon="mdi-google"></v-icon>
                    </span>
                    Sign In with Google
                </button>
            </div>
        </form>
    </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
