<template>
    <div class="navbar">
        <nav>
            <img src="../assets/Akiniai.jpg">
            <h1><router-link :to="{ name: 'Home' }">My Designers Forever</router-link></h1>
            <div class="links">
                <div v-if="user">
                    <router-link :to="{ name: 'Home' }">Home</router-link>
                    <router-link :to="{ name: 'CreatePlaylist' }">Create List of Designers</router-link>
                    <router-link :to="{ name: 'UserPlaylists' }">My List</router-link>
                    <span>hi here, {{ user.displayName }}</span>
                    <button @click="handleClick">Logout</button>
                </div>
                <div v-else>
                    <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
                    <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>

                </div>
            </div>
        </nav>

    </div>

</template>

<script>
    import getUser from '../composables/getUser'
    import useLogout from '../composables/useLogout'
    import { useRouter } from 'vue-router'

    export default {
        name: "Navbar",
        setup() {
            const { user } = getUser()
            const { logout } = useLogout()
            const router = useRouter()

            const handleClick = async () => {
                await logout()
                console.log('logged out')
                router.push({ name: 'Login' })
            }

            return {
                handleClick,
                user }
        }
    }

</script>

<style scoped>
    .navbar {
        padding: 16px 10px;
        margin-bottom: 60px;
        background: white;
    }
    nav {
        display: flex;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }
    nav img {
        width: 200px;
        height: 200px;
        border-radius: 99em;
        border: 7px solid #eee;
    }
    nav h1 {
        margin-left: 20px;
    }
    nav .links {
        margin-left: auto;
    }
    nav .links a, button {
        margin-left: 16px;
        font-size: 14px;
    }
   span {
       font-size: 14px;
       display: inline-block;
       margin-left: 16px;
       padding-left: 16px;
       border-left: 1px solid #eee;
   }
</style>