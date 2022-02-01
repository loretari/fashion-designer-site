<template>
    <div class="user-playlists">
        <h2>My Playlists</h2>
        <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create a new Playlist</router-link>
        <div v-if="playlists">
         <ListView :playlists="playlists"/>
        </div>

    </div>

</template>

<script>
    import ListView from '../../components/ListView'
    import getUser from '../../composables/getUser'
    import getCollection from '../../composables/getCollection'


    export default {
        components: { ListView },
        name: "UserPlaylists",
        setup() {
            const { user } = getUser()
            const { documents: playlists } = getCollection(
                'playlists',
                ['userId', '==', user.value.uid]
            )
            console.log(playlists)

            return {
                playlists
            }
        }
    }
</script>

<style>


</style>