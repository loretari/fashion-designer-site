<template>
<div v-if="error" class="error">{{ error }}</div>
    <div v-if="playlist" class="playlist-details">

        <!---  playlist information --->
        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.coverUrl">
            </div>
            <h2>{{ playlist.title }}</h2>
            <p class="username">Created by {{ playlist.userName }}</p>
            <p class="description">{{ playlist.description }}</p>
            <button v-if="ownerShip" @click="handleDelete">Delete List</button>

        </div>
<!-- song list -->
    <div class="song-list">
        <div v-if="!playlist.songs.length">No designers have been added to this list yet.</div>
        <div v-for="song in playlist.songs" :key="song.id" class="single-song">
            <div class="details">
                <h3>{{ song.title }}</h3>
                <p class="description">{{ song.artist }}</p>
                <img class="add-img" :src="song.coverUrl">
            </div>
            <button @click="handleClick(song.id)" v-if="ownerShip">Delete</button>
        </div>

        <AddSong v-if="ownerShip" :playlist="playlist"/>
    </div>

    </div>
</template>

<script>
    import AddSong from '../../components/AddSong'
    import useStorage from '../../composables/useStorage'
    import useDocument from '../../composables/useDocument'
    import getDocument from '../../composables/getDocument'
    import getUser from '../../composables/getUser'
    import { computed } from 'vue'
    import { useRouter }from 'vue-router'


    export default {
        name: "PlaylistDetails",
        props: ['id'],
        components: { AddSong },
        setup(props) {
            const { deleteImage } = useStorage()
            const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
            const { document: playlist, error } = getDocument('playlists', props.id)
            const { user } = getUser()
            const router = useRouter()

            const ownerShip = computed(() => {
                   return playlist.value && user.value && user.value.uid == playlist.value.userId
            })

            const handleDelete = async () => {
                await deleteImage(playlist.value.filePath)
                await deleteDoc()
                router.push({name: 'Home'})
            }

            const handleClick = async (id) => {
                    const songs = playlist.value.songs.filter((song) => song.id != id)
                await updateDoc({ songs })
            }

            return {
                playlist,
                error,
                ownerShip,
                handleDelete,
                handleClick

            }
        }
    }
</script>

<style>
    .playlist-details {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 80px;
    }

    .cover {
        overflow: hidden;
        border-radius: 20px;
        position: relative;
        padding: 160px;
    }
    .cover img {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        min-width: 100%;
        min-height: 100%;
        max-width: 200%;
        max-height: 200%;
    }
    .playlist-info {
        text-align: center;
    }
    .playlist-info h2 {
        text-transform: capitalize;
        font-size: 28px;
        margin-top: 20px;
    }
    .username {
        color: #999;
    }
    .description {
        text-align: left;
        margin-top: 20px;
    }
    .single-song {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px dashed var(--secondary);
        margin-bottom: 20px;
    }
    .add-img {
        margin: 20px 60px 20px;
        border-radius: 20px;
        min-width: 60%;
        min-height: 70%;
        max-width: 60%;
        max-height: 70%;
    }


</style>