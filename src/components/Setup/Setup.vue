<template>
  
    <section class="ui one column padded grid">

        <div class="column">
            <button v-link="{name: 'dashboard'}" class="ui basic blue button">
                <i class="left arrow icon"></i>
                Quitter le mode initialisation
            </button>
        </div>

        <div class="center aligned column">

            <a class="ui basic blue button">
                Gestion des Pieces
            </a>

            <a class="ui basic blue button">
                Gestion des Transmetteurs
            </a>

        </div>

    </section>

</template>

<script>

    export default {
    
    }

</script>

