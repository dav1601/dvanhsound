<template>
    <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->
    <section class="h-screen">
        <div class="h-full mx-auto container">
            <!-- Left column container with background-->
            <div
                class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between"
            >
                <div
                    class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12"
                >
                    <img
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        class="w-full"
                        alt="Sample image"
                    />
                </div>

                <!-- Right column container -->
                <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                    <form>
                        <!--Sign in section-->
                        <div
                            class="flex flex-column items-center justify-center lg:justify-start"
                        >
                            <v-btn
                                prepend-icon="mdi-google"
                                class="w-[50%] bg-blue-500"
                                size="large"
                            >
                                Sign in with Google
                            </v-btn>
                            <!-- Facebook -->
                        </div>

                        <!-- Separator between social media sign in and email/password sign in -->
                        <div
                            class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"
                        >
                            <p
                                class="mx-4 mb-0 text-center font-semibold dark:text-white"
                            >
                                Or
                            </p>
                        </div>
                        <!-- name input -->
                        <div class="relative mb-6" data-te-input-wrapper-init>
                            <text-field
                                placeholder="Tên người dùng"
                                type="text"
                                v-model="name"
                            ></text-field>
                            <span
                                class="d-block text-danger-600 mt-2"
                                v-if="validator.name"
                            >
                                {{ validator.name[0] }}
                            </span>
                        </div>
                        <!-- Email input -->
                        <div class="relative mb-6" data-te-input-wrapper-init>
                            <text-field
                                placeholder="Email"
                                type="text"
                                v-model="email"
                            ></text-field>
                            <span
                                class="d-block text-danger-600 mt-2"
                                v-if="validator.email"
                            >
                                {{ validator.email[0] }}
                            </span>
                        </div>

                        <!-- Password input -->
                        <div class="relative mb-6" data-te-input-wrapper-init>
                            <text-field
                                type="password"
                                placeholder="Mật khẩu"
                                v-model="password"
                            ></text-field>
                            <span
                                class="d-block text-danger-600 mt-2"
                                v-if="validator.password"
                            >
                                {{ validator.password[0] }}
                            </span>
                        </div>

                        <!-- Login button -->
                        <div class="text-center lg:text-left">
                            <v-btn
                                class="bg-blue-500 mb-2"
                                @click="clickBtn"
                                :loading="isLoading"
                                >Đăng ký</v-btn
                            >
                            <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
                                Bạn đã có tài khoản?
                                <router-link
                                    :to="{ name: 'Login' }"
                                    class="text-blue transition duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700"
                                    >Đăng Nhập</router-link
                                >
                            </p>
                            <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
                                Về trang chủ
                                <router-link
                                    :to="{ name: 'Home' }"
                                    class="text-blue transition duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700"
                                    >Trang chủ</router-link
                                >
                            </p>
                            <!-- Register link -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import TextField from "@/components/layouts/forms/TextField.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { ref } from "vue";
import { storeToRefs } from "pinia";
export default {
    components: {
        TextField,
    },

    setup() {
        const email = ref("");
        const password = ref("");
        const name = ref("");
        const auth = useAuthStore();
        const { isLoading, validator } = storeToRefs(auth);
        const clickBtn = () => {
            auth.register(name.value, email.value, password.value);
        };
        return {
            email,
            password,
            name,
            isLoading,
            clickBtn,
            validator,
        };
    },
};
</script>
<style lang=""></style>
