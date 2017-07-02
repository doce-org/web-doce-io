<template>
  
    <section class="ui one column padded grid">

        <div class="column">
            <button v-link="{name: 'dashboard'}" class="ui basic blue button">
                <i class="left arrow icon"></i>
                Quitter le mode initialisation
            </button>
        </div>

        <div class="center aligned middle aligned column">
            <router-view transition="fade" transition-mode="out-in"></router-view>
        </div>

    </section>

</template>

<script>

    export default {
    
    }

</script>

<style lang="scss" scoped>

    .center.aligned.column {
        width: 450px;
    }

</style>


