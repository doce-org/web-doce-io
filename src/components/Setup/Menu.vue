<template>

    <div class="ui two column equal height celled grid">

        <div class="center aligned middle aligned column">

            <h2 v-link="{name: 'setup_rooms_listing'}" class="ui icon header">
                <i class="home icon"></i>
                <div class="content">
                    Gestion des Pieces
                    <div class="sub header">Ajouter et modifier les pieces de votre logement.</div>
                </div>
            </h2>
        
        </div>

        <div class="center aligned middle aligned column">

            <h2 v-link="{name: 'setup_transmitters_listing'}" class="ui icon header">
                <i class="podcast icon"></i>
                <div class="content">
                    Gestion des Transmetteurs
                    <div class="sub header">Ajouter et modifier vos transmetteurs.</div>
                </div>
            </h2>

        </div>

        <div class="center aligned middle aligned column">

            <h2 v-link="" class="ui icon header disabled">
                <i class="feed icon"></i>
                <div class="content">
                    Gestion des Emetteurs
                    <div class="sub header">Ajouter et modifier vos emetteurs.</div>
                </div>
            </h2>

        </div>

    </div>

</template>

<script>

    export default {
    
    }

</script>

<style lang="scss" scoped>

    // special flexbox grid height
    .ui.equal.height.grid {
		height: calc( 100vh - 40px );
		margin-top: 0;
		overflow: auto;
        margin-bottom: 0;
        background: #EFF2F8;

        .column {

            .ui.header {
                cursor: pointer;
            }
        }
	}

</style>


